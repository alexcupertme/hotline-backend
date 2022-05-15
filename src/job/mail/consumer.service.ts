import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer'
import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { IConsumer } from './../consumer.interface'
import { RequiredData } from './typings'

@Processor('mail')
export class MailConsumer<T extends RequiredData> implements IConsumer<ISendMailOptions> {
    constructor(private mailerService: MailerService) {}

    @Process()
    async processTask(job: Job<ISendMailOptions & T>): Promise<ISendMailOptions & T> {
        await this.mailerService.sendMail(job.data)
        return job.data
    }
}
