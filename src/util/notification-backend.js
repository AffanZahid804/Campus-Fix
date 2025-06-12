import axios from 'axios';

const serverUrl = 'http://localhost:3000/'; // Replace with your server URL

// Function to get the access token from the server
async function fetchAccessToken() {
  try {
    const response = await axios.get(`${serverUrl}/getAccessToken`);
    return response.data.accessToken;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
}

// Function to send push notifications
export async function sendPushNotification(deviceTokens, message, title) {
  console.log('Backend Device Token: ', deviceTokens);
  console.log('Backend Message: ', message);
  console.log('Backend Title: ', title);

  try {
    const accessToken = await fetchAccessToken();
    const fcmEndpoint = `https://fcm.googleapis.com/v1/projects/campusfix-eef41/messages:send`;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    const notificationData = {
      notification: {
        title: title || 'Campus Fix',
        body: message,
      },
    };

    const requests = deviceTokens.map(token => {
      const data = {
        message: {
          token: token,
          ...notificationData,
        },
      };
      console.log('Data Backend: ', data);
      return axios.post(fcmEndpoint, data, {headers});
    });

    const responses = await Promise.all(requests);
    responses.forEach((response, index) => {
      console.log(
        `Push notification sent to device ${index + 1}:`,
        response.data,
      );
    });
  } catch (error) {
    console.error(
      'Error sending push notification:',
      error.response ? error.response.data : error.message,
    );
  }
}
