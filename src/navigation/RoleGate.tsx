import React from 'react'
import { useAuthStore } from '../store/authStore'
import AuthStack from './AuthStack'
import UserTabs from './UserTabs'
import AdminTabs from './AdminTabs'
import CallCenterTabs from './CallCenterTabs'

const RoleGate = () => {
    const user = useAuthStore((state) => state.user)

    if (!user) return <AuthStack />

    switch (user.role) {
        case 'ADMIN':
            return <AdminTabs />
        case 'CENTRE_APPEL':
            return <CallCenterTabs />
        case 'UTILISATEUR':
        default:
            return <UserTabs />
    }
}

export default RoleGate