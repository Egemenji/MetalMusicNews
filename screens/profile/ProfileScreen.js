import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'
import loginContext from '../../store/loginContext'




const ProfileScreen = ({navigation}) => {

    const { setLoginView} = useContext(loginContext);

    const signOut = () => {
        AsyncStorage.clear();
        setLoginView(1);

        alert('Çıkış başarılı');
        
    }

    return (
        <View>
            <Text>Profile Screen</Text>
            <Button title='Çıkış' onPress={() => signOut()} style={{backgroundColor:'tomato'}}></Button>
        </View>
    )
}

export default ProfileScreen
