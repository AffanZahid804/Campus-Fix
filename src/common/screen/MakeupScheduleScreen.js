import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {ColorShade} from '../../Asset/CSS_COLOR';
import MakeupSchedulePage from '../components/MakeupSchedulePage';

const MakeupScheduleScreen = ({navigation}) => {
  useEffect(() => {
    // Conditionally update navigation options based on some logic
    navigation.setOptions({
      // headerShown: false, // Hide the header based on your logic
      title: 'Teacher Portal', // Set the header title

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
      <MakeupSchedulePage />
    </View>
  );
};

export default MakeupScheduleScreen;

const styles = StyleSheet.create({});
