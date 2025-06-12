import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import HelpSupportPage from '../components/HelpSupportPage';
import {ColorShade} from '../../Asset/CSS_COLOR';

const HelpSupportScreen = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      // headerShown: false, // Hide the header based on your logic
      title: 'Help & Support', // Set the header title
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
      <HelpSupportPage />
    </View>
  );
};

export default HelpSupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
