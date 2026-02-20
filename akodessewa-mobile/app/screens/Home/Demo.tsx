import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { Camera, CodeScanner, useCameraDevice } from 'react-native-vision-camera';
import { COLORS } from '../../constants/theme';

const Demo = () => {

  const device = useCameraDevice('back')

  useEffect(() => {
    checkpermission();
  },[]);

  const checkpermission = async () => {
      const newCameraPermission = await Camera.requestCameraPermission();
      const newMicrophonePermission = await Camera.requestMicrophonePermission();

      console.log(newCameraPermission)
  };

  if (device == null) return <ActivityIndicator />

   const codeScanner: CodeScanner = {
    codeTypes: ['qr', 'ean-8'],
    onCodeScanned: (codes) => {
      console.log(`Scanned ${codes.length} codes!`)
    }
  } 

  return (
    <View style={{alignItems:'center',justifyContent:'center',flex:1,backgroundColor:COLORS.title}}>
        <Camera
          style={[{padding:150}]}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
        />
    </View>
   
  )
}

export default Demo

