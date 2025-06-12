import React, {useState, useEffect} from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import RequestsPage from './RequestsPage';
import ComplaintPage from './ComplaintPage';
import {fontStyle} from '../../Asset/CSS_COLOR';

const AdminSectionPage_admin = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const [pressedButton, setPressedButton] = useState('request');

  const handleButtonClick = page => {
    setCurrentPage(page);
    setPressedButton(page);
  };

  // Set currentPage to 'request' when component mounts
  useEffect(() => {
    setCurrentPage('request');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <Text style={styles.title}>Admin Section</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={({pressed}) => [
            styles.button,
            {
              backgroundColor:
                pressedButton === 'request' || pressed ? '#ffff' : '#d3d3d3',
            },
          ]}
          onPress={() => handleButtonClick('request')}>
          <Text style={styles.buttonText}>Request</Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            styles.button,
            {
              backgroundColor:
                pressedButton === 'complaint' || pressed ? '#ffff' : '#d3d3d3',
            },
          ]}
          onPress={() => handleButtonClick('complaint')}>
          <Text style={styles.buttonText}>Complaint</Text>
        </Pressable>
      </View>
      <View style={styles.pagesContainer}>
        {currentPage === 'request' && <RequestsPage />}
        {currentPage === 'complaint' && <ComplaintPage />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    height: '100%',
    // borderColor: 'red',
    // borderWidth: 2,
  },
  titleSection: {
    // borderColor: 'red',
    // borderWidth: 1,
    width: '100%',
    // marginVertical: '5%',
    marginTop: '10%',
    marginBottom: '3%',
    justifyContent: 'center',
    // alignItems: 'center',
    marginLeft: '5%',
  },
  title: {
    fontSize: 32,
    fontFamily: fontStyle.SFNSDisplayBold,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#d3d3d3',
    width: '100%',
    borderRadius: 20,
    paddingVertical: 2,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginHorizontal: 10,
    borderRadius: 20,
    borderColor: '#d3d3d3',

    width: '45%',
  },
  buttonText: {
    color: '#696969',
    fontSize: 16,
    // fontWeight: 'bold',
    fontFamily: fontStyle.SanFranciscoRegular,
    textAlign: 'center',
  },
  pagesContainer: {
    // borderColor: 'green',
    // borderWidth: 5,
    // height: '80%',
    flex: 1,
  },
});

export default AdminSectionPage_admin;
