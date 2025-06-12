import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AnnouncementPage_admin from '../components/AnnouncementPage_admin';
import {ColorShade} from '../../Asset/CSS_COLOR';

const AnnouncementScreen_admin = ({navigation}) => {
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
    <View style={styles.container}>
      <AnnouncementPage_admin />
    </View>
  );
};

export default AnnouncementScreen_admin;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    height: '100%',
  },
});
