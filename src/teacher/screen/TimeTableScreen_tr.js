import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import TimeTablePage from '../../common/components/TimeTablePage';
import {ColorShade} from '../../Asset/CSS_COLOR';
import {TimeTableContext} from '../../common/Context/TimeTableContext';

const TimeTableScreen_tr = ({navigation}) => {
  const {getTimeTableHandlerCxt} = useContext(TimeTableContext);

  useEffect(() => {
    // Conditionally update navigation options based on some logic
    navigation.setOptions({
      // headerShown: false, // Hide the header based on your logic
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

export default TimeTableScreen_tr;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:"red"
  },
});
