import React, { useState } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Button, Picker } from 'react-native';
import { CameraBlock } from './Components/Camera.js.js'

export const OrderList = ({navigation}) => {
   this.setState({ showSearchBar: !this.state.showSearchBar });
   this.showSearchBar = this.showSearchBar.bind(this);
   return (
      <View style={styles.container}>
         <View style={styles.grid}>
            <Text>Заявитель: Шалдыбаев Ержан Дауылулы</Text>
            <Text>ИИН: 960213350271</Text>
            <Text>VIN: XTA210530P1386719</Text>
            <Text>GRNZ: 123GHJ01</Text>
            <Picker style={{ height: 30, marginBottom: 10, borderRadius: 4, marginTop: 20 }}>
               <Picker.Item label="общий план ВЭТС передней части" value="1" />
               <Picker.Item label="общий план ВЭТС задней части" value="2" />
               <Picker.Item label="общий план ВЭТС левая сторона" value="3" />
               <Picker.Item label="общий план ВЭТС правая сторона" value="4" />
               <Picker.Item label="двигатель, радиатор" value="5" />
               <Picker.Item label="VIN код ВЭТС" value="6" />
               <Picker.Item label="салон" value="7" />
               <Picker.Item label="аккумулятор" value="8" />
               <Picker.Item label="фотография заявителя с места приема" value="9" />
            </Picker>
            <Button title="Сфотографировать" style={[this.state.showSearchBar && styles.hidden]} />
         </View>

         <View style={{ marginTop: 40, marginHorizontal: 10, marginBottom: 20 }}>
            <Button title="Отправить" color="#404040" />
         </View>
         
         <CameraBlock style={[!this.state.showSearchBar && styles.hidden]} />

      </View>

   )

}

const styles = StyleSheet.create({
   hidden: {
      display: 'none'
   },

   container: {
      flex: 1,
      justifyContent: "flex-start",
   },

   grid: {
      flex: 1,
      padding: 10,
      marginTop: 10,
   }
});