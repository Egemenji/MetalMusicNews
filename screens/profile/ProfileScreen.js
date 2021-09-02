import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { baseservice } from '../../service/baseservice'
import loginContext from '../../store/loginContext'




const ProfileScreen = ({ navigation }) => {

    const [mobileUser, setMobileUser] = useState({});
    const { setLoginView } = useContext(loginContext);

    useEffect(() => {

        AsyncStorage.getItem('userId').then((res) => {
            let userId = res;
            baseservice.get('/api/mobileuser/' + userId)
                .then((res) => {
                    if (res.statusCode == 200) {
                        setMobileUser(res.data);
                    }
                })
        })




    }, [])

    const signOut = () => {
        AsyncStorage.clear();
        setLoginView(1);

        navigation.navigate('Home')

    }

    return (
        <View>
            <Text style={textStyles1.input}>Name: {mobileUser.name} </Text>
            <Text style={textStyles.input}>Surname: {mobileUser.surname} </Text>
            <Text style={textStyles.input}>EMail: {mobileUser.email}</Text>
            <Text style={textStyles.input}>City: {mobileUser.city} </Text>
            <Text style={textStyles.input}>Register Date: {mobileUser.addDate}</Text>



            <View style={container.input}>

            <Text style={accountStyle.input}>Forgot Password?</Text>

                <Text style={changeStyle.input} onPress={() => navigation.navigate('ChangePassword')}>Change Password</Text>

            </View>

            <Button title='LOGOUT' style={{ backgroundColor: 'tomato', marginLeft: 70, marginRight: 70, marginBottom: 20, marginTop: 50, borderRadius: 10 }} onPress={() => signOut()}></Button>
        </View>
    )
}

const textStyles1 = StyleSheet.create({
    input: {
        marginTop: 30,
        marginBottom: 10,
        paddingLeft: 30,
        fontSize: 20,
    },
});

const textStyles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingLeft: 30,
        fontSize: 20,
    },
});

const accountStyle = StyleSheet.create({
    input: {
        marginTop: 30,
        paddingLeft: 50,
        fontWeight: "bold",
        color: "#7F8282",
        fontSize: 15,
    },
});

const changeStyle = StyleSheet.create({
    input: {
        marginTop: 30,
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

export default ProfileScreen
