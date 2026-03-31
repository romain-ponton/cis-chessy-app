import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RoleGate from './RoleGate'

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <RoleGate />
        </NavigationContainer>
    )
}

export default AppNavigator