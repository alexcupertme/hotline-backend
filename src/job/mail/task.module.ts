import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { MailConsumer } from './consumer.service'
import { MailProducer } from './producer.service'

@Module({
    imports: [
        BullModule.registerQueueAsync({
            name: 'mail',
            useFactory: async function () {
                return {
                    settings: {
                        drainDelay: 10000,
                        maxStalledCount: 3,
                        stalledInterval: 10000,
                        retryProcessDelay: 15000,
                    },
                }
            },
        }),
    ],
    providers: [MailConsumer, MailProducer],
    exports: [MailConsumer, MailProducer],
})
export class MailJobModule {}
