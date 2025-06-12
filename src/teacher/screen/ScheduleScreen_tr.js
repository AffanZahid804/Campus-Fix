import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import SchedulePage_tr from '../compoments/SchedulePage_tr';
import LinearGradient from 'react-native-linear-gradient';
import {ColorShade} from '../../Asset/CSS_COLOR';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

const ScheduleScreen_tr = ({navigation}) => {
  function navigationHandler() {
    navigation.navigate('TimeTable_tr');
  }
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
    <View style={styles.container}>
      <LinearGradient colors={['#ffff', '#ffff']}>
        <SchedulePage_tr />
      </LinearGradient>
    </View>
  );
};

export default ScheduleScreen_tr;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
  },
});
