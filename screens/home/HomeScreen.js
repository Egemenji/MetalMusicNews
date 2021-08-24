import { Formik } from 'formik'
import React from 'react'
import { View, TextInput, Button, Text } from 'react-native'
import { Input } from 'react-native-elements/dist/input/Input'
import * as yup from 'yup'


const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email Address is Required'),
    name: yup
        .string()
        .required('Name is required'),
})

const HomeScreen = () => {


    return (
        <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: '', name: '', surname: '' }}
            onSubmit={values => console.log(values)}
        >

            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View>
                    <Input
                        onChangeText={handleChange('email')}
                        placeholder='EMail'
                        onBlur={handleBlur('email')}
                        value={values.email}
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

export default HomeScreen
