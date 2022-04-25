import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { IUser } from '../interfaces/user.interface'

@Entity({ name: 'users' })
export class User implements IUser {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    nickname: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({ nullable: true, default: null })
    firstName: string

    @Column({ nullable: true, default: null })
    lastName: string

    @Column({ nullable: true, default: null })
    sessionId: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date
}
