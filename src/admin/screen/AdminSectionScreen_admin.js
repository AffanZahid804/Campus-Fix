import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import AdminSectionPage_admin from '../components/AdminSectionPage_admin';

const AdminSectionScreen_admin = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <AdminSectionPage_admin />
    </View>
  );
};

export default AdminSectionScreen_admin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
