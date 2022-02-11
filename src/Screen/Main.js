import React, { useState, useEffect }  from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, ImageBackground, Image, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Main = ({ navigation }) => {
   const [logged, setLogged] = useState('');

   // let logged = (AsyncStorage.getItem('logged')) ? AsyncStorage.getItem('logged') : false;
   // if(logged === true){
   //    navigation.navigate('OrderFindScreen')
   // }
   return (
      <View style={styles.main}>
         <ImageBackground source={require("../../assets/mainBack.jpg")} resizeMode="cover" style={styles.back} imageStyle={{ opacity: 0.03 }}>
            <Text style={styles.mainText}>Найдите заявку по номеру и приложите фото транспортного средства</Text>
            <Image style={styles.image} source={require('../../assets/add-photo.png')} />
         </ImageBackground>
         <View style={{ margin: 40 }}>
            <Button title="Авторизация" color="#2e2e2e" onPress={() => navigation.navigate('LoginScreen')} />
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   main: {
      flex: 1,
      height: 100,
      backgroundColor: '#fff',
      justifyContent: "flex-start",
   },
   back: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   mainText: {
      textAlign: 'center',
      fontSize: 20,
      padding: 20
   },
   image: {
      width: 128,
      height: 128,
   },


});