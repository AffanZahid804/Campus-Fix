import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import ComplaintPage_tr from '../compoments/ComplaintPage_tr';
import {ColorShade} from '../../Asset/CSS_COLOR';

const ComplaintScreen_tr = ({navigation}) => {
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
      <ComplaintPage_tr />
    </View>
  );
};

export default ComplaintScreen_tr;

const styles = StyleSheet.create({});
