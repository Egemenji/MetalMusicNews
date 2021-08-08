import React from 'react'
import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  ProductListScreen from '../screens/product/ProductListScreen'

const ProductStack = createNativeStackNavigator();


const ProductsStackScreen = () => {
    return (
        <ProductStack.Navigator>
            <ProductStack.Screen name='ProductList' component={ProductListScreen}  options={{
                headerShown: false,

            }}></ProductStack.Screen>
        </ProductStack.Navigator>
    )
}

export default ProductsStackScreen
