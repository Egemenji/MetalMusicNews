import React, {useContext, useState} from 'react'
import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from '../screens/product/ProductListScreen'
import LoginScreen from '../screens/profile/LoginScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginContext from '../store/loginContext';

const ProfileStack = createNativeStackNavigator();


const ProfileStackScreen = () => {

    const {loginView, setloginView} = useContext(loginContext);

    AsyncStorage.getItem('loginStatus').then((data)=>{
        if(data == 'true'){
            setloginView(false);
        }
        else{
            setloginView(true)
        }
    })

    return (
        <ProfileStack.Navigator>
            {
                loginView == true ? (<ProfileStack.Screen name='Login' component={LoginScreen} options={{
                    headerShown: false,
    
                }}></ProfileStack.Screen>) : <></>
            }
            

            <ProfileStack.Screen name='Profile' component={ProfileScreen} options={{
                headerShown: false,

            }}></ProfileStack.Screen>
        </ProfileStack.Navigator>
    )
}

export default ProfileStackScreen
