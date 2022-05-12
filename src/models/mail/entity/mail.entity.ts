import { IModelEntity } from '@core/serializers/model.serializer'
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { User } from './../../user/entity/user.entity'
import { IMail } from './../interface/mail.interface'

@Entity({ name: 'mails' })
export class Mail implements IMail, IModelEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: true })
    actionName: string

    @Column({ default: false })
    isActionCompleted: boolean

    @Column({ default: false })
    isActionTerminated: boolean

    @Column({ nullable: false })
    email: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date

    @ManyToOne(() => User, (user) => user.mails, { eager: true })
    @JoinTable()
    user: User
}
