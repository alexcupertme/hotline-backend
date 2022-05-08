export interface IUserShown {
    id: string
    email: string
    nickname: string
    firstName: string
    lastName: string
}

export interface IUserSerialized extends IUserShown {
    password?: string
    sessionId?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface IUser extends IUserShown {
    password: string
    sessionId: string
    createdAt: Date
    updatedAt: Date
}
