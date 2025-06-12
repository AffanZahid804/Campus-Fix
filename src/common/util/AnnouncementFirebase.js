import firestore from '@react-native-firebase/firestore';

export async function postAnnouncementHandler(announcementData, callBack) {
  try {
    // Assuming announcementData includes title, description, and imageUrl
    const {title, description, imageUrl} = announcementData;

    // Add the announcement to the 'Announcements' collection
    await firestore()
      .collection('Announcements')
      .add({
        title,
        description,
        imageUrl,
      })
      .then(() => {
        console.log('Announcement added!');
        callBack();
        // callBack(); // Invoke the callback function if it is provided
      });

    return true;
  } catch (error) {
    console.error('postAnnouncementHandler Error:', error);
    errorMessage();
    return false;
  }
}

export async function fetchAnnouncementHandler() {
  try {
    const response = await firestore().collection('Announcements').get();
    // console.log('Announcement data:', response.docs);

    const announcements = [];

    response.docs.forEach(doc => {
      const announcementObj = {
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        imageUrl: doc.data().imageUrl,
      };
      announcements.push(announcementObj);
    });

    return announcements;
  } catch (error) {
    console.error('fetchAnnouncementHandler Error:', error);
  }
}
