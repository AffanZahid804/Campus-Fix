import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Pressable,
  Button,
  Alert,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ColorShade, fontStyle} from '../../Asset/CSS_COLOR';
import ExamButton from '../Button/ExamButton';
import RNFetchBlob from 'rn-fetch-blob';

const ExamPage = () => {
  const [examData, setExamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const SHEET_ID = '1REh3nxneDP0hIbNQbhvzVXPPiLWKR9l6Iif8ACfDzXg';
  const API_KEY = 'AIzaSyD1cz3yquF4z-6vJ9AF5BV_L9hfNE5BtT8';

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      // console.log('DATA : ', data.values);
      const transformedData = data.values.map(row => ({
        courseCode: row[0],
        time: row[1],
        subject: row[2],
        instructor: row[3],
        day: row[4],
      }));
      setExamData(transformedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const downloadSpreadsheet = async () => {
    try {
      // Show alert when download starts
      Alert.alert(
        'Download Started',
        'Downloading exam schedule...',
        [
          {
            text: 'OK',
            onPress: async () => {
              const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=xlsx`;
              const response = await RNFetchBlob.config({
                fileCache: true,
                addAndroidDownloads: {
                  useDownloadManager: true,
                  notification: true,
                  title: 'Exam Schedule',
                  description: 'Downloading exam schedule...',
                  mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                  path: RNFetchBlob.fs.dirs.DownloadDir + '/exam_schedule.xlsx',
                },
              }).fetch('GET', url);
              console.log('File downloaded to:', response.path());
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

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
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.title}>Exam Schedule</Text>
        <Pressable title="Download Spreadsheet" onPress={downloadSpreadsheet}>
          <Image
            style={styles.iconStyle}
            source={require('../../Asset/Icon/download.png')}
          />
        </Pressable>

        {/* <ExamButton examData={examData} /> */}
      </View>
      {loading ? (
        <ActivityIndicator style={styles.activityIndicator} />
      ) : (
        <FlatList
          data={examData}
          renderItem={renderExamItem}
          keyExtractor={(item, index) => `${index}`}
          contentContainerStyle={styles.flatListContainer}
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
  // title: {
  //   fontSize: 20,
  //   fontWeight: 'bold'
  //   marginBottom: 20,
  //   // borderColor: 'blue',
  //   // borderWidth: 1,
  // },
  containerHeader: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: '5%',
    justifyContent: 'center',
  },
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
    marginHorizontal: '2%',

    marginTop: 10,
    // borderWidth: 1,
    // borderColor: ColorShade.containerBorder,
    borderRadius: 6,
    padding: 10,
    backgroundColor: ColorShade.containerBackgroundColor,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 5,
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
    width: '80%',
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
  iconStyle: {
    height: 35,
    width: 35,
    marginLeft: 10,
  },
});

export default ExamPage;
