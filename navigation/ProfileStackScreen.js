import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/profile/LoginScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import loginContext from '../store/loginContext';
import RegisterScreen from '../screens/profile/RegisterScreen';
import ChangePasswordScreen from '../screens/profile/ChangePasswordScreen';

const ProfileStack = createNativeStackNavigator();


const ProfileStackScreen = () => {

    const { loginView } = useContext(loginContext);

    return (
        <ProfileStack.Navigator>
            {
                loginView != 0 ? (<ProfileStack.Screen name='Login' component={LoginScreen} options={{
                    headerShown: false,

                }}></ProfileStack.Screen>) : <ProfileStack.Screen name='Profile' component={ProfileScreen} options={{
                    headerShown: false,

                }}></ProfileStack.Screen>
            }

            <ProfileStack.Screen name='Register' component={RegisterScreen} options={{
                headerShown: false,
            }}>
            </ProfileStack.Screen>

            <ProfileStack.Screen name='ChangePassword' component={ChangePasswordScreen} options={{
                headerShown: false,
            }}></ProfileStack.Screen>



        </ProfileStack.Navigator>
    )
}

export default ProfileStackScreen
