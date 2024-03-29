import { ModelEntity } from '@core/serializers/model.serializer'
import { NotFoundException } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { DeepPartial, Repository } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

export class ModelRepository<T extends ModelEntity, K extends ModelEntity> extends Repository<T> {
    async get(id: string, relations: string[] = [], throwsException = false): Promise<K | null> {
        const entity = await this.findOne({
            where: { id },
            relations,
        })
        if (!entity && throwsException) {
            throw new NotFoundException('Model not found.')
        }

        return entity ? this.transform(entity) : null
    }

    async createEntity(inputs: DeepPartial<T>, relations: string[] = []): Promise<K> {
        const entity = await this.save({ ...inputs })
        return (await this.get(entity.id, relations))!
    }

    async updateEntity(entity: K, inputs: QueryDeepPartialEntity<T>, relations: string[] = []): Promise<K | null> {
        await this.update(entity.id, inputs)
        return await this.get(entity.id, relations)
    }

    transform(model: T, transformOptions = {}): K {
        return plainToInstance(ModelEntity, model, transformOptions) as K
    }

    transformMany(models: T[], transformOptions = {}): K[] {
        return models.map((model) => this.transform(model, transformOptions))
    }
}
