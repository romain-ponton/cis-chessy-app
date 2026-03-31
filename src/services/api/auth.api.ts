import { apiFetch } from './client'

export const login = async (email: string, password: string) => {
    return apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    })
}

export const me = async () => {
    return apiFetch('/auth/me')
}