import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Input } from 'react-native-elements/dist/input/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginContext from '../../store/loginContext';






const LoginScreen = () => {

   
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {loginView, setLoginView} = useContext(loginContext);

    const  loginControl = () => {
        //servisten kontrol ettik
        if(email == 'Cagatay@mail.com' && password == '123'){
            //kullanıcı adı şifre doğruysa store a login olduğunu söyleyeceğim
           
            AsyncStorage.setItem('loginStatus','true');

            alert('Giriş başarılı');

            setLoginView(false);

        }
        else{
            alert('Kullanıcı adı veya şifre hatalı')
        }
    }

    return (
        <View>

            <Text h2 style={{textAlign:'center'}}>Login Form</Text>
            <Input
                placeholder='Email'
                value={email}
                onChangeText={(e) => setEmail(e)}
            />

            <Input
                placeholder='Password'
                secureTextEntry={true}
                value={password}
                onChangeText={(e) => setPassword(e)}
            />

            <Button title='Login' style={{backgroundColor:'black'}} onPress={() => loginControl()}></Button>

        </View>
    )
}

export default LoginScreen
