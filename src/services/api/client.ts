import { useAuthStore } from '../../store/authStore'

const API_URL = 'http://192.168.1.20:3000'

export const apiFetch = async (path: string, options: RequestInit = {}) => {
    const token = useAuthStore.getState().accessToken

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {}),
        },
    })

    if (!response.ok) {
        const text = await response.text()
        throw new Error(text || 'API error')
    }

    const contentType = response.headers.get('content-type')
    if (contentType?.includes('application/json')) {
        return response.json()
    }

    return response.text()
}