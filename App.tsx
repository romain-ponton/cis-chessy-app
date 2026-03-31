import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import {SafeAreaProvider, useSafeAreaInsets} from "react-native-safe-area-context";

import HomeScreen from "./src/screens/HomeScreen";
import PlanningScreen from "./src/screens/PlanningScreen";
import AccountScreen from "./src/screens/AccountScreen";
import FormationScreen from "./src/screens/FormationScreen";
import AlertsScreen from "./src/screens/AlertsScreen";
import Header from "./src/components/Header";
import {MOCK_USERS, UserContext} from "./src/constants/mockUsers";

const Tab = createBottomTabNavigator()

const CURRENT_USER = MOCK_USERS.admin

function AppNavigator() {
    const insets = useSafeAreaInsets();

  return (
        <NavigationContainer>
            <Tab.Navigator
            screenOptions={{
                header: () => <Header />,
                tabBarActiveTintColor: '#6200EE',
                tabBarInactiveTintColor: '#888',
                tabBarStyle: {
                    height: 60 + insets.bottom,
                    paddingBottom: insets.bottom || 8
                },
            }}>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Planning" component={PlanningScreen} />
                <Tab.Screen name="Account" component={AccountScreen} />
                <Tab.Screen name="Formation" component={FormationScreen} />
                <Tab.Screen name="Alerts" component={AlertsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
  );
}

export default function App() {
    // @ts-ignore
    return(
        <SafeAreaProvider>
            <UserContext.Provider value={CURRENT_USER}>
                <AppNavigator />
            </UserContext.Provider>
        </SafeAreaProvider>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
