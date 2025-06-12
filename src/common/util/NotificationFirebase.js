import firestore from '@react-native-firebase/firestore';

export async function postNotificationHandler(notificationData) {
  try {
    const docRef = firestore()
      .collection('Notifications')
      .doc(notificationData.uniqueId);

    await docRef.set(notificationData);

    console.log('Notification Firebase Complete!');
  } catch (error) {
    console.log('Error postNotificationHandler:', error);
    throw error;
  }
}

export async function fetchNotificationsHandler() {
  try {
    const response = await firestore().collection('Notifications').get();
    const notifications = [];

    response.forEach(doc => {
      const notification = doc.data();
      notifications.push({
        id: doc.id,
        room: notification.room,
        description: notification.description,
        image: notification.image,
        uniqueId: notification.uniqueId,
      });
    });

    return notifications;
  } catch (error) {
    console.log('Error fetchNotificationsHandler:', error);
    throw error;
  }
}

export async function deleteNotificationHandler(uniqueId) {
  try {
    const docRef = firestore().collection('Notifications').doc(uniqueId);

    await docRef.delete();

    console.log('Notification Firebase Entry Deleted!');
  } catch (error) {
    console.log('Error deleting notification entry in Firebase: ', error);
    throw error;
  }
}
