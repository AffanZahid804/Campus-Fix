import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Pressable,
  Button,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {ColorShade, fontStyle} from '../../Asset/CSS_COLOR';
import {TimeTableContext} from '../../common/Context/TimeTableContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExamItemPage = () => {
  const [examData, setExamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const SHEET_ID = '1REh3nxneDP0hIbNQbhvzVXPPiLWKR9l6Iif8ACfDzXg';
  const API_KEY = 'AIzaSyD1cz3yquF4z-6vJ9AF5BV_L9hfNE5BtT8';
  const {state: TimeTableState} = useContext(TimeTableContext);
  const [email, setEmail] = useState('');
  const fetchData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-key');
      if (jsonValue !== null) {
        const {Email} = JSON.parse(jsonValue);
        setEmail(Email);

        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`,
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        const transformedData = data.values.slice(1).map(row => ({
          courseCode: row[0],
          time: row[1],
          subject: row[2],
          instructor: row[3],
          day: row[4],
        }));

        console.log('transformedData : ', transformedData);
        // Filter transformedData based on matching TimeTableState
        const filteredExamData = TimeTableState.flatMap(timeTableItem => {
          if (timeTableItem.id === Email) {
            const matchingTransformedItems = transformedData.filter(
              transformedItem => {
                console.log(
                  'Comparing subjects:',
                  transformedItem.subject,
                  timeTableItem.subject,
                );
                return transformedItem.subject === timeTableItem.subject;
              },
            );

            // Modify courseCode based on section
            const updatedItems = matchingTransformedItems.map(
              transformedItem => {
                let selectedCourse = '';
                switch (timeTableItem.section) {
                  case 'A':
                    selectedCourse = transformedItem.courseCode.split(' ')[0];
                    break;
                  case 'B':
                    selectedCourse = transformedItem.courseCode.split(' ')[1];
                    break;
                  case 'C':
                    selectedCourse = transformedItem.courseCode.split(' ')[2];
                    break;
                  default:
                    selectedCourse = '';
                    break;
                }

                return {
                  ...transformedItem,
                  courseCode: selectedCourse,
                };
              },
            );

            return updatedItems;
          }

          return []; // Return empty array if no matching items
        });

        setExamData(filteredExamData);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Call fetchData when component mounts
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  // useEffect(() => {
  //   fetchData(); // Call fetchData when component mounts
  // }, []);

  // useEffect(() => {
  //   console.log('examData:', examData);
  // }, [examData]);

  const renderExamItem = ({item}) => {
    // console.log('Item : ', item);

    return (
      <Pressable
        key={item.id} // Use a unique key for each item in a list
        style={styles.EventContainer}
        // onLongPress={() => deleteHnadler(item)}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.courseCode}>{item.courseCode}</Text>
          <View style={styles.teacherContainer}>
            <Text style={styles.classText}>{item.subject}</Text>
            <Text style={styles.instructorText}>{item.instructor}</Text>
          </View>
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.timeText}>{item.time}</Text>
          <Text style={styles.timeText}>{item.day}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.activityIndicator} />
      ) : (
        <FlatList
          data={examData}
          renderItem={renderExamItem}
          keyExtractor={(item, index) => `${index}`}
          contentContainerStyle={styles.flatListContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text>No Exam DateSheet</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: 'red',
    // borderWidth: 1,
    height: '100%',
    backgroundColor: '#ffff',
  },
  emptyContainer: {
    // borderColor: 'red',
    // borderWidth: 1,
    alignItems: 'center',
    marginTop: 200,
  },
  // title: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   marginBottom: 20,
  //   // borderColor: 'blue',
  //   // borderWidth: 1,
  // },
  courseCode: {
    color: '#000000',
    fontSize: 18,
    width: '45%',
    fontFamily: fontStyle.SFNSDisplayBold,
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  EventContainer: {
    marginTop: 10,
    // paddingHorizontal: 80,
    // borderWidth: 2,
    // borderColor: '#512da8',

    borderRadius: 10,
    padding: 10,
    backgroundColor: ColorShade.containerBackgroundColor,

    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 5,
    // width: '95%',

    marginHorizontal: '3%',
  },
  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  teacherContainer: {
    width: '55%',
    // borderColor: 'yellow',
    // borderWidth: 1,
    fontSize: 18,
  },
  classText: {
    color: '#000000',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'right',
    fontFamily: fontStyle.SanFranciscoRegular,
  },
  instructorText: {
    textAlign: 'right',
  },
  title: {
    color: '#000000',
    fontSize: 25,
    fontFamily: fontStyle.SFNSDisplayBold,
    width: '100%',
    textAlign: 'center',
    marginTop: 10,
  },
  examText: {
    color: '#000000',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'right',
    fontFamily: fontStyle.SanFranciscoRegular,
  },
  messageContainer: {
    width: '100%',
    marginVertical: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#333333',
    fontFamily: fontStyle.SanFranciscoRegular,
  },
  timeText: {
    fontSize: 14,
    marginHorizontal: 3,
    color: 'blue',
    fontFamily: fontStyle.SanFranciscoRegular,
  },
  activityIndicator: {
    marginTop: 20,
  },
});

export default ExamItemPage;
