import { plainToInstance } from 'class-transformer'
import { EntityRepository } from 'typeorm'
import { ModelRepository } from '../model.repository'
import { Mail } from './entity/mail.entity'
import { MailEntity } from './serializers/mail.serializer'

@EntityRepository(Mail)
export class MailsRepository extends ModelRepository<Mail, MailEntity> {
    override transform(model: Mail): MailEntity {
        return plainToInstance(MailEntity, model)
    }

    override transformMany(models: Mail[]): MailEntity[] {
        return models.map((model) => this.transform(model))
    }

    async tryTerminateUserActiveAction(actionName: string, email: string) {
        await this.update(
            { actionName, isActionCompleted: false, isActionTerminated: false, email },
            { isActionTerminated: true }
        )
    }
}
