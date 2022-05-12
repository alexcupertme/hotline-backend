import { IModelEntity } from '@core/serializers/model.serializer'
import { Mail } from '@models/mail/entity/mail.entity'
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { IUser } from '../interface/user.interface'

@Entity({ name: 'users' })
export class User implements IUser, IModelEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    nickname: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ nullable: true, default: null })
    sessionID: string

    @OneToMany(() => Mail, (mail) => mail.user)
    mails: Mail[]

    @Column({ default: false })
    isMailVerified: boolean

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date
}
