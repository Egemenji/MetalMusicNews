import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext, useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { baseservice } from '../../service/baseservice'
import loginContext from '../../store/loginContext'




const ProfileScreen = ({ navigation })=> {

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

        alert('Çıkış başarılı');

    }

    return (
        <View>

            <Text>Name: {mobileUser.name} </Text>
            <Text>Surname: {mobileUser.surname} </Text>
            <Text>EMail: {mobileUser.email}</Text>
            <Text>City: {mobileUser.city} </Text>
            <Text>Register Date: {mobileUser.addDate}</Text>

            <Text style={{color:'aqua'}} onPress={() => navigation.navigate('ChangePassword')}>Change Password</Text>

            <Button title='Çıkış' onPress={() => signOut()} style={{ backgroundColor: 'tomato' }}></Button>
        </View>
    )
}

export default ProfileScreen
