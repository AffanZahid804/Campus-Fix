import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AboutPage from '../components/AboutPage';
import {ColorShade} from '../../Asset/CSS_COLOR';

const AboutScreen = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      // headerShown: false, // Hide the header based on your logic
      title: 'About', // Set the header title
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
      <AboutPage />
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
