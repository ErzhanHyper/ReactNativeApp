import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Button, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { apiUrl, apiToken } from '../../App.js';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const OrderShow = ({ route, navigation }) => {
   const [selectedValue, setSelectedValue] = useState('');
   const [list, setList] = useState([]);
   const [data, setData] = useState([]);
   const [loaded, setLoad] = useState(true);
   const [uploaded_list, setUploadedList] = useState([]);

   useEffect(() => {
      getData();

      const unsubscribe = navigation.addListener('focus', () => {
         console.log('blur');
         if(uploaded){
            getList();
            getUploadedList();
         }
       });
   
       return unsubscribe;

   }, [navigation]);

   const order = {
      id: route.params.orderId,
   }

   const uploaded = {
      id: route.params.uploaded,
   }
  
   const toggleCamera = () => {
      if(selectedValue >= 8){
         navigation.navigate('CameraScreen', {photoTypeId: selectedValue, orderId: order.id});
      }else{
         alert('Выберите тип снимка из списка');
      }
   }

   const logoutPress = () => {
      AsyncStorage.setItem("user_id", '');
      AsyncStorage.setItem("logged", JSON.stringify(false));
      navigation.navigate('MainScreen');
   }

   const getData =() => {
      axios.get(apiUrl+'/api/order/show/'+order.id+'?token='+apiToken).then(( response ) => {
         order.id = response.data.order['id']
         order.idnum = response.data.order['idnum']
         order.fullname = response.data.order['fullname']
         order.vin = response.data.order['vin']
         order.grnz = response.data.order['grnz']
         setData(order)
         setLoad(false)
      }).catch((error) => {
         setLoad(false)
         navigation.navigate('OrderFindScreen');
      });
   }

   const getUploadedList = () => {
      axios.get(apiUrl+'/api/order/file_type/uploaded/'+order.id+'?token='+apiToken).then(( response ) => {
         setUploadedList(response.data.types)
      }).catch((error) => console.error(error));
   }

   const getList = () => {
      axios.get(apiUrl+'/api/order/file_type/'+order.id+'?token='+apiToken).then(( response ) => {
            setList(response.data.types)
         }).catch((error) => console.error(error));
   }

   return (
      <View style={styles.container}>

    {loaded ? (
      <View style={{textAlign: "center", marginTop:40}}>
         <ActivityIndicator size="large" color="#4040C1"/>
         <Text style={{textAlign: "center"}}>Пожалуйста ждите, идет загрузка данных!</Text>
      </View>
    ): (
      
         <View style={styles.grid}>
            <Text style={styles.text}>№ заявки: {data.id}</Text>
            <Text style={styles.text}>ФИО: {data.fullname}</Text>
            <Text style={styles.text}>ИИН: {data.idnum}</Text>
            <Text style={styles.text}>VIN: {data.vin}</Text>
            <Text style={styles.text}>ГРНЗ: {data.grnz}</Text>
            <Text style={{ marginTop: 20, marginBottom: 0 }}></Text>
            <Text style={{ fontSize: 18 }}>Загрузка фотографии</Text>

            <Picker style={{ height: 30, marginBottom: 10, borderRadius: 4, marginTop: 20 }} selectedValue={selectedValue} onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
            <Picker.Item label={'--Выерите из списка--'} key={1111}/>
            
            {list.map((item, i) => { 
                  return (
                     <Picker.Item label={item.title} key={i} value={item.id} />
                  )
               }) 
            }
            </Picker>

            <Button title="Выбрать" onPress={toggleCamera} style={{fontSize:20}}/>

         
            <View style={{marginTop:20}}>
               <Text>Загруженные файлы:</Text>
               {uploaded_list.map((item, i) => { 
                     return (
                        <Text key={i}>{item.title}</Text>
                     )
                  }) 
               }
            </View>

         </View>
        
       
    )

   }
   {!loaded ? (
      <View>
         <Button color="#000" title="Выйти" onPress={logoutPress} />
      </View>
      ): (
         <View>
         </View>
      )}
      </View>
   )

}

const styles = StyleSheet.create({

   container: {
      flex: 1,
      padding: 20,
   },

   grid: {
      flex: 1,
      marginTop: 10,
   },

   text: {
      fontSize: 22
   }

});