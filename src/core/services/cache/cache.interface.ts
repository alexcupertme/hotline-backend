export interface ICacheService {
    add(category: string, key: string, data: string, ttl?: number): any
    delete(category: string, key: string): any
    get(category: string, key: string): Promise<string>
}

export const ICacheService = Symbol('ICacheService')
