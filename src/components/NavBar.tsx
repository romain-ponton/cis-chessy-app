import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {FlatList, View, Text} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator();

function Test() {
    return (
        <View>
            <Text>Open up App</Text>
        </View>
    )
}

function NavBar() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={"Home"} component={Test}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default NavBar;