import { Job } from 'bull'

export interface IConsumer<T> {
    processTask(job: Job<T>): Promise<T>
}

export const IConsumer = Symbol('IConsumer')
