import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './Login'
import { Main } from './Main'
import { OrderFind } from './OrderFind'
import { OrderShow } from './OrderShow'
import { CameraView } from './Camera'

const Stack = createStackNavigator();

export const Navigation = props => {
   return (
      <NavigationContainer >
         <Stack.Navigator>
            <Stack.Screen name="MainScreen" component={Main} options={{headerShown: false}}  />
            <Stack.Screen name="LoginScreen" component={Login} options={{ title: 'Авторизация' }} />
            <Stack.Screen name="OrderFindScreen" component={OrderFind} options={{ title: 'Найти заявку' }} />
            <Stack.Screen name="OrderShowScreen" component={OrderShow} options={{ title: 'Заявка' }} />
            <Stack.Screen name="CameraScreen" component={CameraView} options={{ title: 'Камера' }} />
         </Stack.Navigator>
      </NavigationContainer>

   )
}

