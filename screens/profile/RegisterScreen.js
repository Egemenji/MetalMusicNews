import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import React, { useContext } from 'react'
import { View, Alert, Button, Text } from 'react-native'
import { Input } from 'react-native-elements/dist/input/Input'
import * as yup from 'yup'
import loginContext from '../../store/loginContext'



const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email Address is Required'),
    name: yup
        .string()
        .required('Name is required'),
})

const RegisterScreen = ({ navigation }) => {

    const { setLoginView } = useContext(loginContext);


    return (
        <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: '', name: '', surname: '', password: '' }}
            onSubmit={(values) => {

                let requestOptions = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: values.email, name: values.name, surname: values.surname, password: values.password })
                };



                fetch('http://localhost:1900/api/register', requestOptions)
                    .then((res) => {

                        if (res.status == 200) {
                            return res.json()
                        }
                        else if (res.status == 422) {
                            Alert.alert(
                                "HATA",
                                "Bu email sisteme kayıtlı!",
                                [
                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                ]
                            );

                            throw new Error("EMail validation error!");
                        }

                    })
                    .then((data) => {

                        AsyncStorage.setItem('loginStatus', "1");
                        setLoginView(0);


                        Alert.alert(
                            "Mesaj",
                            "İşlem başarılı!",
                            [
                                { text: "OK", onPress: () => navigation.navigate('Profile') }
                            ]
                        );

                    })
                    .catch((err) => {
                        console.log('ERROR', err);
                    })


            }}
        >

            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View>
                    <Input
                        onChangeText={handleChange('email')}
                        placeholder='EMail'
                        onBlur={handleBlur('email')}
                        value={values.email}
                        autoCapitalize='none'
                    />

                    <Input
                        placeholder='Name'
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                    />
                    <Input
                        placeholder='Surname'
                        onChangeText={handleChange('surname')}
                        onBlur={handleBlur('surname')}
                        value={values.surname}
                    />
                    <Input
                        placeholder='Password'
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry={true}
                    />
                    {errors.email &&
                        <Text style={{ color: 'red' }}>{errors.email}</Text>
                    }
                    {errors.name &&
                        <Text style={{ color: 'red' }}>{errors.name}</Text>
                    }
                    <Button onPress={handleSubmit} title="Submit" />
                </View>
            )}
        </Formik>
    )
}

export default RegisterScreen
