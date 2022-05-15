import { ISendMailOptions } from '@nestjs-modules/mailer'
import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { BaseProducer } from './../base.producer.service'
import { ITaskData } from './../task-data.interface'
import { RequiredData } from './typings'

@Injectable()
export class MailProducer<T extends RequiredData> extends BaseProducer<ISendMailOptions & T> {
    constructor(@InjectQueue('mail') protected queue: Queue<ISendMailOptions & ITaskData & T>) {
        super()
    }
}
