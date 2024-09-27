import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens

import Signup from './src/auth/Signup';
import Center from './src/Center';
import Details from './src/Details';
import Booking from './src/Booking';
import BookingInput from './src/BookingInput';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    //navigation container for stack navigation
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Signup'>

        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Center" component={Center} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Booking" component={Booking} />
        <Stack.Screen name="BookingInput" component={BookingInput} options={{ title: "Booking" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
