import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {ColorShade, fontStyle} from '../../Asset/CSS_COLOR';
import {TimeTableContext} from '../../common/Context/TimeTableContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

const ClassItemPage = () => {
  const {state: TimeTableState, deleteTimeTableHandlerCxt} =
    useContext(TimeTableContext);
  const isFocused = useIsFocused();
  const [selectedItems, setSelectedItems] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [timeTable, setTimeTable] = useState([]);
  const [email, setEmail] = useState();
  useEffect(() => {
    const getEmailFromStorage = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('my-key');
        if (jsonValue !== null) {
          const parsedValue = JSON.parse(jsonValue);
          setEmail(parsedValue.Email);
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    getEmailFromStorage()
      .then(() => {
        // Once email is set, filter and set the timetable
        setTimeTable([]);
        if (email) {
          const filteredTimetable = TimeTableState.filter(
            item => item.id === email,
          );
          setTimeTable(filteredTimetable);
        }
      })
      .catch(error => {
        console.error('Error setting email:', error);
      });
  }, [email, TimeTableState]);

  useEffect(() => {
    // console.log('time Table : ', timeTable);
    setRefresh(true);
  }, [timeTable]);

  const deleteHandler = item => {
    const {id, uniqueId} = item;

    // Show alert before deleting
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this class?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            // Call deleteMakeupClassHandlerCxt if user confirms deletion
            deleteTimeTableHandlerCxt(uniqueId, id);
          },
        },
      ],
    );
  };

  const renderItem = ({item}) => {
    // console.log('Item : ', item);
    // if (item.id.trim() === email.trim()) {
    //   console.log('❤️');
    // }
    // if (item.id.trim() === email.trim()) {
    return (
      <Pressable
        style={styles.EventContainer}
        onLongPress={() => deleteHandler(item)}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.courseCode}</Text>
          <View style={styles.teacherContainer}>
            <Text style={styles.classText}>{item.subject}</Text>
            <Text style={styles.instructorText}>{item.instructor}</Text>
          </View>
        </View>
        <View style={styles.messageContainer}>
          <View style={styles.dayTimeContainer}>
            <Text style={styles.timeText}>{item.time}</Text>
            <Text style={styles.dateText}> ( {item.day} )</Text>
          </View>
          <View style={styles.classContainer}>
            <Text style={styles.timeText}>{item.semester}</Text>
            <Text style={styles.timeText}>{item.section}</Text>
          </View>
        </View>
      </Pressable>
    );
    // } else {
    //   return <Text></Text>; // Don't render anything if id doesn't match email
    // }
  };

  return (
    <>
      {refresh ? (
        <FlatList
          data={timeTable}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text>No Class</Text>
            </View>
          }
        />
      ) : (
        <ActivityIndicator size="large" color="blue" />
      )}
    </>
  );
};

export default ClassItemPage;

const styles = StyleSheet.create({
  message: {
    fontSize: 14,
    marginLeft: 10,
    color: '#333333',
    fontFamily: fontStyle.SanFranciscoRegular,
  },
  dayTimeContainer: {
    // borderColor: 'yellow',
    // borderWidth: 2,
    flexDirection: 'row',
  },
  classContainer: {
    // borderColor: 'yellow',
    // borderWidth: 2,
    width: '100%',
    // flex:1
  },
  emptyContainer: {
    // borderColor: 'red',
    // borderWidth: 1,
    alignItems: 'center',
    marginTop: 200,
  },
  EventContainer: {
    marginTop: 10,
    // paddingHorizontal: 80,
    // borderWidth: 2,
    // borderColor: '#512da8',

    borderRadius: 10,  //tiles padding small
    padding: 10,
    backgroundColor: ColorShade.containerBackgroundColor, //tiles background color

    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 5,
    // width: '95%',

    marginHorizontal: '3%',
  },
  listContainer: {
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    // borderColor: 'yellow',
    // borderWidth: 2,
    width: '100%',
  },
  teacherContainer: {
    // borderColor: 'red',
    // borderWidth: 2,
    width: '70%',
  },
  title: {
    color: '#000000',
    fontSize: 20,
    // marginLeft: 10,
    // fontWeight: '700',
    textAlign: 'left',
    // borderColor:"red",
    // borderWidth:1,
    width: '30%',
    fontFamily: fontStyle.SFNSDisplayBold,
  },

  classText: {
    color: '#000000',
    fontSize: 17,
    // marginLeft: 10,
    fontWeight: '700',
    // textAlign:"right",
    textAlign: 'right',
    // alignSelf:"flex-end",
    // borderColor:"blue",
    // borderWidth:1,
    // width: '10%',
    fontFamily: fontStyle.SanFranciscoRegular,
  },
  instructorText: {
    textAlign: 'right',
  },
  messageContainer: {
    // flexDirection: 'row',
    // borderColor: 'green',
    // borderWidth: 2,
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
  classContainer: {
    // borderColor: 'red',
    // borderWidth: 1,
    flexDirection: 'row',
  },
  classRoomText: {
    fontSize: 14,

    color: '#333333',
    fontFamily: fontStyle.SanFranciscoRegular,
  },
  bookMarkStyle: {
    position: 'absolute',
    right: 0,
    // borderColor: 'red',
    // borderWidth: 1,
  },
});
