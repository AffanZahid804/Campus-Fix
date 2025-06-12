import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import HomePage_admin from '../components/HomePage_admin';
import {ColorShade} from '../../Asset/CSS_COLOR';
import HomePage from '../../common/components/HomePage';
const HomeScreen_admin = ({navigation}) => {
  useEffect(() => {
    // Conditionally update navigation options based on some logic
    navigation.setOptions({
      // headerShown: false, // Hide the header based on your logic
      title: 'Admin Portal', // Set the header title
      // headerShown: false, // Hide the header based on your logic
      headerStyle: {
        backgroundColor: ColorShade.header, // Set the header background color to red
      },
      headerTintColor: '#ffff', // Set the text color of the header title
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, []);
  return (
    <View style={styles.container}>
      <HomePage_admin />
    </View>
  );
};

export default HomeScreen_admin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
});
