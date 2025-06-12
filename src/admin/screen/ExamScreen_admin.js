import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import ExamPage from '../components/ExamPage';
import {ColorShade} from '../../Asset/CSS_COLOR';

const ExamScreen_admin = ({navigation}) => {
  useEffect(() => {
    // Conditionally update navigation options based on some logic
    navigation.setOptions({
      // headerShown: false, // Hide the header based on your logic
      title: 'Admin Portal', // Set the header title
      // headerShown: false, // Hide the header based on your logic
      headerStyle: {
        backgroundColor: ColorShade.header, // Set the header background color to red
      },
      headerTintColor: '#fff', // Set the text color of the header title
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, []);
  return (
    <View>
      <ExamPage />
    </View>
  );
};

export default ExamScreen_admin;

const styles = StyleSheet.create({});
