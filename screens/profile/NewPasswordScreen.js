import { Formik } from 'formik';
import React from 'react'
import { View, Text, Alert } from 'react-native'
import { Input } from 'react-native-elements/dist/input/Input';
import { baseservice } from '../../service/baseservice';
import * as yup from 'yup';
import { Button } from 'react-native-elements/dist/buttons/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';



const newPasswordValidationSchema = yup.object().shape({
    password: yup
        .string()
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('confirmPassword is required')

})



const NewPasswordScreen = ({navigation}) => {


    return (
        <View>
            <Formik
                validationSchema={newPasswordValidationSchema}
                initialValues={{ password: '', confirmPassword: '' }}
                onSubmit={(values) => {

                    AsyncStorage.getItem('userId').then((userId) => {
                        let postData = {
                            id: userId,
                            password: values.password
                        };
                     
                        baseservice.post('/api/newPassword', postData)
                            .then((res) => {
                                if (res.statusCode == 200) {

                                 
                                    Alert.alert(
                                        "Mesaj",
                                        "Parola oluşturma işlemi başarılı!",
                                        [
                                            { text: "OK", onPress: () => navigation.navigate('Login')}
                                        ]
                                    );

                                }
                                else {
                                    Alert.alert(
                                        "Mesaj",
                                        "Sistemde hata meydana geldi",
                                        [
                                            { text: "OK", onPress: () => navigation.navigate('Profile') }
                                        ]
                                    );
                                }
                            })
                    })

                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View>

                        <Input
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={true}
                            placeholder='Password'

                        />
                        <Input
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            secureTextEntry={true}
                            placeholder='Confirm password'
                        />

                     
                        {errors.password &&
                            <Text style={{ color: 'red' }}>{errors.password}</Text>
                        }
                        {errors.confirmPassword &&
                            <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>
                        }


                        <Button onPress={handleSubmit} title="Submit" />
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default NewPasswordScreen
