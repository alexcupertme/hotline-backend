import { Job } from 'bull'
import { ITaskData } from './task-data.interface'

export interface IProducer<T> {
    createTask(data: T): Promise<Job<T & ITaskData>>

    deleteTask(id: string): Promise<Job<T & ITaskData> | null>

    findTask(id: string): Promise<Job<T & ITaskData> | null>
}

export const IProducer = Symbol('IProducer')
