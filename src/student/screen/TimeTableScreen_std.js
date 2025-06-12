import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';

import {TimeTableContext} from '../../common/Context/TimeTableContext';
import {ColorShade} from '../../Asset/CSS_COLOR';
import TimeTablePage from '../../common/components/TimeTablePage';

const TimeTableScreen_std = ({navigation}) => {
  const {getTimeTableHandlerCxt} = useContext(TimeTableContext);
  useEffect(() => {
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
    const handleBackButton = () => {
      // Your function logic here
      getTimeTableHandlerCxt();
      console.log('Back button pressed');
    };

    const backHandler = navigation.addListener('beforeRemove', e => {
      // Prevent default behavior of leaving the screen
      // e.preventDefault();

      // Trigger your custom back button function
      handleBackButton();
    });

    // Cleanup the event listener when the component is unmounted
    // return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TimeTablePage />
    </View>
  );
};

export default TimeTableScreen_std;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
