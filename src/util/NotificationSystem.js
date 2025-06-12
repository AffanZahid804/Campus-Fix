import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
// import PushNotification from 'react-native-push-notification';

async function requestUserPermission() {
    // console.log("Data before : ",data);
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }

}



export const onDisplayNotification= async(title,body)=> {


    // Request permissions (required for iOS)
    console.log("NotficationSystem Title body: ",title,body);
    // console.log("abccdefghijklm");
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId,
    
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });


    // createNotificationChannel();
    // PushNotification.localNotification({
    //   channelId: 'important_alerts1', // Replace 'your_channel_id' with the same channel ID you used in the createNotificationChannel method
    //   title: title,
    //   message: body,
    // });

  }


export const NotficationPermission = async () => {
    if (requestUserPermission()) {
        return messaging().getToken().then(token => {
            console.log("NotificationSystem : Token : ", token);
            return token; // Return the token inside the promise chain
        });
    }
    // If the permission is not granted, return null or throw an error as desired
    return null;

};


export const notificationListener = () => {

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
    });


    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            }
        });

}