import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { View, Text, Alert, StyleSheet, TextInput} from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { Input } from 'react-native-elements/dist/input/Input';
import { baseservice } from '../../service/baseservice';



const ForgotPassword = ({ navigation }) => {

    const [email, setEmail] = useState('');

    const ForgotPassword = () => {
        if (email != '' && email != undefined && email != null) {

            baseservice.post('/api/forgotpassword', { email: email })
                .then((res) => {
                    if (res.statusCode == 200) {

                        AsyncStorage.setItem('userId', res.data.id);

                        Alert.alert(
                            "Mesaj",
                            "EMail adresinize parola oluşturma linki gönderildi.",
                            [
                                { text: "OK", onPress: () => navigation.navigate('ConfirmCode') }
                            ]
                        );
                    }
                })

        }
        else {
            Alert.alert(
                "Mesaj",
                "Email adresi boş geçilemez",
                [
                    { text: "OK", onPress: () => console.log('Validation error') }
                ]
            );
        }
    }

    return (
        <View>

            <Text style={textStyles.input}>Forgot Password</Text>
            <Text style={textStyles2.input}>Give us your registered E-mail and we'll send a reset link</Text>

            <TextInput
                placeholder='E-mail'
                value={email}
                onChangeText={(e) => setEmail(e)}
                autoCapitalize='none'
                style={styles.input}
            />

            <Button title='SEND' style={{ backgroundColor: 'black', marginLeft: 30, marginRight: 30, marginBottom: 20, borderRadius: 10 }} onPress={() => ForgotPassword()}></Button>

        </View>
    )
}

const textStyles = StyleSheet.create({
    input: {

        marginTop: 40,
        marginBottom: 10,
        paddingLeft: 50,
        paddingRight: 50,
        fontSize: 30,
        fontWeight: "bold"

    },
});

const textStyles2 = StyleSheet.create({
    input: {

       
        marginBottom: 20,
        paddingLeft: 50,
        paddingRight: 50,
        fontSize: 20,
        

    },
});

const styles = StyleSheet.create({
    input: {
        height: 50,
        margin: 12,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 10,
        marginBottom: 20
    },
});
export default ForgotPassword
