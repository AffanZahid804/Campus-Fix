import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import ProfilePage_tr from '../compoments/ProfilePage_tr';
import {ColorShade} from '../../Asset/CSS_COLOR';

const ProfileScreen_tr = ({navigation}) => {
  useEffect(() => {
    // Conditionally update navigation options based on some logic
    navigation.setOptions({
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
    <View style={styles.container}>
      <ProfilePage_tr />
    </View>
  );
};

export default ProfileScreen_tr;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
  },
});
