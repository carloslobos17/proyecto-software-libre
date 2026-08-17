export interface LoginPayload {
    email: string,
    password: string
}

export interface Role {
    id: number
    name: string
    imagen: string
    route: string
}

export interface UserResponse {
    id: string
    email: string
    name: string
    lastName: string
    image: string
    notification_token: string | null
    phone: string
    roles: Role[]
}

export interface LoginResponse {
    token: string
    userResponse: UserResponse
}