import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useIsFocused} from '@react-navigation/native';
import {AuthenticationContext} from '../Context/AuthenticationContext';
import {useNavigation} from '@react-navigation/native';
import {ColorShade} from '../../Asset/CSS_COLOR';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginButton = ({data}) => {
  const {state: AuthenticationState} = useContext(AuthenticationContext);
  const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false); // State for incorrect password
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState('');
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  //Token
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

  useEffect(() => {
    // setIsLoading(false); // Reset isLoading when the screen is focused
  }, [isFocused]);

  function submit() {
    // console.log("State BtnLogin : ",AuthenticationState);
    console.log('Data BtnLogin : ', AuthenticationState);

    let emailResult = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      data.Email,
    );

    if (!data.Email) {
      Alert.alert('Please fill the blank');
      return;
    }

    // if(emailResult ){
    // }else{
    //   // Alert.alert("Please correct input Email ")
    // }
    const storeData = async value => {
      try {
        console.log('Value : ', value);
        const {Token, Email, Name} = value; // Destructure the value object to extract Token and Role
        console.log({token, Email, Name});
        const dataToStore = JSON.stringify({
          Token,
          Email,
          Name,
        }); // Create a new object to store
        console.log('DatatoStore: ', dataToStore);
        await AsyncStorage.setItem('my-key', dataToStore); // Store the data
        console.log('Token Role sucessfull');
      } catch (e) {
        console.error('Error storing data: ', e);
        // Handle saving error
      }
    };

    if (emailResult && data.Password) {
      auth()
        .signInWithEmailAndPassword(data.Email, data.Password)
        .then(() => {
          setIsPasswordIncorrect(false);
          setIsLoading(false);

          AuthenticationState.forEach(item => {
            console.log('ITEM Button Login : ', item);

            if (item.Email.toLowerCase() == data.Email.toLowerCase()) {
              if (data.Email.includes('@student.uol.edu.pk')) {
                const dataToStore = {
                  Token: token,
                  Email: item.Email,
                  Name: `${item.FirstName} ${item.LastName}`,
                };
                storeData(dataToStore).then(() => {
                  setIsLoading(false);

                  navigation.navigate('StudentBottomTab');
                });
              } else if (data.Email.includes('@cs.uol.edu.pk')) {
                const dataToStore = {
                  Token: token,
                  Email: item.Email,
                  Name: `${item.FirstName} ${item.LastName}`,
                };
                storeData(dataToStore).then(() => {
                  setIsLoading(false);
                  navigation.navigate('TeacherBottomTab');
                });
              } else if (data.Email.includes('@admin.uol.edu.pk')) {
                const dataToStore = {
                  Token: token,
                  Email: item.Email,
                  Name: `${item.FirstName} ${item.LastName}`,
                };
                storeData(dataToStore).then(() => {
                  setIsLoading(false);
                  navigation.navigate('AdminBottomTab');
                });
              }
            }
          });
        })
        .catch(err => {
          setIsLoading(true);

          console.log('error login: ', err);
          setIsPasswordIncorrect(true); // Set state to indicate incorrect password
        });
    }
  }

  return (
    <View>
      <View>
        {isPasswordIncorrect && (
          <View style={styles.incorrectPasswordContainer}>
            <Text style={[styles.incorrectPasswordText, {fontSize: 12}]}>
              Your credentials are incorrect
            </Text>
          </View>
        )}
      </View>

      <View style={styles.ButtonContainer}>
        {/* Display the "Password is incorrect" text when isPasswordIncorrect is true  */}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            submit();
          }}>
          {isLoading ? (
            <Text style={styles.buttonText}>Log in</Text>
          ) : (
            <ActivityIndicator
              size="small"
              color={ColorShade.loadingColor}
              // style={styles.loadingIndicator}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* <View style={styles.Loadingcontainer}>
  
        {isLoading && (
          <ActivityIndicator
            size="large"
            color="blue"
            style={styles.loadingIndicator}
          />
        )}
      </View> */}
    </View>
  );
};

export default LoginButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    padding: 10,
    // borderWidth: 1,
    // borderColor: ColorShade.containerBorder,
    borderRadius: 5,
    marginHorizontal: 30,
    backgroundColor: ColorShade.buttonBackgroundColor, //login button
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
  incorrectPasswordContainer: {
    alignItems: 'center',
    // borderColor:"blue",
    // borderWidth:2,
    width: '100%',

    marginBottom: '10%',
  },
  incorrectPasswordText: {
    color: 'red',
  },
  Loadingcontainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  loadingIndicator: {
    marginBottom: 80, // Adjust the margin as needed
  },
});
