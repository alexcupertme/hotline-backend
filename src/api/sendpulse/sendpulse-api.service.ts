/* eslint-disable @typescript-eslint/indent */
import { ISendpulseConfigService } from '@config/mail/sendpulse/config.interface'
import { ICacheService } from '@core/services/cache/cache.interface'
import { HttpService } from '@nestjs/axios'
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common'
import { map } from 'rxjs'
import {
    ISendpulseAPIService,
    OAuthSendpulseRequest,
    OAuthSendpulseResponse,
    SMTPSendpulseRequest,
    SMTPSendpulseResponse,
} from './sendpulse-api.interface'

@Injectable()
export class SendpulseAPIService implements ISendpulseAPIService {
    constructor(
        private httpService: HttpService,
        @Inject(ICacheService) private readonly cacheService: ICacheService,
        @Inject(ISendpulseConfigService) private readonly sendpulseConfigService: ISendpulseConfigService
    ) {}

    private _accessToken: string | null = null

    private _creationDate: number | null = null

    private _renewDate: number | null = null

    protected async renewApiTokenInCache(token: string, ttl: number): Promise<void> {
        const existingCachedToken = await this.cacheService.get(this.sendpulseConfigService.tokenPrefix, '')
        if (existingCachedToken) {
            await this.cacheService.delete(this.sendpulseConfigService.tokenPrefix, '')
        }

        await this.cacheService.add(this.sendpulseConfigService.tokenPrefix, '', token, ttl)
    }

    protected async getNewApiToken(): Promise<OAuthSendpulseResponse> {
        const url = new URL(this.sendpulseConfigService.oauthGateway, this.sendpulseConfigService.baseUrl).href

        return new Promise((resolve) => {
            this.httpService
                .post<OAuthSendpulseResponse>(url, {
                    client_id: this.sendpulseConfigService.appUserID,
                    client_secret: this.sendpulseConfigService.apiSecret,
                    grant_type: this.sendpulseConfigService.oauthGrantType,
                } as OAuthSendpulseRequest)
                .pipe(map((response) => response.data))
                .subscribe((data) => resolve(data))
        })
    }

    protected async getApiTokenFromCache(): Promise<string | null> {
        return await this.cacheService.get(this.sendpulseConfigService.tokenPrefix, '')
    }

    protected async getApiToken(): Promise<string> {
        const token = await this.getApiTokenFromCache()

        if (!this._accessToken || !this._renewDate || !token) {
            const res: OAuthSendpulseResponse = await this.getNewApiToken()

            this._accessToken = res.access_token
            this._creationDate = Date.now()
            this._renewDate = this._creationDate + res.expires_in - 100

            await this.renewApiTokenInCache(res.access_token, res.expires_in - 100)

            return `${res.token_type} ${res.access_token}`
        } else return token
    }

    public async sendMail(data: SMTPSendpulseRequest): Promise<SMTPSendpulseResponse> {
        const token = await this.getApiToken()
        const url = new URL(this.sendpulseConfigService.smtpSendEmailGateway, this.sendpulseConfigService.baseUrl).href
        try {
            return await new Promise<SMTPSendpulseResponse>((resolve) => {
                this.httpService
                    .post<SMTPSendpulseResponse>(url, data, {
                        headers: {
                            Authorization: token,
                        },
                    })
                    .pipe(map((response) => response.data))
                    .subscribe((data) => resolve(data))
            })
        } catch (e) {
            throw new InternalServerErrorException('Please, try again later')
        }
    }
}
//TODO: refactor this shit
