import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import {SafeAreaProvider, useSafeAreaInsets} from "react-native-safe-area-context";

import HomeScreen from "./src/screens/HomeScreen";
import PlanningScreen from "./src/screens/PlanningScreen";
import AccountScreen from "./src/screens/AccountScreen";
import FormationScreen from "./src/screens/FormationScreen";
import AlertsScreen from "./src/screens/AlertsScreen";

const Tab = createBottomTabNavigator()

function AppNavigator() {
    const insets = useSafeAreaInsets();

  return (
        <NavigationContainer>
            <Tab.Navigator
            screenOptions={{
                headerShown: true,
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
    return(
        <SafeAreaProvider>
            <AppNavigator />
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
