import { SendpulseAPIModule } from '@api/sendpulse/sendpulse-api.module'
import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { MailConsumer } from './consumer.service'
import { MailProducer } from './producer.service'

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'mail',
        }),
        SendpulseAPIModule,
    ],
    providers: [MailConsumer, MailProducer],
    exports: [MailConsumer, MailProducer],
})
export class MailJobModule {}
