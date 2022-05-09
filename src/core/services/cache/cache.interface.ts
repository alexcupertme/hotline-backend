export interface ICacheService {
    add(category: string, key: string, data: string, ttl?: number): Promise<'OK'>
    delete(category: string, key: string): Promise<number>
    get(category: string, key: string): Promise<string | null>
}

export const ICacheService = Symbol('ICacheService')
