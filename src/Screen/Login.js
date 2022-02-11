import React,{ useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button,ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { apiUrl, apiToken } from '../../App.js';

export const Login = ({ navigation }) => {
   const [userName, setUserName] = useState();
   const [userPassword, setUserPassword] = useState();
   const [loaded, setLoad] = useState(false);
   const [logged, setLogged] = useState('');

   useEffect(() => {
      const unsubscribe2 = navigation.addListener('focus', () => {
         AsyncStorage.getItem("logged").then((value) => {
            setLoad(false)
            if(JSON.parse(value) === true){
               navigation.navigate('OrderFindScreen')
            }
         })
      });
      return unsubscribe2;
   }, [navigation]);


   const handleSubmitPress = () => {
      setLoad(true)

      if (!userName) {
         alert('Заполните ИИН');
         return;
      }

      if (!userPassword) {
         alert('Заполните пароль');
         return;
      }

      let config = {
         headers: {
            'Authorization': 'Bearer ' + apiToken
         }
       }
       
      axios.post(apiUrl+'/api/login', { login: userName, password: userPassword, token: apiToken }).then(response => {
         
         if (response.data.success == true) {
            AsyncStorage.setItem('logged', JSON.stringify(true));
            AsyncStorage.setItem('user_id', JSON.stringify(response.data.token));
            navigation.navigate('OrderFindScreen');
         }else{
            alert('Неверные данные!');
            setLoad(false)
         }
      }).catch((error) => {
         alert('Не удалось авторизоваться!');
         setLoad(false)
      });
   };
   

   return (

      <View>
         {loaded ? (
            <View style={{textAlign: "center", marginTop:40}}>
               <ActivityIndicator size="large" color="#4040C1"/>
               <Text style={{textAlign: "center"}}>Пожалуйста ждите, идет загрузка данных!</Text>
            </View>
         ): (

         <View style={styles.form}>
            <TextInput placeholder="Введите ИИН" style={styles.textfield} onChangeText={(UserName) => setUserName(UserName)}  />
            <TextInput placeholder="Введите пароль" style={styles.textfield} onChangeText={(UserPassword) => setUserPassword(UserPassword) } secureTextEntry={true} />
            <Button title="Отправить" onPress={handleSubmitPress} />
         </View>
         )
      }
      </View>
   )
}

const styles = StyleSheet.create({
   form: {
      padding: 20,
   },
   textfield: {
      padding: 5,
      fontSize: 18,
      borderWidth: 1,
      borderColor: '#c9c9c9',
      borderRadius: 6,
      marginBottom: 15
   }
});