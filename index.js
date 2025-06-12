import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
// import { NotficationPermission } from './src/util/NotificationSystem';
import { NotficationPermission, notificationListener, onDisplayNotification } from './src/util/NotificationSystem';
// import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

messaging().setOpenSettingsForNotificationsHandler(async () => {
    // Set persistent value, using the MMKV package just as an example of how you might do it
    MMKV.setBool(openSettingsForNotifications, true)
})
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    console.log("remoteMessage : ",remoteMessage);
    let message_body = remoteMessage.notification.body;

    // Get the message title
    let message_title = remoteMessage.notification.title;

    console.log("message_title,message_body, : ",message_title,message_body);
    
    onDisplayNotification(message_title,message_body)
});


    NotficationPermission();
    notificationListener();
     messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));a
      console.log("remoteMessage : ",remoteMessage);
      let message_body = remoteMessage.notification.body;

      // Get the message title
      let message_title = remoteMessage.notification.title;

      console.log("message_title,message_body, : ",message_title,message_body);

      onDisplayNotification(message_title,message_body)
    });





AppRegistry.registerComponent(appName, () => App);



// const WrappedApp = gestureHandlerRootHOC(App);

// AppRegistry.registerComponent(appName, () => WrappedApp);