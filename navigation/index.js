import React, {useContext} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ArtistStackScreen from './ArtistStackScreen'
import CartStackScreen from './CartStackScreen'
import HomeStackScreen from './HomeStackScreen'
import ProductsStackScreen from './ProductsStackScreen'
import cartContext from '../store/cartContext';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ProfileStackScreen from './ProfileStackScreen';


const Tab = createBottomTabNavigator();


const MainNavigation = () => {

    const {cart} = useContext(cartContext)

    return (
       
      <NavigationContainer>
      <Tab.Navigator>

        <Tab.Screen name='Home' component={HomeStackScreen} options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}></Tab.Screen>


        <Tab.Screen
          name='Artists'
          component={ArtistStackScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="microphone" color={color} size={26} />
            ),
          }}></Tab.Screen>


        <Tab.Screen name='Cart' component={CartStackScreen} options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cart" color={color} size={26} />
          ),
          tabBarBadge: cart.length
        }}></Tab.Screen>

        <Tab.Screen name='Products' component={ProductsStackScreen} options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="album" color={color} size={26} />
          )
        }}></Tab.Screen>


        <Tab.Screen name='Profile' component={ProfileStackScreen} options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="face-profile" color={color} size={26} />
          )
        }}></Tab.Screen>


      </Tab.Navigator>
    </NavigationContainer>


    )
}

export default MainNavigation
