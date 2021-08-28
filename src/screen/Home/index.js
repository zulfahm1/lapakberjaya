import React, {useEffect, useRef, useState} from 'react'
import { View, Text, BackHandler, ActivityIndicator, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import OneSignal from 'react-native-onesignal'

const Home = ({navigation}) => {

  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')
  const webviewRef = useRef()

  console.log('web view ref',webviewRef.current)
  
  useEffect(() => {
    // console.log(canGoBack)
  }, [canGoBack])
  
  const backButtonHandler = () => {
    if (webviewRef.current) webviewRef.current.goBack()
  }
  
  
  const frontButtonHandler = () => {
    if (webviewRef.current) webviewRef.current.goForward()
  }

  //console.log(webViewRef)

  useEffect(() => {
    NotifConfig()
  }, [])

  const NotifConfig = () => {
    //OneSignal Init Code
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId("9fa33446-1590-48b9-9b67-13dfebda401c");
    //END OneSignal Init Code

     //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
      console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
      let notification = notificationReceivedEvent.getNotification();
      console.log("notification: ", notification);
      const data = notification.additionalData
      console.log("additionalData: ", data);
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    });

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log("OneSignal: notification opened:", notification);
      const link = notification.notification.additionalData.link
      try {
        redirect(link)
      }catch(e){
        console.log(e)
      }
    });
  }

  const redirect = (param) => {
    navigation.navigate('Notif', param)
  }

  const handleBack = (url) => {
    
  }  

  return (
    <WebView
      source={{ uri: 'https://app.lapakberjaya.com/' }}
      // onNavigationStateChange={(param) => handleBack(param)}

      ref={webviewRef}
      startInLoadingState={true}
      renderLoading={() => (
        <ActivityIndicator
          color='black'
          size='large'
          style={styles.flexContainer}
        />
      )}
      onNavigationStateChange={navState => {
        setCanGoBack(navState.canGoBack)
        setCanGoForward(navState.canGoForward)
        setCurrentUrl(navState.url)
      }}
    />
  )
}

export default Home

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1
  },
  tabBarContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#b43757'
  },
  button: {
    color: 'white',
    fontSize: 24
  }
})
