import React from 'react'
import { View, Text } from 'react-native'
import WebView from 'react-native-webview'

const Notif = ({route, navigation}) => {
    return (
        <WebView
            source = {{ uri: route.params  }}
        />
    )
}

export default Notif
