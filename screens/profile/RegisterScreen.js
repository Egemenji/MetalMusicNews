import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import React, { useContext, useState } from 'react'
import { View, Alert, Button, Text, StyleSheet, TextInput } from 'react-native'
import { Input } from 'react-native-elements/dist/input/Input'
import * as yup from 'yup'
import loginContext from '../../store/loginContext';
import { Picker } from '@react-native-picker/picker';
import { cities } from '../../data/cities'
import { baseservice } from '../../service/baseservice'

import SelectDropdown from 'react-native-select-dropdown'


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
    const [selectedCity, setSelectedCity] = useState();
    const city = cities.map((item, key) => {

        return (item)
    })



    return (
        <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: '', name: '', surname: '', password: '' }}
            onSubmit={(values) => {

                baseservice.post('/api/register', { email: values.email, name: values.name, surname: values.surname, password: values.password, city: selectedCity })
                    .then((res) => {
                        if (res.statusCode == 422) {
                            Alert.alert(
                                "HATA",
                                "Bu email sisteme kayıtlı!",
                                [
                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                ]
                            );

                            throw new Error("EMail validation error!");
                        }
                        else if (res.statusCode == 200) {
                            AsyncStorage.setItem('loginStatus', "1");
                            setLoginView(0);


                            Alert.alert(
                                "Mesaj",
                                "İşlem başarılı!",
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


            }}
        >

            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View>

                    <Text style={textStyles.input}>Welcome to          Metal Music Store</Text>

                    <TextInput
                        onChangeText={handleChange('email')}
                        placeholder='E-mail'
                        onBlur={handleBlur('email')}
                        value={values.email}
                        autoCapitalize='none'
                        style={styles.input}
                    />

                    <TextInput
                        placeholder='Name'
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder='Surname'
                        onChangeText={handleChange('surname')}
                        onBlur={handleBlur('surname')}
                        value={values.surname}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder='Password'
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry={true}
                        style={styles.input}
                    />

                    {/* <Picker

                        selectedValue={selectedCity}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedCity(itemValue)
                        }>

                        {
                            cities.map((item, key) => {

                                return (<Picker.Item label={item.name} key={key} value={item.name} />)
                            })
                        }

                    </Picker> */}


                    <SelectDropdown
                        
                        data={city}
                        onSelect={(selectedItem, index) => {
                            setSelectedCity(selectedItem)

                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem.name
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item.name
                        }}
                    />

                    {errors.email &&
                        <Text style={{ color: 'red' }}>{errors.email}</Text>
                    }
                    {errors.name &&
                        <Text style={{ color: 'red' }}>{errors.name}</Text>
                    }

                    <Button onPress={handleSubmit} color = "black" title="REGISTER" />

                    <View style={container.input}>


                        <Text style={accountStyle.input}>Already have an account?</Text>
                        <Text style={loginStyle.input} onPress={() => navigation.navigate('Login')}>LOGIN</Text>

                    </View>


                </View>
            )}
        </Formik>
    )
}

const textStyles = StyleSheet.create({
    input: {

        marginTop: 70,
        marginBottom: 20,
        paddingLeft: 50,
        paddingRight: 50,
        fontSize: 30,
        fontWeight: "bold"

    },
});

const styles = StyleSheet.create({
    input: {
        height: 50,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 10,
    },
});


const container = StyleSheet.create({
    input: {
        flexDirection: "row"
    },
});

const accountStyle = StyleSheet.create({
    input: {
        paddingLeft : 75 , 
        fontWeight: "bold" , 
        color : "#7F8282" , 
        marginTop: 10,
    },
});

const loginStyle = StyleSheet.create({
    input: {

        marginBottom: 20,
        paddingLeft: 10,
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 10,
    },
});


export default RegisterScreen
