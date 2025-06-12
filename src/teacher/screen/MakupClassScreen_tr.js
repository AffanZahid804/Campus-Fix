import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import MakupClassesPage_tr from '../compoments/MakupClassesPage_tr';
import {ColorShade} from '../../Asset/CSS_COLOR';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
const MakupClassScreen_tr = ({navigation}) => {
  function navigationHandler() {
    navigation.navigate('MakeupSchedule');
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
      ),        // pie color -> black
    });
  }, []);
  return (
    <View style={styles.container}>
      <MakupClassesPage_tr />
    </View>
  );
};

export default MakupClassScreen_tr;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    // flex: 1,
  },
});

//button in front of teacher portal word logic