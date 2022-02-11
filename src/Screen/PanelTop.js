import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

export const PanelTop = props  => {
   return (
      <View style={styles.panel}> 
         <ImageBackground source={require('../../assets/logo.png')} resizeMode="contain" style={{height:60, width: 120}}></ImageBackground>
      </View>
   )
}

const styles = StyleSheet.create({
   panel : {
      backgroundColor:'#83999d',
      height: 70,
      paddingHorizontal: 10,
      paddingTop: 5,
      paddingBottom: 5,
      flexDirection: 'row',
      justifyContent: 'flex-start'
   },


});