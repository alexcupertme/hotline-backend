import { SMTPSendpulseRequest } from '@api/sendpulse/sendpulse-api.interface'
import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { BaseProducer } from './../base.producer.service'
import { ITaskData } from './../task-data.interface'

@Injectable()
export class MailProducer extends BaseProducer<SMTPSendpulseRequest> {
    constructor(@InjectQueue('mail') protected queue: Queue<SMTPSendpulseRequest & ITaskData>) {
        super()
    }
}
