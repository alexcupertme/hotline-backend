import { SMTPSendpulseRequest } from '@api/sendpulse/sendpulse-api.interface'
import { Process, Processor } from '@nestjs/bull'
import { Inject } from '@nestjs/common'
import { Job } from 'bull'
import { ISendpulseAPIService } from './../../api/sendpulse/sendpulse-api.interface'
import { IConsumer } from './../consumer.interface'

@Processor('mail')
export class MailConsumer implements IConsumer<SMTPSendpulseRequest> {
    constructor(@Inject(ISendpulseAPIService) private mailService: ISendpulseAPIService) {}

    @Process()
    async processTask(job: Job<SMTPSendpulseRequest>): Promise<SMTPSendpulseRequest> {
        await this.mailService.sendMail(job.data)
        return job.data
    }
}
