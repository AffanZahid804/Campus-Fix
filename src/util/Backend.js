import axios from 'axios';

const serverUrl = 'http://10.0.2.2:3000'; // Replace with your server URL
// const serverUrl = 'http://localhost:3000'; // Replace with your server URL

export async function sendPushNotification(deviceTokens, message, title) {
  try {
    console.log('😊😊😊', deviceTokens);
    console.log('😊😊😊', message);
    console.log('😊😊😊', title);
    const response = await axios.post(`${serverUrl}/sendNotification`, {
      deviceTokens: deviceTokens,
      title: title,
      message: message,
    });

    console.log('Notification response:', response.data);
    // Handle success response
  } catch (error) {
    console.error('Error sending notification:', error.message);
    // Handle error
  }
}
