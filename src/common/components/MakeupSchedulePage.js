import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {MakeupClassContext} from '../Context/MakeupClassContext';
import {ColorShade, fontStyle} from '../../Asset/CSS_COLOR';
const SHEET_ID = '1N8xkXPdRlEdq6bkLHOzefGvxGKcsJVAyIdrDFf9vKe8';
const API_KEY = 'AIzaSyD1cz3yquF4z-6vJ9AF5BV_L9hfNE5BtT8';
const MakeupSchedulePage = () => {
  const {state: MakeupTimeTableState} = useContext(MakeupClassContext);
  const [refresh, setRefresh] = useState(true);
  const [date, setDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);

  const [open, setOpen] = useState(false);
  // Handler for confirming the selected date
  useEffect(() => {
    const fetchData = async () => {
      console.log('MakeupTimeTableState : ', MakeupTimeTableState);

      const options = {month: '2-digit', day: '2-digit', year: 'numeric'};
      const formatDateString = dateString => {
        const [month, day, year] = dateString.split('/');
        return `${month}-${day}-${year}`;
      };
      const selectedDate = date;

      const selectedDateString = formatDateString(
        selectedDate.toLocaleDateString(undefined, options),
      );
      const filtered = MakeupTimeTableState.filter(item => {
        const itemDate = item.Day;

        console.log(
          ` Item Date: ${itemDate}, Selected Date: ${selectedDateString}`,
        );
        if (itemDate == selectedDateString) return item;
      });
      // Function to format date string as "MM-DD-YYYY"

      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`,
        );

        const data = await response.json();
        const options = {weekday: 'long'}; // Format to get the full weekday name

        const selectedDay = date.toLocaleDateString(undefined, options); // Get the selected day

        const transformedData = data.values
          .filter(row => row[4] === 'Free' && row[6] === selectedDay) // Filter out rows where courseCode is "Free" and match selected day
          .map(row => {
            // Split the time into start and end times
            const [startTime, endTime] = row[3].split('-');

            return {
              CourseCode: row[2], // Align with the key in filtered (assuming it's 'CourseCode')
              Day: row[6], // Align with the key in filtered (assuming it's 'Day')
              Semester: row[0],
              Section: row[1],
              StartTime: startTime.trim(), // Assign start time
              EndTime: endTime.trim(), // Assign end time
              Subject: row[4],
              Instructor: row[5],
            };
          });

        console.log('transformedDatatransformedData : ', transformedData);
        const MakeUpDataCollect = [...filtered, ...transformedData];
        setFilteredData(MakeUpDataCollect);
        console.log('filtered 😊😊😊😊😊😊😊😊😊😊 : ', filtered);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      console.log('filtered 😊😊😊😊😊😊😊😊😊😊 : ', filtered);
    };

    fetchData();
  }, [date, MakeupTimeTableState]);

  const onConfirmTimeHandler = dateVal => {
    setOpen(false);
    // Extracting only the date part
    const selectedDate = new Date(
      dateVal.getFullYear(),
      dateVal.getMonth(),
      dateVal.getDate(),
    );
    setDate(selectedDate);
  };

  function dateTimeHandler() {
    setOpen(true);
  }

  const renderItem = ({item}) => {
    return (
      <Pressable
        key={item.id}
        style={styles.EventContainer}
        onPress={() => console.log('Pressed:', item)}>
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
            {}
            <Text style={styles.dateText}> ({item.Day})</Text>
          </View>
          <View style={styles.classContainer}>
            <Text style={styles.timeText}>{item.Semester}</Text>
            <Text style={styles.timeText}>{item.Section}</Text>
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <>
      <View style={styles.dateTimecontainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateTextDisplay}>
            {date.toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </Text>
        </View>
        {/* <Button title="Open" onPress={() => dateTimeHandler()} /> */}
        <TouchableOpacity onPress={dateTimeHandler}>
          <Image
            style={styles.iconStyle}
            source={require('../../Asset/Icon/m_date.png')}
          />
        </TouchableOpacity>

        {open && (
          <DatePicker
            mode="date"
            modal
            open={open}
            date={date}
            onConfirm={dateVal => {
              onConfirmTimeHandler(dateVal);
            }}
            onCancel={() => setOpen(false)}
          />
        )}
      </View>
      {refresh ? (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={<View></View>}
        />
      ) : (
        <ActivityIndicator size="large" color="blue" />
      )}
    </>
  );
};

export default MakeupSchedulePage;

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
  dateTimecontainer: {
    // justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#33333',
    flexDirection: 'row',
  },
  dateTimebutton: {
    backgroundColor: 'blue',
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  dateContainer: {
    // flexDirection:"row",
    // borderWidth: 2,
    width: '70%',
    alignSelf: 'flex-start',
    // borderRadius: 5,
    // height: 45,
    // marginLeft: '5%',
    // borderColor: colorShade.textInputBydefaultBorderColor,
    // justifyContent: 'center',
    // marginRight: 30,
    marginVertical: 20,
  },
  dateTextDisplay: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontFamily: fontStyle.SanFranciscoRegular,
    fontSize: 33,
    color: ColorShade.titleColor,
    fontWeight: '600',
    // paddingLeft: 5,
  },
  iconStyle: {
    height: 35,
    width: 35,
    marginLeft: 10,
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
