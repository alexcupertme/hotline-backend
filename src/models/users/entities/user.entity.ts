import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "../interfaces/user.interface";
@Entity({ name: "users" })
export class User implements IUser {
	@PrimaryGeneratedColumn("uuid")
	id: string;
	@Column()
	email: string;

	@Column({ nullable: true, default: null })
	name: null | string;
	@Column()
	password: string;
	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;
	@UpdateDateColumn({ name: "updated_at", type: "timestamp" })
	updatedAt: Date;
}
