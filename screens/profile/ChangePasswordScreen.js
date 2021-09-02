import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import React, { useContext } from 'react'
import { View, Button, Alert, StyleSheet, TextInput } from 'react-native';
import { Text } from 'react-native-elements';
import { Input } from 'react-native-elements/dist/input/Input'
import * as yup from 'yup';
import { baseservice } from '../../service/baseservice';
import loginContext from '../../store/loginContext';


const confirmPasswordValidationSchema = yup.object().shape({
    oldPassword: yup
        .string()
        .required('Old password is required'),
    newPassword: yup
        .string()
        .required('newPassword is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
        .required('confirmPassword is required')

})


const ChangePasswordScreen = ({navigation}) => {

    const { setLoginView } = useContext(loginContext);


    return (
        <View>
            <Formik
                validationSchema={confirmPasswordValidationSchema}
                initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
                onSubmit={(values) => {

                    AsyncStorage.getItem('userId').then((userId) => {
                        let postData = {
                            id: userId,
                            oldPassword: values.oldPassword,
                            newPassword: values.newPassword
                        };
                     
                        baseservice.post('/api/changePassword', postData)
                            .then((res) => {
                                if (res.statusCode == 200) {

                                    AsyncStorage.clear();
                                    setLoginView(1);

                                    Alert.alert(
                                        "Mesaj",
                                        "Parola değiştirme işlemi başarılı!",
                                        [
                                            { text: "OK", onPress: () => navigation.navigate('Login')}
                                        ]
                                    );

                                }
                                else if (res.statusCode == 422) {
                                    Alert.alert(
                                        "HATA",
                                        "Eski parola hatalı",
                                        [
                                            { text: "OK", onPress: () => console.log("OK Pressed") }
                                        ]
                                    );

                                    throw new Error("Change password validation error!");
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
                        <TextInput
                            onChangeText={handleChange('oldPassword')}
                            onBlur={handleBlur('oldPassword')}
                            value={values.oldPassword}
                            secureTextEntry={true}
                            placeholder='Old password'
                            style = {styles.input}
                        />
                        <TextInput
                            onChangeText={handleChange('newPassword')}
                            onBlur={handleBlur('newPassword')}
                            value={values.newPassword}
                            secureTextEntry={true}
                            placeholder='New password'
                            style = {styles.input}
                        />
                        <TextInput
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            secureTextEntry={true}
                            placeholder='Confirm password'
                            style = {styles.input}
                        />

                        {errors.oldPassword &&
                            <Text style={{ color: 'red' }}>{errors.oldPassword}</Text>
                        }
                        {errors.newPassword &&
                            <Text style={{ color: 'red' }}>{errors.newPassword}</Text>
                        }
                        {errors.confirmPassword &&
                            <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>
                        }

                        <Button onPress={handleSubmit} color = "black" title="Submit" />
                    </View>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 10,
    },
});

export default ChangePasswordScreen
