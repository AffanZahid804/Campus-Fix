import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import {AuthenticationContext} from '../Context/AuthenticationContext';
import {useIsFocused} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {ColorShade} from '../../Asset/CSS_COLOR';

const SignupButton = ({data}) => {
  const navigation = useNavigation();

  const {postSignUpHandlerCxt} = useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   // setIsLoading(false); // Reset isLoading when the screen is focused
  // }, [isFocused]);
  function submit() {
    console.log('Data : ', data);
    let FnameResult = /^[a-zA-Z ]+$/.test(data.firstName);
    let LnameResult = /^[a-zA-Z ]+$/.test(data.lastName);
    let departmentResult = /^[a-zA-Z ]+$/.test(data.department);

    let emailResult = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      data.email,
    );

    if (!data.firstName || !data.lastName || !data.email) {
      return Alert.alert('Please fill the blank');
    }

    if (!FnameResult) {
      return Alert.alert('Please correct input First Name');
    }
    if (!LnameResult) {
      return Alert.alert('Please correct input Last Name');
    }
    if (!departmentResult) {
      return Alert.alert('Please correct input Department');
    }

    if (data.password !== data.confirmPassword) {
      return Alert.alert('Password not match ');
    }

    if (
      !data.email.includes('@student.uol.edu.pk') &&
      !data.email.includes('@cs.uol.edu.pk') &&
      !data.email.includes('@admin.uol.edu.pk')
    ) {
      return Alert.alert('Please correct Email According University ');
    }

    // else if (!data.email.includes('@cs.uol.edu.pk')) {
    //   return Alert.alert('Please correct Email According University');
    // }

    // console.log("password : ",data.Password);
    // function hand(){
    //     navigation.navigate("Login")
    // }
    if (FnameResult && LnameResult && emailResult) {
      console.log('dataa : ', data);
      function callBack() {
        // onSend()
        navigation.navigate('Login');
      }
      function ErrorMessage() {
        Alert.alert(
          'Email Already in Use',
          'The provided email is already registered. Please use a different email or try logging in.',
        );
        setIsLoading(true);
      }

      setIsLoading(false);
      postSignUpHandlerCxt(
        data.firstName,
        data.lastName,
        data.email,
        data.password,
        data.confirmPassword,
        data.department,
        data.token,
        callBack,
        ErrorMessage,
      );
    }
  }
  return (
    <View style={styles.container}>
      {/* <View style={styles.Loadingcontainer}>
        {isLoading && (
          <ActivityIndicator
            size="large"
            color="blue"
            style={styles.loadingIndicator}
          />
        )}
      </View> */}
      <TouchableOpacity style={styles.button} onPress={() => submit()}>
        {isLoading ? (
          <Text style={styles.buttonText}>Sign up</Text>
        ) : (
          <ActivityIndicator
            size="small"
            color={ColorShade.loadingColor}
            // style={styles.loadingIndicator}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SignupButton;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    padding: 10,
    // borderWidth: 1,
    // borderColor: ColorShade.containerBorder,
    borderRadius: 5,
    marginHorizontal: 30,
    backgroundColor: ColorShade.buttonBackgroundColor, //signup button 
    borderRadius: 25,
    // marginBottom: 10,
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  Loadingcontainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  loadingIndicator: {
    marginBottom: 60, // Adjust the margin as needed
  },
});
