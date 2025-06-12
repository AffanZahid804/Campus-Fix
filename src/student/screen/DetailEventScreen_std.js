import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import DetailEventPage_std from '../components/DetailEventPage_std';
import LinearGradient from 'react-native-linear-gradient';
import {ColorShade} from '../../Asset/CSS_COLOR';

const DetailEventScreen_std = ({navigation, route}) => {
  const data = route.params?.data;
  useEffect(() => {
    // Conditionally update navigation options based on some logic
    navigation.setOptions({
      title: 'Event', // Set the header title
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
    <LinearGradient
      colors={['#427BAC', '#93b7d6', '#c6cace']}
      style={styles.container}>
      <DetailEventPage_std data={data} />
    </LinearGradient>
  );
};

export default DetailEventScreen_std;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#ffffff',
    // borderColor:"red",
    // borderWidth:2,
    height: '100%',
  },
});
