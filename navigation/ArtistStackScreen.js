import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Artists from '../screens/artist/Artists';
import ArtistDetailScreen from '../screens/artist/ArtistDetailScreen';



const ArtistStack = createNativeStackNavigator();

const ArtistStackScreen = () => {
    return (
        <ArtistStack.Navigator>
            <ArtistStack.Screen name='Artist' component={Artists} options={{
                headerShown: false,

            }} ></ArtistStack.Screen>

            <ArtistStack.Screen name='ArtistDetail' component={ArtistDetailScreen} options={{ title : "", 
                headerShown: true

            }} ></ArtistStack.Screen>
        </ArtistStack.Navigator>
    )
}

export default ArtistStackScreen
