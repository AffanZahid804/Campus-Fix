import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {ColorShade, fontStyle} from '../../Asset/CSS_COLOR';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {TimeTableContext} from '../Context/TimeTableContext';

const SHEET_ID = '1N8xkXPdRlEdq6bkLHOzefGvxGKcsJVAyIdrDFf9vKe8';
const API_KEY = 'AIzaSyD1cz3yquF4z-6vJ9AF5BV_L9hfNE5BtT8';

const TimeTablePage = () => {
  const [sheetData, setSheetData] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedSection, setSelectedSection] = useState('all');
  const [showInfoContainer, setShowInfoContainer] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const {postTimeTableHandlerCxt} = useContext(TimeTableContext);

  const handleBookmarkPress = item => {
    console.log('Item : ', item);
    const updatedSelection = [...selectedItems];
    const index = updatedSelection.findIndex(
      selectedItem => selectedItem === item,
    );

    if (index !== -1) {
      // Item is already selected, remove it
      updatedSelection.splice(index, 1);
    } else {
      // Item is not selected, add it
      updatedSelection.push(item);
    }

    setSelectedItems(updatedSelection);
    // sapID,
    // semester,
    // section,
    // courseCode,
    // time,
    // subject,
    // instructor,
    // day,
    //   courseCode": "CS-002", "day": "Monday", "instructor": "Sir Ibrahim", "section": "A", "semester": "1", "subject": "Compiler", "time": "11:00 - 12:30"
    const getData = async () => {
      console.log('Hey');
      try {
        const jsonValue = await AsyncStorage.getItem('my-key');
        console.log('jsonValue  : ', jsonValue);

        console.log('jsonValue  : ', jsonValue);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        // error reading value
      }
    };

    getData().then(val => {
      console.log('😊VAL : ', val);

      postTimeTableHandlerCxt(
        val.Email,
        item.semester,
        item.section,
        item.courseCode,
        item.time,
        item.subject,
        item.instructor,
        item.day,
      );
    });
  };
  // `https://sheets.googleapis.com/v4/spreadsheets/1N8xkXPdRlEdq6bkLHOzefGvxGKcsJVAyIdrDFf9vKe8/values/Sheet1?key=AIzaSyD1cz3yquF4z-6vJ9AF5BV_L9hfNE5BtT8`,
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`,
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        const transformedData = data.values
          .filter(row => row[4] !== 'Free') // Filter out rows where courseCode is "Free"
          .map(row => ({
            semester: row[0],
            section: row[1],
            courseCode: row[2],
            time: row[3],
            subject: row[4],
            instructor: row[5],
            day: row[6], // Assuming day is in the 7th column
          }));

        setSheetData(transformedData);

        const uniqueSemesters = [
          ...new Set(transformedData.map(item => item.semester)),
        ];

        setSelectedSemester('all');
        setSelectedSection('all');
        setShowInfoContainer(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Always set loading to false, whether successful or not
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs only once on component mount

  const filterDataBySemesterAndSection = () => {
    return selectedSemester && selectedSection
      ? sheetData.filter(
          item =>
            (selectedSemester === 'all' ||
              item.semester === selectedSemester) &&
            (selectedSection === 'all' || item.section === selectedSection),
        )
      : sheetData;
  };

  const renderFilterButton = (
    label,
    value,
    selectedValue,
    onPress,
    isSemester,
    key,
  ) => (
    <TouchableOpacity
      key={key} // Utilize key prop
      style={[
        styles.filterButton,
        isSemester ? styles.semesterButton : styles.sectionButton,
        selectedValue === value && styles.selectedFilterButton,
      ]}
      onPress={onPress}>
      <Text style={styles.filterButtonText}>{label}</Text>
    </TouchableOpacity>
  );

  const renderSemesterButtons = () => {
    const uniqueSemesters = [
      'all',
      ...new Set(sheetData.map(item => item.semester)),
    ];
    const filteredSemesters = uniqueSemesters.filter(
      semester => !semester.includes('Semester'),
    );

    return filteredSemesters.map((semester, index) => (
      <Pressable
        key={`semester_${semester}`}
        onPress={() => setSelectedSemester(semester)}
        style={({pressed}) => [
          styles.filterButton,
          styles.semesterButton,
          pressed ? styles.selectedFilterButton : null,
          selectedSemester === semester ? styles.selectedFilterButton : null,
        ]}>
        <Text style={styles.filterButtonText}>{`Semester ${semester}`}</Text>
      </Pressable>
    ));
  };

  const renderSectionButtons = () => {
    const sectionsForSelectedSemester = sheetData
      .filter(item => item.semester === selectedSemester)
      .map(item => item.section);

    const uniqueSections = ['all', ...new Set(sectionsForSelectedSemester)];

    return uniqueSections.map(section => {
      // Assign section value as the key prop
      const key = `section_${section}`;

      return renderFilterButton(
        `Section ${section}`,
        section,
        selectedSection,
        () => setSelectedSection(section),
        false,
        key, // Pass key as the key prop
      );
    });
  };

  const renderItem = ({item}) => (
    <View style={styles.EventContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.courseCode}</Text>
        <Text style={styles.classText}>{item.subject}</Text>
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.dateText}>{`${item.day}`}</Text>
        <Text style={styles.instructorText}>{`${item.instructor}`}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.timeText}>{item.time}</Text>
        <MaterialIcons
          name={selectedItems.includes(item) ? 'bookmark' : 'bookmark-border'}
          size={30}
          color="black"
          style={styles.bookMarkStyle}
          onPress={() => handleBookmarkPress(item)}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.activityIndicator} />
      ) : (
        <>
          <View style={styles.buttonContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.rowContainer}>{renderSemesterButtons()}</View>
            </ScrollView>
            {/* <View style={styles.horizontalLines} /> */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.rowContainer}>{renderSectionButtons()}</View>
            </ScrollView>
          </View>
          <FlatList
            data={filterDataBySemesterAndSection()}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: '2%',
  },
  buttonContainer: {
    // marginTop: 10,
    // paddingHorizontal: 80,
    borderWidth: 2,
    borderColor: ColorShade.containerBorder,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 10,
    backgroundColor: ColorShade.secondaryColor,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 5,
    // width: '95%',
    height: '18%',

    // marginHorizontal: '2%',
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3498db',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedFilterButton: {
    backgroundColor: '#3498db',
  },
  filterButtonText: {
    color: 'black',
    fontFamily: fontStyle.SanFranciscoRegular,
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
  },
  title: {
    color: '#000000',
    fontSize: 17,
    // fontWeight: '700',
    textAlign: 'left',
    width: '50%',
    fontFamily: fontStyle.SFNSDisplayBold,
  },
  classText: {
    color: '#000000',
    fontSize: 17,
    // fontWeight: '700',
    textAlign: 'right',
    width: '50%',
    fontFamily: fontStyle.SFNSDisplayBold,
  },
  messageContainer: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#333333',
    fontFamily: fontStyle.SanFranciscoRegular,
  },
  instructorText: {
    position: 'absolute',
    right: 0,
  },
  timeText: {
    fontSize: 14,
    color: '#333333',
    fontFamily: fontStyle.SanFranciscoRegular,
    // borderColor:'red',
    // borderWidth:1,
    width: '50%',
  },
  semesterButton: {
    backgroundColor: '#ffff',
  },
  sectionButton: {
    backgroundColor: '#ffff',
  },
  horizontalLines: {
    borderColor: 'blue',
    borderWidth: 1,
    width: 350,
  },
  bookMarkStyle: {
    textAlign: 'right',
    width: '50%',
  },
});

export default TimeTablePage;
