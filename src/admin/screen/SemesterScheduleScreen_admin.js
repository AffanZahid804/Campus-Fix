import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import SemesterSchedulePage_admin from '../components/SemesterSchedulePage_admin';
import LinearGradient from 'react-native-linear-gradient';
import {ColorShade} from '../../Asset/CSS_COLOR';
import RNFetchBlob from 'rn-fetch-blob';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

const SemesterScheduleScreen_admin = ({navigation}) => {
  const SHEET_ID = '1REh3nxneDP0hIbNQbhvzVXPPiLWKR9l6Iif8ACfDzXg';
  const API_KEY = 'AIzaSyD1cz3yquF4z-6vJ9AF5BV_L9hfNE5BtT8';
  const downloadSpreadsheet = async () => {
    try {
      // Show alert when download starts
      Alert.alert(
        'Download Started',
        'Downloading Time Table schedule...',
        [
          {
            text: 'OK',
            onPress: async () => {
              const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=xlsx`;
              const response = await RNFetchBlob.config({
                fileCache: true,
                addAndroidDownloads: {
                  useDownloadManager: true,
                  notification: true,
                  title: 'Time Table Schedule',
                  description: 'Downloading Time Table schedule...',
                  mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                  path:
                    RNFetchBlob.fs.dirs.DownloadDir +
                    '/timeTable_schedule.xlsx',
                },
              }).fetch('GET', url);
              console.log('File downloaded to:', response.path());
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  useEffect(() => {
    // Conditionally update navigation options based on some logic
    navigation.setOptions({
      // headerShown: false, // Hide the header based on your logic
      title: 'Admin Portal', // Set the header title
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
            downloadSpreadsheet();
          }}>
          <MaterialIcons name="file-download" size={24} color="black" />
        </Pressable>
      ),
    });
  }, []);
  return (
    <LinearGradient
      colors={['#ffff', '#ffff', '#ffff']}
      style={styles.container}>
      <SemesterSchedulePage_admin />
    </LinearGradient>
  );
};

export default SemesterScheduleScreen_admin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
