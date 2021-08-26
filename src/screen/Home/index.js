import React from 'react'
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview'

const Home = () => {
   const handleWebViewNavigationStateChange = newNavState => {
        const { url } = newNavState;
        if (!url) return;

        if (url.includes('.pdf')) {
          this.webview.stopLoading();
        }

        if (url.includes('?message=success')) {
          this.webview.stopLoading();
        }
    }

    return (
        <WebView
            source={{ uri: 'https://app.lapakberjaya.com/' }}
            onNavigationStateChange={(navState) => {
                handleWebViewNavigationStateChange(navState)
              }}
        />
    )
}

export default Home
