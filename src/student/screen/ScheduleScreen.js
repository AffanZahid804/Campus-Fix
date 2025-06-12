import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import SchedulePage_std from '../components/SchedulePage_std';
import LinearGradient from 'react-native-linear-gradient';
import {ColorShade} from '../../Asset/CSS_COLOR';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
// TimeTable_std

const ScheduleScreen = ({navigation}) => {
  function navigationHandler() {
    navigation.navigate('TimeTable_std');
  }
  useEffect(() => {
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
      headerRight: () => (
        <Pressable
          style={{marginRight: 15}}
          onPress={() => {
            navigationHandler();
          }}>                                         
          <MaterialIcons name="table-chart" size={24} color="black" /> 
        </Pressable>
      ),
    });
  }, []);
  return (
    <View style={styles.View}>
      <View>
        <SchedulePage_std />
      </View>
    </View>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  View: {
    // borderColor: 'red',
    // borderWidth: 2,
  },
});
