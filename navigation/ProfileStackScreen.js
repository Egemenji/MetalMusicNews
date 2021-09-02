import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/profile/LoginScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import loginContext from '../store/loginContext';
import RegisterScreen from '../screens/profile/RegisterScreen';
import ChangePasswordScreen from '../screens/profile/ChangePasswordScreen';
import ForgotPassword from '../screens/profile/ForgotPassword';
import NewPasswordScreen from '../screens/profile/NewPasswordScreen';
import ConfirmCodeScreen from '../screens/profile/ConfirmCodeScreen';



const ProfileStack = createNativeStackNavigator();


const ProfileStackScreen = () => {

    const { loginView } = useContext(loginContext);

    return (
        <ProfileStack.Navigator>
            {
                loginView != 0 ? (<ProfileStack.Screen name='Login' component={LoginScreen} options={{
                    headerShown: false,

                }}></ProfileStack.Screen>) : (
                    <>  
                    <ProfileStack.Screen name='ProfileScreen' component={ProfileScreen} options={{ title : "",
                        headerShown: false,

                    }}></ProfileStack.Screen>

                        <ProfileStack.Screen name='ChangePassword' component={ChangePasswordScreen} options={{title: "",
                            headerShown: true,
                        }}></ProfileStack.Screen>
                    </>

                )
            }

            <ProfileStack.Screen name='Register' component={RegisterScreen} options={{ title : "",
                headerShown: true,
            }}>
            </ProfileStack.Screen>
            <ProfileStack.Screen name='ForgotPassword' component={ForgotPassword} options={{ title : "",
                headerShown: true,
            }}>
            </ProfileStack.Screen>
            
            <ProfileStack.Screen name='NewPassword' component={NewPasswordScreen} options={{
                headerShown: false,
            }}>
            </ProfileStack.Screen>

            <ProfileStack.Screen name='ConfirmCode' component={ConfirmCodeScreen} options={{
                headerShown: false,
            }}>
            </ProfileStack.Screen>



        </ProfileStack.Navigator>
    )
}



export default ProfileStackScreen
