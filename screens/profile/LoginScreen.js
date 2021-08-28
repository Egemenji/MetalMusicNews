import React, { useContext, useState } from 'react';
import { View, Alert } from 'react-native';
import { Text } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Input } from 'react-native-elements/dist/input/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginContext from '../../store/loginContext';


const LoginScreen = ({navigation}) => {

   
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {setLoginView} = useContext(loginContext);

    const  loginControl = () => {
        //servisten kontrol ettik

        let requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email,password: password })
        };



        fetch('http://localhost:1900/api/logincontrol', requestOptions)
            .then((res) => {

                if (res.status == 200) {
                    return res.json()
                }
                else if (res.status == 422) {
                    Alert.alert(
                        "HATA",
                        "Kullanıcı adı veya şifre hatalı",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );

                    throw new Error("Username or password exception!");
                }

            })
            .then((data) => {

                AsyncStorage.setItem('loginStatus',"1");
                setLoginView(0);


                Alert.alert(
                    "Mesaj",
                    "Giriş başarılı!",
                    [
                        { text: "OK", onPress: () => navigation.navigate('Profile') }
                    ]
                );

            })
            .catch((err) => {
                console.log('ERROR', err);
            })

        }


    return (
        <View>

            <Text h2 style={{textAlign:'center'}}>Login Form</Text>
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

            <Button title='Login' style={{backgroundColor:'black'}} onPress={() => loginControl()}></Button>
            <Button title='Register' style={{backgroundColor:'black'}} onPress={() => navigation.navigate('Register')}></Button>

        </View>
    )
}


export default LoginScreen
