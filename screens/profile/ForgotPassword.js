import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { Input } from 'react-native-elements/dist/input/Input';
import { baseservice } from '../../service/baseservice';



const ForgotPassword = ({navigation}) => {

     const [email, setEmail] = useState('');

     const ForgotPassword = () => {
         if(email != '' && email != undefined && email != null){

            baseservice.post('/api/forgotpassword',{email:email})
            .then((res) => {
                if(res.statusCode == 200){

                    AsyncStorage.setItem('userId',res.data.id);

                    Alert.alert(
                        "Mesaj",
                        "EMail adresinize parola oluşturma linki gönderildi.",
                        [
                            { text: "OK", onPress: () => navigation.navigate('ConfirmCode')}
                        ]
                    );
                }
            })

         }
         else{
            Alert.alert(
                "Mesaj",
                "Email adresi boş geçilemez",
                [
                    { text: "OK", onPress: () => console.log('Validation error')}
                ]
            );
         }
     }

    return (
        <View>

            <Text h2 style={{ textAlign: 'center' }}>Forgot Password</Text>
            <Input
                placeholder='Email'
                value={email}
                onChangeText={(e) => setEmail(e)}
                autoCapitalize='none'
            />
            <Button title='Submit' style={{ backgroundColor: 'black' }}  onPress={() => ForgotPassword()}></Button>
            
            </View>
    )
}

export default ForgotPassword
