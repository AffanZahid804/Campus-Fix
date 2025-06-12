import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import HomePage_std from '../components/HomePage_std';
import {ColorShade} from '../../Asset/CSS_COLOR';
import LinearGradient from 'react-native-linear-gradient';
import {TimeTableContext} from '../../common/Context/TimeTableContext';
import HomePage from '../../common/components/HomePage';

const HomeScreen_std = ({navigation}) => {
  const {getTimeTableHandlerCxt} = useContext(TimeTableContext);
  useEffect(() => {
    getTimeTableHandlerCxt();
    // Conditionally update navigation options based on some logic
    navigation.setOptions({
      // headerShown: false, // Hide the header based on your logic
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
    <LinearGradient
      colors={['#ffff', '#ffff', '#ffff']}
      style={styles.container}>
      <HomePage />
    </LinearGradient>
  );
};

export default HomeScreen_std;

const styles = StyleSheet.create({
  container: {
    // backgroundColor:ColorShade.primaryColor,
    flex: 1,
    // borderColor: 'purple',
    // borderWidth: 5,
  },
});
