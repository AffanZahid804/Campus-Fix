import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {ColorShade, fontStyle} from '../../Asset/CSS_COLOR';
import {MakeupClassContext} from '../../common/Context/MakeupClassContext';
import {dummyMakeupClassData} from '../../Data/DummyData';
import RequestButton from '../../teacher/button/RequestButton';

const RequestsPage = () => {
  const [pressedButton, setPressedButton] = useState('InProgress');
  const {state: MakeupClassState, deleteMakeupClassHandlerCxt} =
    useContext(MakeupClassContext);
  const [makeupData, setMakeupData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleStatus = status => {
    setPressedButton(status);
  };

  // const filteredMakeupClasses = MakeupClassState.filter(
  //   item => item.Status === (pressedButton === 'Resolved'),
  // );
  useEffect(() => {
    const getMakeupData = () => {
      const filteredMakeupData = MakeupClassState.filter(
        item => item.Status === pressedButton,
      );
      setMakeupData(filteredMakeupData);
    };
    getMakeupData();
  }, [MakeupClassState, pressedButton]);

  useEffect(() => {
    setIsLoading(true);
    console.log('MakeUpdata Data : ', makeupData);
  }, [makeupData]);

  const deleteHandler = item => {
    const {id, UniqueId} = item;

    // Show alert before deleting
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this makeup class?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            // Call deleteMakeupClassHandlerCxt if user confirms deletion
            deleteMakeupClassHandlerCxt(UniqueId, id);
          },
        },
      ],
    );
  };

  const renderMakeupClass = ({item}) => (
    <Pressable
      style={styles.EventContainer}
      onLongPress={() => deleteHandler(item)}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.CourseCode}</Text>
        <View style={styles.teacherContainer}>
          <Text style={styles.classText}>{item.Subject}</Text>
          <Text style={styles.instructorText}>{item.Instructor}</Text>
        </View>
      </View>
      <View style={styles.messageContainer}>
        <View style={styles.dayTimeContainer}>
          <Text style={styles.timeText}>{item.StartTime}</Text>
          <Text style={styles.timeText}>- {item.EndTime}</Text>
        </View>
        <View style={styles.dayTimeContainer}>
          <Text style={styles.dateText}>
            {item.Day} ({' '}
            {new Date(item.Day).toLocaleDateString('en-US', {weekday: 'long'})}{' '}
            )
          </Text>
        </View>
        <View style={styles.classContainer}>
          <Text style={styles.timeText}>{item.Semester}</Text>
          <Text style={styles.timeText}>{item.Section}</Text>
          <RequestButton
            item={{UniqueId: item.UniqueId, Status: 'Resolved', id: item.id}}
            selectedItems={selectedItems}
            status={pressedButton}
          />
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <Text style={styles.title}>All Requests</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={({pressed}) => [
            styles.button,
            {
              backgroundColor:
                pressedButton === 'InProgress' && !pressed
                  ? '#ffff'
                  : '#d3d3d3',
            },
          ]}
          onPress={() => handleStatus('InProgress')}>
          <Text style={styles.buttonText}>InProgress</Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            styles.button,
            {
              backgroundColor:
                pressedButton === 'Resolved' && !pressed ? '#ffff' : '#d3d3d3',
            },
          ]}
          onPress={() => handleStatus('Resolved')}>
          <Text style={styles.buttonText}>Resolved</Text>
        </Pressable>
      </View>

      {isLoading ? (
        <FlatList
          data={makeupData} // Show only filtered data
          renderItem={renderMakeupClass}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <ActivityIndicator size="large" color="blue" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',

    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 5,

    backgroundColor: '#d3d3d3',
    width: '100%',
    borderRadius: 20,
    paddingVertical: 2,
  },
  titleSection: {
    justifyContent: 'center',
    paddingLeft: '5%',
  },
  title: {
    fontSize: 22,
    fontFamily: fontStyle.SFNSDisplayBold,
    color: '#000',
  },
  button: {
    // backgroundColor: '#ffff',
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginHorizontal: 10,
    borderRadius: 20,
    borderColor: '#d3d3d3',
    width: '45%',
  },
  buttonText: {
    color: '#696969',
    fontSize: 16,
    // fontWeight: 'bold',
    fontFamily: fontStyle.SanFranciscoRegular,
    textAlign: 'center',
  },
  makeupClassContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  makeupClassText: {
    fontSize: 16,
  },
  EventContainer: {
    marginTop: 10,
    // paddingHorizontal: 80,
    // borderWidth: 2,
    // borderColor: '#d3d3d3',

    borderRadius: 10,
    padding: 10,
    backgroundColor: '#ffff',
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
  dayTimeContainer: {
    // borderColor: 'yellow',
    // borderWidth: 2,
    flexDirection: 'row',
  },
  classContainer: {
    // borderColor: 'yellow',
    // borderWidth: 2,
    width: '100%',
    flexDirection: 'row',
    // flex:1
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

export default RequestsPage;
