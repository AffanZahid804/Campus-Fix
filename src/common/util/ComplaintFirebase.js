import firestore from '@react-native-firebase/firestore';

export async function postComplaint(
  room,
  description,
  status,
  imageUri,
  uniqueId,
  callback,
) {
  try {
    const complaintRef = firestore().collection('Complaints');

    await complaintRef.add({
      room,
      description,
      status,
      imageUri,
      uniqueId,
    });

    console.log('Complaint posted to Firebase!');
    callback();
  } catch (error) {
    console.error('Error posting complaint to Firestore:', error);
    throw error;
  }
}

export async function getComplaint() {
  try {
    const querySnapshot = await firestore().collection('Complaints').get();

    const complaints = [];

    querySnapshot.forEach(doc => {
      const {room, description, status, imageUri, uniqueId} = doc.data();
      complaints.push({
        id: doc.id,
        room,
        description,
        status,
        imageUri,
        uniqueId,
      });
    });

    console.log('Retrieved complaints from Firestore:', complaints);
    return complaints;
  } catch (error) {
    console.error('Error fetching complaints from Firestore:', error);
    throw error;
  }
}

export async function updateComplaint(id, status) {
  try {
    const complaintRef = firestore().collection('Complaints').doc(id);

    await complaintRef.update({
      status,
    });

    console.log('Complaint updated in Firebase!');
  } catch (error) {
    console.error('Error updating complaint in Firestore:', error);
    throw error;
  }
}

export async function deleteComplaint(id) {
  try {
    const complaintRef = firestore().collection('Complaints').doc(id);

    await complaintRef.delete();

    console.log('Complaint deleted from Firebase!');
  } catch (error) {
    console.error('Error deleting complaint from Firestore:', error);
    throw error;
  }
}
