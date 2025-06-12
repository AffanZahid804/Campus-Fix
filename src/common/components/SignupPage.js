import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import SignupButton from '../UI/SignupButton';
import messaging from '@react-native-firebase/messaging';
import {ColorShade, fontStyle} from '../../Asset/CSS_COLOR';

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [registration, setRegistration] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [token, setToken] = useState();
  async function requestUserPermission() {
    // console.log("Data before : ",data);
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {
    console.log(token);
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then(token => {
          console.log('Tokens : ', token);
          setToken(token);
        });
    }
  }, []);

  function getFirstNameHandler(txt) {
    setFirstName(txt);
  }
  function getLastNameHandler(txt) {
    setLastName(txt);
  }
  function getEmailHandler(txt) {
    setEmail(txt);
  }
  function getRegistration(txt) {
    setRegistration(txt);
  }
  function getPasswordHandler(txt) {
    setPassword(txt);
  }
  function getConfirmPasswordHandler(txt) {
    setConfirmPassword(txt);
  }
  function getDepartmentHandler(txt) {
    setDepartment(txt);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up </Text>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.iconStyle}
            source={require('../../Asset/Icon/name.png')}
          />
          <TextInput
            placeholder="First Name"
            style={styles.input}
            onChangeText={txt => getFirstNameHandler(txt)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.iconStyle}
            source={require('../../Asset/Icon/name.png')}
          />
          <TextInput
            placeholder="Last Name"
            style={styles.input}
            onChangeText={txt => getLastNameHandler(txt)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.iconStyle}
            source={require('../../Asset/Icon/email.png')}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={txt => getEmailHandler(txt)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.iconStyle}
            source={require('../../Asset/Icon/sap.png')}
          />
          <TextInput
            placeholder="SAP ID/Registration"
            style={styles.input}
            onChangeText={txt => getRegistration(txt)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.iconStyle}
            source={require('../../Asset/Icon/password.png')}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            onChangeText={txt => getPasswordHandler(txt)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.iconStyle}
            source={require('../../Asset/Icon/password.png')}
          />
           {/* <Image
            style={styles.iconStyle} // icons hidden
            source={require('../../Asset/Icon/password.png')}
          /> */}
          <TextInput
            placeholder="Confirm Password"
            style={styles.input}
            secureTextEntry
            onChangeText={txt => getConfirmPasswordHandler(txt)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.iconStyle}
            source={require('../../Asset/Icon/department.png')}
          />
          <TextInput
            placeholder="Department"
            style={styles.input}
            onChangeText={txt => getDepartmentHandler(txt)}
          />
        </View>
        <View>
          <SignupButton
            data={{
              firstName,
              lastName,
              email,
              registration,
              password,
              confirmPassword,
              department,
              token,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    //    height:"100%",
    flexGrow: 1,

    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  title: {
    marginTop: '5%',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: fontStyle.SFNSDisplayBold,
    color: '#000',   // signup color 
  },
  form: {
    width: '80%',
  },
  input: {
    width: '100%',
    paddingLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 5,
    borderWidth: 1,
     borderColor: ColorShade.borderColor, //tiles outline color 
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
  iconStyle: {
    height: 35,
    width: 35,
    marginLeft: 10,
  },
});

export default SignupPage;
