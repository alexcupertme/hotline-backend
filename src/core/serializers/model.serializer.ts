export interface IModelEntity {
    id: string
    createdAt?: Date
    updatedAt?: Date
}

export class ModelEntity implements IModelEntity {
    id!: string

    createdAt?: Date

    updatedAt?: Date
}
