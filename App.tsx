import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import HomeScreen from "./src/screens/HomeScreen";

const Tab = createBottomTabNavigator()

export default function App() {
  return (
        <NavigationContainer>
            <Tab.Navigator
            screenOptions={{
                headerShown: true,
                tabBarActiveTintColor: '#6200EE',
                tabBarInactiveTintColor: '#888',
                tabBarStyle: { height: 60, paddingBottom: 8},
            }}>
                <Tab.Screen name="Home" component={HomeScreen} />
            </Tab.Navigator>
        </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
