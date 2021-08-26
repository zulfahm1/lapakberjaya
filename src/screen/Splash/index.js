import React, {useEffect} from 'react'
import { View, Text, Image } from 'react-native'

const Splash = ({navigation}) => {
    useEffect(() => {
        setTimeout(() =>{
          navigation.replace('Home')
        }, 3000)
      }, [])
    return (
        <View style={{ flex:1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ height: '20%', width: '40%' }} source={require('../../assets/lapakberjaya_android.png')} />
        </View>
    )
}

export default Splash
