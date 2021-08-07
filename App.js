import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import Artists from './screens/Artists';
import Categories from './screens/Categories';
import Profile from './screens/Profile';
import News from './screens/News';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>

        <Tab.Screen name='Home' component={HomeScreen}></Tab.Screen>
        <Tab.Screen name='Artists' component={Artists} ></Tab.Screen>
        <Tab.Screen name='Categories' component={Categories}></Tab.Screen>
        <Tab.Screen name='Profile' component={Profile}></Tab.Screen>
        <Tab.Screen name='News' component={News}></Tab.Screen>

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;