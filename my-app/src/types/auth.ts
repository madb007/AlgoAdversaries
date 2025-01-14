export interface User {
    id: string,
    email: string,
    cognitoId?: string,
}

export interface AuthState {
    isAuthentication: boolean,
    user: User | null,
    loading: boolean,
}