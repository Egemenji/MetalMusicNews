import React from 'react'
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from '../screens/cart/CartScreen';

const CartStack = createNativeStackNavigator();

const CartStackScreen = () => {
    return (
        <CartStack.Navigator>
            <CartStack.Screen name='Cart' component={CartScreen} options={{
                headerShown: false,

            }}></CartStack.Screen>
        </CartStack.Navigator>
    )
}

export default CartStackScreen
