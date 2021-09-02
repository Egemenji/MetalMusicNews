import React from 'react'
import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen'

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name='HomeScreen' component={HomeScreen} options={{
                headerShown: false,

            }}></HomeStack.Screen>
        </HomeStack.Navigator>
    )
}

export default HomeStackScreen
