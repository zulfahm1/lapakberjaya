import React, {useEffect, useRef, useState} from 'react'
import { View, Text, BackHandler, ActivityIndicator, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import OneSignal from 'react-native-onesignal'

const Home = ({navigation}) => {

  const [canGoForward, setCanGoForward] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')
  const WEBVIEW_REF = useRef()
  const [canGoBack, setCanGoBack] = useState(false)

  const handleBackButton = () => {
    WEBVIEW_REF.current.goBack()
    return true
  }

  const onNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack)
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
    }
  }, [])

  // notif
  useEffect(() => {
    NotifConfig()
  }, [])

  const NotifConfig = () => {
    //OneSignal Init Code
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId("49685a18-b999-40d6-98b6-4206533b3ec9");
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
      source={{ uri: 'https://wisatametro.com/app' }}
      // onNavigationStateChange={(param) => handleBack(param)}

      ref={WEBVIEW_REF}
      startInLoadingState={true}
      onNavigationStateChange={onNavigationStateChange}
      renderLoading={() => (
        <ActivityIndicator
          color='black'
          size='large'
          style={styles.flexContainer}
        />
      )}
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
