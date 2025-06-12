import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import LoginButton from '../UI/LoginButton';
import {ColorShade} from '../../Asset/CSS_COLOR';

const LoginPage = () => {
  const navigation = useNavigation();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  function getEmail(txt) {
    setEmail(txt);
  }

  function getPassword(txt) {
    setPassword(txt);
  }

  const SignupHandler = () => {
    navigation.navigate('Signup');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageStyle}
          source={require('../../Asset/Icon/log-in.png')} //login image background
        />          
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text> 
        <View style={styles.inputContainer}>
          <Image
            style={styles.iconStyle}
            source={require('../../Asset/Icon/email.png')}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={txt => getEmail(txt)}
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
            onChangeText={txt => getPassword(txt)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <LoginButton data={{Email: Email, Password: Password}} />
        </View>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => SignupHandler()}>
          <Text style={styles.signUpButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: ColorShade.backgroundColor,
  },
  imageContainer: {
    marginTop: '5%',
    // borderColor: 'red',
    // borderWidth: 1,
    height: '50%',
    // width: '80%',
  },
  imageStyle: {
    height: 400,
    width: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: ColorShade.titleColor,
    // marginTop: '5%',
    textAlign: 'center',
  },
  form: {
    marginTop: '5%',
    width: '80%',
    // borderColor: 'red',
    // borderWidth: 1,
    height: '40%',
    alignSelf: 'center',
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
    // width: '80%',
    flex: 1,
    paddingLeft: 15,
    color: ColorShade.textColor,
    backgroundColor: '#ffff',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  iconStyle: {
    height: 35,
    width: 35,
    marginLeft: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  signUpButton: {
    // backgroundColor: ColorShade.buttonBackground,
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
});

export default LoginPage;
