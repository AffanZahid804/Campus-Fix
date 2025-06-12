import firestore from '@react-native-firebase/firestore';
export async function postTimeTableHandler(timeTableData) {
  try {
    const docRef = firestore()
      .collection('TimeTables')
      .doc(timeTableData.sapID);

    const doc = await docRef.get();
    if (doc.exists) {
      const existingData = doc.data();

      const newData = {
        semester: timeTableData.semester,
        section: timeTableData.section,
        courseCode: timeTableData.courseCode,
        time: timeTableData.time,
        subject: timeTableData.subject,
        instructor: timeTableData.instructor,
        day: timeTableData.day,
        uniqueId: timeTableData.uniqueId,
      };

      // Ensure that existingData.timeTables is initialized as an array
      const timeTablesArray = Array.isArray(existingData.timeTables)
        ? existingData.timeTables
        : [];

      const newDataExists = timeTablesArray.some(
        item =>
          item.courseCode === newData.courseCode &&
          item.day === newData.day &&
          item.instructor === newData.instructor &&
          item.semester === newData.semester &&
          item.section === newData.section &&
          item.subject === newData.subject &&
          item.time === newData.time,
        // item.uniqueId === newData.uniqueId,
      );

      if (!newDataExists) {
        const updatedData = [...timeTablesArray, newData];

        await docRef.update({
          timeTables: updatedData,
        });
        console.log('Time Table Firebase Updated!');
      } else {
        console.log('New data already exists in timeTables. No update needed.');
      }
    } else {
      const newData = [
        {
          semester: timeTableData.semester,
          section: timeTableData.section,
          courseCode: timeTableData.courseCode,
          time: timeTableData.time,
          subject: timeTableData.subject,
          instructor: timeTableData.instructor,
          day: timeTableData.day,
          uniqueId: timeTableData.uniqueId,
        },
      ];

      await docRef.set({
        timeTables: newData,
      });
      console.log('Time Table Firebase Complete!');
    }
  } catch (error) {
    console.log('Error postTimeTableHandler:', error);
    throw error; // Optionally rethrow the error to handle it further up the call stack
  }
}

export async function fetchTimeTableHandler() {
  try {
    const response = await firestore().collection('TimeTables').get();
    const timeTableData = [];

    response.forEach(doc => {
      const timeTables = doc.data().timeTables;
      if (timeTables) {
        timeTables.forEach(table => {
          const timeTableObj = {
            id: doc.id,
            semester: table.semester,
            section: table.section,
            courseCode: table.courseCode,
            time: table.time,
            subject: table.subject,
            instructor: table.instructor,
            day: table.day,
            uniqueId: table.uniqueId,
          };
          timeTableData.push(timeTableObj);
        });
      }
    });
    // console.log('timeTableData Firebase : ', timeTableData);
    return timeTableData;
  } catch (error) {
    console.log('Error fetchTimeTableHandler:', error);
    throw error;
  }
}

export async function deleteTimeTableHandler(uniqueId, sapID) {
  try {
    const docRef = firestore().collection('TimeTables').doc(sapID);

    const doc = await docRef.get();

    if (doc.exists) {
      const existingData = doc.data();

      // Filter out the time table entry with the specified UniqueId
      const updatedTimeTables = existingData.timeTables.filter(
        table => table.uniqueId !== uniqueId,
      );

      // Update the Firestore document with the modified timeTables array
      await docRef.update({
        timeTables: updatedTimeTables,
      });

      console.log('Time Table Firebase Entry Deleted!');
    } else {
      console.log('Document does not exist');
    }
  } catch (error) {
    console.log('Error deleting time table entry in Firebase: ', error);
    throw error;
  }
}
