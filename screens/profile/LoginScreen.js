import React, { useContext, useState } from 'react';
import { View, Alert, StyleSheet, TextInput } from 'react-native';
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

                    navigation.navigate('Profile')
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

            <Text style={textStyles.input}>Welcome,      good to see    you again</Text>


            <TextInput

                placeholder='Email'
                value={email}
                onChangeText={(e) => setEmail(e)}
                autoCapitalize='none'
                style={styles.input}

            />

            <TextInput
                placeholder='Password'
                secureTextEntry={true}
                value={password}
                onChangeText={(e) => setPassword(e)}
                style={styles.input}

            />

            <Text onPress={() => navigation.navigate('ForgotPassword')} style={ForgotPasswordStyle.input}>FORGOT PASSWORD</Text>

            <Button title='LOGIN' style={{ backgroundColor: 'black', marginLeft: 70, marginRight: 70, marginBottom: 20, borderRadius: 10 }} onPress={() => loginControl()}></Button>


            <View style={container.input}>


            <Text style = {accountStyle.input}>Don't have an account?</Text>
            <Text style={registerStyle.input} onPress={() => navigation.navigate('Register')}>REGISTER</Text>


            </View>



        </View>
    )
}
const textStyles = StyleSheet.create({
    input: {

        marginTop: 50,
        marginBottom: 10,
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 50,
        fontSize: 40,

    },
});


const styles = StyleSheet.create({
    input: {
        height: 50,
        margin: 12,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 10,
    },
});

const ForgotPasswordStyle = StyleSheet.create({
    input: {

        marginTop: 10,
        marginBottom: 20,
        paddingLeft: 120,
        fontSize: 15,
        fontWeight : "bold"

    },
});

const accountStyle = StyleSheet.create({
    input: {
        paddingLeft : 75 , 
        fontWeight: "bold" , 
        color : "#7F8282" , 
    },
});

const registerStyle = StyleSheet.create({
    input: {

        marginBottom: 20,
        paddingLeft: 10,
        fontSize: 15,
        fontWeight: "bold"
    },
});

const container = StyleSheet.create({
    input: {
   flexDirection: "row"
    },
});


export default LoginScreen
