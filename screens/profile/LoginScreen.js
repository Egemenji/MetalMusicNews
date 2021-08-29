import React, { useContext, useState } from 'react';
import { View, Alert } from 'react-native';
import { Text } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Input } from 'react-native-elements/dist/input/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginContext from '../../store/loginContext';
import { baseservice } from '../../service/baseservice';


const LoginScreen = ({ navigation }) => {



    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setLoginView } = useContext(loginContext);

    const loginControl = () => {


        baseservice.post('/api/logincontrol', { email: email, password: password })
            .then((res) => {

           

                if (res.statusCode == 422) {
                    Alert.alert(
                        "HATA",
                        "Kullanıcı adı veya şifre hatalı",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );

                    throw new Error("Username or password exception!");
                }
                else if (res.statusCode == 200) {

            
                    AsyncStorage.setItem('loginStatus', "1");
                    AsyncStorage.setItem('userId', res.data.data._id)
                    setLoginView(0);


                    Alert.alert(
                        "Mesaj",
                        "Giriş başarılı!",
                        [
                            { text: "OK", onPress: () => navigation.navigate('Profile') }
                        ]
                    );
                }
                else {
                    Alert.alert(
                        "Hata",
                        "Sistemde hata meydana geldi!",
                        [
                            { text: "OK", onPress: () => navigation.navigate('Profile') }
                        ]
                    );
                }
            })
    }


    return (
        <View>

            <Text h2 style={{ textAlign: 'center' }}>Login Form</Text>
            <Input
                placeholder='Email'
                value={email}
                onChangeText={(e) => setEmail(e)}
                autoCapitalize='none'
            />

            <Input
                placeholder='Password'
                secureTextEntry={true}
                value={password}
                onChangeText={(e) => setPassword(e)}
            />

            <Button title='Login' style={{ backgroundColor: 'black' }} onPress={() => loginControl()}></Button>
            <Button title='Register' style={{ backgroundColor: 'black' }} onPress={() => navigation.navigate('Register')}></Button>

        </View>
    )
}


export default LoginScreen
