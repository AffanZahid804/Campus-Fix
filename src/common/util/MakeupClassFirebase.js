import firestore from '@react-native-firebase/firestore';

export async function postMakeupClassHandler(makeupClassData) {
  try {
    const docRef = firestore()
      .collection('MakeupClasses')
      .doc(makeupClassData.email);

    const doc = await docRef.get();

    if (doc.exists) {
      const existingData = doc.data();

      const newData = {
        Name: makeupClassData.name,
        Day: makeupClassData.day,
        Subject: makeupClassData.subject,
        StartTime: makeupClassData.startTime,
        EndTime: makeupClassData.endTime,
        CourseCode: makeupClassData.courseCode,
        Section: makeupClassData.section,
        Semester: makeupClassData.semester,
        Status: makeupClassData.status,
        UniqueId: makeupClassData.uniqueId,
        Token: makeupClassData.token,
      };

      const updatedData = [...existingData.makeupClasses, newData];

      await docRef.update({
        makeupClasses: updatedData,
      });
      console.log('Makeup Class Firebase Updated!');
    } else {
      const newData = [
        {
          Name: makeupClassData.name,
          Day: makeupClassData.day,
          Subject: makeupClassData.subject,
          StartTime: makeupClassData.startTime,
          EndTime: makeupClassData.endTime,
          CourseCode: makeupClassData.courseCode,
          Section: makeupClassData.section,
          Semester: makeupClassData.semester,
          Status: makeupClassData.status,
          UniqueId: makeupClassData.uniqueId,
          Token: makeupClassData.token,
        },
      ];

      await docRef.set({
        makeupClasses: newData,
      });
      console.log('Makeup Class Firebase Complete!');
    }
  } catch (error) {
    console.log('Error postMakeupClass Firebase : ', error);
    throw error;
  }
}
export async function fetchMakeupClassesHandler() {
  try {
    const response = await firestore().collection('MakeupClasses').get();

    const makeupClassesData = [];

    response.forEach(doc => {
      const makeupClassData3 = doc.data().makeupClasses; // Accessing the makeupClasses array
      // console.log('makeupClassData3 : ', makeupClassData3);

      makeupClassData3.forEach(makeupClass => {
        makeupClassesData.push({
          id: doc.id,
          Name: makeupClass.Name,
          Day: makeupClass.Day,
          Subject: makeupClass.Subject,
          StartTime: makeupClass.StartTime,
          EndTime: makeupClass.EndTime,
          CourseCode: makeupClass.CourseCode,
          Section: makeupClass.Section,
          Semester: makeupClass.Semester,
          Status: makeupClass.Status,
          UniqueId: makeupClass.UniqueId,
          Token: makeupClass.Token,
        });
      });
    });

    // console.log('makeupClassesData : ', makeupClassesData);
    return makeupClassesData;
  } catch (error) {
    console.error('Error fetching makeup classes from Firestore:', error);
    throw error;
  }
}

export async function updateMakeupClassHandler(uniqueId, status, id) {
  try {
    const docRef = firestore().collection('MakeupClasses').doc(id);

    const doc = await docRef.get();

    if (doc.exists) {
      const existingData = doc.data();

      // Update the makeupClasses array by mapping over it
      const updatedClasses = existingData.makeupClasses.map(makeupClass => {
        if (makeupClass.UniqueId === uniqueId) {
          return {
            ...makeupClass,
            Status: status,
          };
        }
        return makeupClass;
      });

      // Update the Firestore document with the modified makeupClasses array
      await docRef.update({
        makeupClasses: updatedClasses,
      });

      console.log('Makeup Class Firebase Updated!');
    } else {
      console.log('Document does not exist');
    }
  } catch (error) {
    console.log('Error updating makeup class in Firebase: ', error);
    throw error;
  }
}

export async function deleteMakeupClassHandler(uniqueId, id) {
  try {
    const docRef = firestore().collection('MakeupClasses').doc(id);

    const doc = await docRef.get();

    if (doc.exists) {
      const existingData = doc.data();

      // Filter out the makeup class with the specified UniqueId
      const updatedClasses = existingData.makeupClasses.filter(
        makeupClass => makeupClass.UniqueId !== uniqueId,
      );

      // Update the Firestore document with the modified makeupClasses array
      await docRef.update({
        makeupClasses: updatedClasses,
      });

      console.log('Makeup Class Firebase Deleted!');
    } else {
      console.log('Document does not exist');
    }
  } catch (error) {
    console.log('Error deleting makeup class in Firebase: ', error);
    throw error;
  }
}
