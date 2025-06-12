import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import PrivacyPage from '../components/PrivacyPage';
import {ColorShade} from '../../Asset/CSS_COLOR';

const PrivacyScreen = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      // headerShown: false, // Hide the header based on your logic
      title: 'Privacy Policy', // Set the header title
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
      <PrivacyPage />
    </View>
  );
};

export default PrivacyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
