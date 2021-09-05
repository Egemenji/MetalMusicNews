import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Appearance } from 'react-native'




const HomeScreen = () => {

    const [batteryLevel, setBatteryLevel] = useState(0);
    const [deviceId, setDeviceId] = useState('');
    const [totalMemory, settotalMemory] = useState(0);
    const [isBatteryCharging, setisBatteryCharging] = useState(false)

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
            
            alert(isCharging)

            setisBatteryCharging(isCharging)

          });


    }, [])

    return (
        <>
            <View>
                <Text>Battery Level: {batteryLevel}</Text>
                <Text>Device Type: {deviceId}</Text>
                <Text>Device Model: {DeviceInfo.getModel()}</Text>
                <Text>Display Mode: {Appearance.getColorScheme()}</Text>
                <Text>Total Memory: {totalMemory}</Text>
                <Text>is Battery Charging: {isBatteryCharging}</Text>


            </View>
        </>

    )
}

export default HomeScreen
