import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Artists from '../screens/Artists';
import ArtistDetailScreen from '../screens/ArtistDetailScreen';



const ArtistStack = createNativeStackNavigator();

const ArtistStackScreen = () => {
    return (
        <ArtistStack.Navigator>
            <ArtistStack.Screen name='Artist' component={Artists}></ArtistStack.Screen>
            <ArtistStack.Screen name='ArtistDetail' component={ArtistDetailScreen}></ArtistStack.Screen>
        </ArtistStack.Navigator>
    )
}

export default ArtistStackScreen
