import React, {useState} from 'react';
import { render } from 'react-dom';
import { StyleSheet, TextInput, View, Button, ActivityIndicator, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrl, apiToken } from '../../App.js';
import axios from 'axios';

export const OrderFind = ({ navigation }) => {
   const [orderId, setOrderId] = useState('');
   const [userId, setUserId] = useState('');
   const [loaded, setLoad] = useState(false);

   AsyncStorage.getItem("user_id").then((value) => {
      setUserId(JSON.parse(value));
      setLoad(false)
   })

   const handleSubmitPress = () => {
      if(orderId != ''){
         setLoad(true)
         let config = {
            headers: { 
               'Access-Control-Allow-Origin': '*'
            }
         }
         axios.post(apiUrl+'/api/order/find', {order_id:orderId, user_id: userId, token: apiToken }, config).then(response => {
            if (response.data.success == true) {
               navigation.navigate('OrderShowScreen', {orderId: orderId, uploaded:false});
            } else {
               alert('Заявка не доступна!');
               setLoad(false)
            }
         }).catch((error) => {
             setLoad(false)
         });
      }else{
         alert('Введите номер заявки!');
      }
   }

   const logoutPress = () => {
      AsyncStorage.setItem("user_id", '');
      AsyncStorage.setItem("logged", JSON.stringify(false));
      navigation.navigate('MainScreen');
   }


   return (
     
      <View style={styles.container}>

         {loaded ? (
            <View style={{textAlign: "center", marginTop:40}}>
               <ActivityIndicator size="large" color="#4040C1"/>
               <Text style={{textAlign: "center"}}>Пожалуйста ждите, идет загрузка данных!</Text>
            </View>
         ): (
            <View >
               <View style={styles.form}>
                  <TextInput placeholder="Введите номер заявки" style={styles.textfield} onChangeText={(orderId) => setOrderId(orderId)} maxLength={10}  keyboardType="numeric"/>
                  <Button title="Найти" onPress={handleSubmitPress} />
               </View>
            </View>
            )
         }
         <View >
            <Button color="#000" title="Выйти" onPress={logoutPress} />
         </View>

      </View>
   
   )

}

const styles = StyleSheet.create({

   container: {
      flex: 1, 
      flexDirection: 'column', 
      justifyContent: 'space-between',
      padding:20
   },
   form: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
   },
   textfield: {
      padding: 5,
      fontSize: 18,
      borderWidth: 1,
      borderColor: '#c9c9c9',
      borderRadius: 6,
      width: '80%'
   }

});