import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {TimeTableContext} from '../../common/Context/TimeTableContext';
import {MakeupClassContext} from '../../common/Context/MakeupClassContext';
import {ColorShade, fontStyle} from '../../Asset/CSS_COLOR';

const MakeupItemPage = () => {
  const {state: TimeTableState} = useContext(TimeTableContext);
  const {state: MakeupTimeTableState} = useContext(MakeupClassContext);
  const isFocused = useIsFocused();
  const [selectedItems, setSelectedItems] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [email, setEmail] = useState('');
  const [makeupTimeTable, setMakeupTimeTable] = useState([]);

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
        // Once email is set, filter and set the makeupTimeTable
        const filteredMakeupTimeTable = [];

        TimeTableState.forEach(item => {
          if (item.id === email) {
            const filteredItems = MakeupTimeTableState.filter(
              makeupItem =>
                makeupItem.Section.toLowerCase().trim() ===
                  item.section.toLowerCase().trim() &&
                makeupItem.Semester === item.semester &&
                makeupItem.Subject.toLowerCase() ===
                  item.subject.toLowerCase() &&
                makeupItem.Status == 'Resolved',
            );
            filteredMakeupTimeTable.push(...filteredItems);
          }
        });

        setMakeupTimeTable(filteredMakeupTimeTable);
      })
      .catch(error => {
        console.error('Error setting email:', error);
      });
  }, [email, TimeTableState]);

  useEffect(() => {
    console.log('makeupTimeTable Table : ', makeupTimeTable);
    setRefresh(true);
  }, [makeupTimeTable]);

  const deleteHnadler = item => {
    const updatedSelection = [...selectedItems];
    const index = updatedSelection.findIndex(
      selectedItem => selectedItem === item,
    );
    if (index !== -1) {
      updatedSelection.splice(index, 1);
    } else {
      updatedSelection.push(item);
    }
    setSelectedItems(updatedSelection);
  };

  const renderItem = ({item, index}) => {
    // console.log('Regular Class : ', item);
    // if (item.id == email) {
    //   const uniqueMakeupClasses = MakeupTimeTableState.filter(
    //     makeupItem =>
    //       makeupItem.Section.toLowerCase().trim() ===
    //         item.section.toLowerCase().trim() &&
    //       makeupItem.Semester === item.semester &&
    //       makeupItem.Subject.toLowerCase() === item.subject.toLowerCase(),
    //   );

    //   // console.log('🔎🔎🔎 Unique Makeup Classes:', uniqueMakeupClasses);

    //   if (uniqueMakeupClasses)
    // return uniqueMakeupClasses.map(makeupClass => (
    return (
      <Pressable
        key={item.id} // Use a unique key for each item in a list
        style={styles.EventContainer}
        onLongPress={() => deleteHnadler(item)}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.CourseCode}</Text>
          <View style={styles.teacherContainer}>
            <Text style={styles.classText}>{item.Subject}</Text>
            <Text style={styles.instructorText}>{item.Name}</Text>
          </View>
        </View>
        <View style={styles.messageContainer}>
          <View style={styles.dayTimeContainer}>
            <Text style={styles.timeText}>
              {item.StartTime} - {item.EndTime}
            </Text>
            <Text style={styles.dateText}> ({item.Day})</Text>
          </View>
          <View style={styles.classContainer}>
            <Text style={styles.timeText}>{item.Semester}</Text>
            <Text style={styles.timeText}>{item.Section}</Text>
          </View>
        </View>
      </Pressable>
    );
    //     ));
    // } else {
    //   return <Text></Text>;
    //   // return null;
    // }
  };

  return (
    <>
      {refresh ? (
        <FlatList
          data={makeupTimeTable}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text>No Makeup Class</Text>
            </View>
          }
        />
      ) : (
        <ActivityIndicator size="large" color="blue" />
      )}
    </>
  );
};

export default MakeupItemPage;

const styles = StyleSheet.create({
  message: {
    fontSize: 14,
    marginLeft: 10,
    color: '#333333',
    fontFamily: fontStyle.SanFranciscoRegular,
  },
  dayTimeContainer: {
    flexDirection: 'row',
  },
  classContainer: {
    width: '100%',
  },
  emptyContainer: {
    // borderColor: 'red',
    // borderWidth: 1,
    alignItems: 'center',
    marginTop: 200,
  },
  EventContainer: {
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: ColorShade.containerBackgroundColor,

    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 5,
    marginHorizontal: '3%',
  },
  listContainer: {},
  titleContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  teacherContainer: {
    width: '70%',
  },
  title: {
    color: '#000000',
    fontSize: 20,
    width: '30%',
    fontFamily: fontStyle.SFNSDisplayBold,
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
  classContainer: {
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
  },
});
