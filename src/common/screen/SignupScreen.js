import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SignupPage from '../components/SignupPage';
import LinearGradient from 'react-native-linear-gradient';
import {ColorShade} from '../../Asset/CSS_COLOR';

const SignupScreen = ({navigation}) => {
  useEffect(() => {
    // Conditionally update navigation options based on some logic
    navigation.setOptions({
      // headerShown: false, // Hide the header based on your logic
      title: '', // Set the header title
      // headerShown: false, // Hide the header based on your logic
      headerStyle: {
        backgroundColor: ColorShade.header, // Set the header background color to red
      },
      headerTintColor: '#fff', // Set the text color of the header title
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  });

  return (
    <LinearGradient
      colors={['#ffff', '#ffff', '#ffff']}
      style={styles.container}>
      <SignupPage />
    </LinearGradient>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
