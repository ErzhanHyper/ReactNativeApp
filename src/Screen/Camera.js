import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, Button, ActivityIndicator, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { apiUrl } from '../../App.js';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

export const CameraView = ({route, navigation}) => {

  let camera = Camera;

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [photoStorage, setPhotoStorage] = useState(null);

  const [savePicture, setPicture] = useState(false);
  const {height, width} = Dimensions.get('window');
  
  const __takePicture = async () => {
    const option = {quality: 0.6, base64: true, skipProcessing: false}
    if (!camera) return
    const photo = await camera.takePictureAsync(option)

    // const manipResult = await manipulateAsync(
    //   photo.uri,
    // );

    setPreviewVisible(true)
    setCapturedImage(photo)
    setPhotoStorage(photo)

  }

  const CameraPreview = ({ photo }) => {

    return (
      <View style={{
          backgroundColor: 'transparent',
          flex: 1,
          width: '100%',
        }}
      >
        <ImageBackground source={{ uri: photo && photo.uri }} style={{flex: 1}}>
          <Button title="Сохранить" onPress={ __savePicture } style={{color: '#fff'}}/>
        </ImageBackground>
      </View>
    )
  }

  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }

  const __startCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }


  const __savePicture = () => {
    setPicture(true);

    let type_id = route.params.photoTypeId
    let order_id = route.params.orderId
    let image = photoStorage.base64;
    // const config = {
    //   headers: { 
    //     'Content-Type': 'multipart/form-data',
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*'
    //   }
    // }

  axios.post(`${apiUrl}/api/order/file/store`, {
    "order_id": order_id,
    "src": image,
    "type": type_id,
  }).then((response) => {
    if(response.data.success == true){
      navigation.navigate('OrderShowScreen', {orderId: order_id, uploaded: true})
    }else{
      setPicture(false);
      alert('Ошибка, не удалось сохранить!');
      navigation.navigate('OrderShowScreen', {orderId: order_id, uploaded: false})
    }
  }).catch((error) => {
    navigation.navigate('OrderShowScreen', {orderId: order_id, uploaded: false})
  })


}

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Нет доступа к камере</Text>;
  }

  return (
    
    <View style={{flex: 1}}>
    {savePicture ? (
    <View style={{textAlign: "center", marginTop:40}}>
      <ActivityIndicator size="large" color="#4040C1"/>
      <Text style={{textAlign: "center"}}>Пожалуйста ждите, идет загрузка файла!</Text>
    </View>
    ):(

      <View style={styles.container}>

        <Camera style={styles.camera} type={type} mirrorMode={false} ref={(r) => { camera = r }} ratio={'1:1'} zoom={0} >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={__startCamera}>
              <Image source={require('../../assets/switch-camera.png')} style={styles.img} />
              <Text style={styles.imgWrapper}>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={__takePicture} >
              <Image source={require('../../assets/camera.png')} style={styles.img} />
              <Text style={styles.imgWrapper}>
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>

      {previewVisible && capturedImage ? (
        <CameraPreview photo={capturedImage} savePhoto={__savePicture} retakePicture={__retakePicture} />
      ) : 
        (
          <View style={styles.backgr}>
            <Image style={styles.image} source={require('../../assets/add-photo.png')} />
            <Text>Результат снимка</Text>
          </View>
        )
    }
  

      </View>
      )
    }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems:'center',
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'flex-end',
    width: '100%',

  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    margin: 20
  },

  img: {
    width: 30,
    height: 30,
  },

  button: {
    backgroundColor: '#fff',
    alignItems: 'center',
    height: 40,
    padding: 5,
    flexDirection: 'row',
    borderRadius: 10,
    opacity: 0.8
  },

  backgr: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%', 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});