import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { Input } from 'react-native-elements/dist/input/Input';
import { baseservice } from '../../service/baseservice';



const ConfirmCodeScreen = ({ navigation }) => {

    const [confirmCode, setConfirmCode] = useState('');

    let id;
    AsyncStorage.getItem('userId').then((userId) => {
        id = userId;
    })

    const confirm = () => {
        if (confirmCode != '' && confirmCode != undefined && confirmCode != null) {

            baseservice.post('/api/confirmCode', { code: confirmCode, id: id })
                .then((res) => {
                    if (res.statusCode == 200) {


                        Alert.alert(
                            "Mesaj",
                            "Doğrulama kodu başarılı!",
                            [
                                { text: "OK", onPress: () => navigation.navigate('NewPassword') }
                            ]
                        );
                    }
                })

        }
        else {
            Alert.alert(
                "Mesaj",
                "Confirm code boş geçilemez",
                [
                    { text: "OK", onPress: () => console.log('Validation error') }
                ]
            );
        }
    }

    return (
        <View>

            <Text h2 style={{ textAlign: 'center' }}>Code</Text>
            <Input
                placeholder='Confirm Code'
                value={confirmCode}
                onChangeText={(e) => setConfirmCode(e)}
                autoCapitalize='none'
            />
            <Button title='Submit' style={{ backgroundColor: 'black' }} onPress={() => confirm()}></Button>

        </View>
    )
}

export default ConfirmCodeScreen
