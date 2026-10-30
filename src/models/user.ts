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
    id: number
    email: string
    name: string
    lastName: string
    lastname:string
    image: string
    notification_token: string | null
    phone: string
    roles: Role[]
}

export interface LoginResponse {
    token: string
    userResponse: UserResponse
}

export interface UserRequest{
    name:string
    lastname:string
    phone:string
}