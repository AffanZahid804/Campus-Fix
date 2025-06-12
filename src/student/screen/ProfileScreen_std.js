import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import ProfilePage_std from '../components/ProfilePage_std';
import LinearGradient from 'react-native-linear-gradient';
import {ColorShade} from '../../Asset/CSS_COLOR';

const ProfileScreen_std = ({navigation}) => {
  useEffect(() => {
    // Conditionally update navigation options based on some logic
    navigation.setOptions({
      title: 'Student Portal', // Set the header title
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
      <LinearGradient colors={['#ffff', '#ffff', '#ffff']}>
        <ProfilePage_std />
      </LinearGradient>
    </View>
  );
};

export default ProfileScreen_std;

const styles = StyleSheet.create({});
