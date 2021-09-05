import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Appearance } from 'react-native'
import { RNCamera } from 'react-native-camera';
import Contacts from 'react-native-contacts';
import CameraRoll from "@react-native-community/cameraroll";

const HomeScreen = () => {

    const [batteryLevel, setBatteryLevel] = useState(0);
    const [deviceId, setDeviceId] = useState('');
    const [totalMemory, settotalMemory] = useState(0);
    const [isBatteryCharging, setisBatteryCharging] = useState(false);
    const [contacts, setContacts] = useState([])

    useEffect(() => {

        DeviceInfo.getBatteryLevel().then((batteryLevel) => {

            setBatteryLevel(batteryLevel * 100);

        });

        let device = DeviceInfo.getDeviceId();
        setDeviceId(device);

        DeviceInfo.getTotalMemory().then((totalMemory) => {

            settotalMemory(totalMemory);
        });

        DeviceInfo.isBatteryCharging().then((isCharging) => {
            isCharging ? setisBatteryCharging(1) : setisBatteryCharging(0)

        });

        Contacts.getAll().then(data => {

            setContacts(data)


            data.map(item => {
                console.log(item.phoneNumbers[0].number);
            })

        })


        // CameraRoll.getAlbums().then((data) => {
        //     console.log('GALLERY',data);
        // })

    }, [])


    return (
        <>
            <ScrollView style={{ padding: 20 }}>
                <Text>Battery Level: {batteryLevel}</Text>
                <Text>Device Type: {deviceId}</Text>
                <Text>Device Model: {DeviceInfo.getModel()}</Text>
                <Text>Display Mode: {Appearance.getColorScheme()}</Text>
                <Text>Total Memory: {totalMemory}</Text>
                <Text>is Battery Charging: {isBatteryCharging}</Text>

                <View style={{ marginTop: 20 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Kişi Listesi</Text>
                    {
                        contacts.map((item) => {
                            return (<Text style={{ marginTop: 5 }}>{item.givenName} {item.familyName}  / {item.phoneNumbers[0].number}</Text>)
                        })
                    }
                </View>



            </ScrollView>
        </>

    )
}

export default HomeScreen
