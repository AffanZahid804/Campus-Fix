import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {ColorShade, fontStyle} from '../../Asset/CSS_COLOR';
import SubmitMakeupClass from '../button/SubmitMakeupClass';
import AsyncStorage from '@react-native-async-storage/async-storage';
import babelConfig from '../../../babel.config';
const MakupClassesPage_tr = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [day, setDay] = useState('');
  const [subject, setSubject] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [section, setSection] = useState('');
  const [semester, setSemester] = useState('');
  const [status, setStatus] = useState('InProgress');
  const [token, setToken] = useState('');

  useEffect(() => {
    const getDataFromAsyncStorage = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('my-key');
        if (jsonValue !== null) {
          const data = JSON.parse(jsonValue);
          // Extract only the desired properties
          const {Token, Email, Name} = data;
          // Set the extracted properties to state
          setName(Name);
          setToken(Token);
          setEmail(Email);
        }
      } catch (error) {
        console.error('Error reading data from AsyncStorage:', error);
      }
    };

    getDataFromAsyncStorage();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Makeup Class</Text>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.iconStyle}
            source={require('../../Asset/Icon/m_date.png')}
          />
          <TextInput
            style={styles.input}
            value={day}
            onChangeText={setDay}
            placeholder="Day (mm-dd-yyyy)"
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.iconStyle}
            source={require('../../Asset/Icon/m_subject.png')}
          />
          <TextInput
            style={styles.input}
            value={subject}
            onChangeText={setSubject}
            placeholder="Subject"
          />
        </View>

        <View style={styles.timeContainer}>
          <View style={[styles.inputContainer, {width: '49%'}]}>
            <Image
              style={styles.iconStyle}
              source={require('../../Asset/Icon/m_time.png')}
            />
            <TextInput
              style={styles.input}
              value={startTime}
              onChangeText={setStartTime}
              placeholder="Start (hh:mm)"
            />
          </View>
          <View style={[styles.inputContainer, {width: '49%'}]}>
            <Image
              style={styles.iconStyle}
              source={require('../../Asset/Icon/m_time.png')}
            />
            <TextInput
              style={[styles.input, {marginLeft: '3%'}]}
              value={endTime}
              onChangeText={setEndTime}
              placeholder="End (hh:mm)"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.iconStyle}
            source={require('../../Asset/Icon/m_courseCode.png')}
          />
          <TextInput
            style={styles.input}
            value={courseCode}
            onChangeText={setCourseCode}
            placeholder="Room No"
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.iconStyle}
            source={require('../../Asset/Icon/m_sem_sec.png')}
          />
          <TextInput
            style={styles.input}
            value={semester}
            onChangeText={setSemester}
            placeholder="Semester"
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.iconStyle}
            source={require('../../Asset/Icon/m_sem_sec.png')}
          />
          <TextInput
            style={styles.input}
            value={section}
            onChangeText={setSection}
            placeholder="Section"
          />
        </View>
      </View>

      <SubmitMakeupClass
        data={{
          name,
          email,
          day,
          subject,
          startTime,
          endTime,
          courseCode,
          section,
          semester,
          status,
          token,
        }}
      />
    </ScrollView>
  );
};

const styles = {
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    // height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: fontStyle.SFNSDisplayBold,
    marginBottom: 20,
    color: ColorShade.titleColor,
  },
  form: {
    width: '80%',
  },

  inputContainer: {
    flexDirection: 'row',
    padding: 5,
    borderWidth: 1,
    borderColor: ColorShade.borderColor,
    borderRadius: 5,
    // marginHorizontal: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 10,

    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  input: {
    width: '100%',
    paddingLeft: 10,
  },
  timeContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  signUpButton: {
    backgroundColor: ColorShade.buttonBackgroundColor,
    borderRadius: 4,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  signUpButtonText: {
    color: ColorShade.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconStyle: {
    height: 35,
    width: 35,
    marginLeft: 10,
  },
};

export default MakupClassesPage_tr;
