import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useContext} from 'react';
import LoginPage from '../components/LoginPage';
import {AuthenticationContext} from '../Context/AuthenticationContext';
import LinearGradient from 'react-native-linear-gradient';
import {ColorShade} from '../../Asset/CSS_COLOR';

const LoginScreen = ({navigation}) => {
  const {getLogInHandlerCxt} = useContext(AuthenticationContext);
  useEffect(() => {
    getLogInHandlerCxt();

    navigation.setOptions(
      {
        headerShown: false, // Set headerShown based on your condition
        // title: 'Login Portal', // Set the header title
        // headerStyle: {
        //   backgroundColor: ColorShade.header, // Set the header background color
        // },
        // headerTintColor: '#fff', // Set the text color of the header title
        // headerTitleStyle: {
        //   fontWeight: 'bold',
        // },
        // headerLeft: () => <View />, // Hides the back button
      },
      [],
    );
  }, []);

  return (
    <LinearGradient colors={['white', 'white']} style={styles.container}>
      <LoginPage />
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
