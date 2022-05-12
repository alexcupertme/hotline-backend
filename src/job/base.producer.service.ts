import { Injectable } from '@nestjs/common'
import { Job, Queue } from 'bull'
import { v4 as uuid } from 'uuid'
import { IProducer } from './producer.interface'
import { ITaskData } from './task-data.interface'

@Injectable()
export abstract class BaseProducer<T> implements IProducer<T> {
    protected abstract queue: Queue<T & ITaskData>

    async createTask(data: T): Promise<Job<T & ITaskData>> {
        const jobID = uuid()
        return await this.queue.add({ createdAt: new Date(), id: jobID, ...data }, { jobId: jobID })
    }

    async findTask(id: string): Promise<Job<T & ITaskData> | null> {
        const job = await this.queue.getJob(id)
        return job
    }

    async deleteTask(id: string): Promise<Job<T & ITaskData> | null> {
        const job = await this.queue.getJob(id)
        if (job) await job.remove()
        return job
    }
}
