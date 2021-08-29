import { Formik } from 'formik';
import React from 'react'
import { View, Button } from 'react-native';
import { Text } from 'react-native-elements';
import { Input } from 'react-native-elements/dist/input/Input'
import * as yup from 'yup';



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


const ChangePasswordScreen = () => {
    return (
        <View>
            <Formik
                validationSchema={confirmPasswordValidationSchema}
                initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
                onSubmit={values => console.log(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View>
                        <Input
                            onChangeText={handleChange('oldPassword')}
                            onBlur={handleBlur('oldPassword')}
                            value={values.oldPassword}
                            secureTextEntry={true}
                            placeholder='Old password'
                        />
                        <Input
                            onChangeText={handleChange('newPassword')}
                            onBlur={handleBlur('newPassword')}
                            value={values.newPassword}
                            secureTextEntry={true}
                            placeholder='New password'

                        />
                        <Input
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            secureTextEntry={true}
                            placeholder='Confirm password'
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


                        <Button onPress={handleSubmit} title="Submit" />
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default ChangePasswordScreen
