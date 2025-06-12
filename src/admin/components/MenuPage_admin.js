import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {ColorShade, fontStyle} from '../../Asset/CSS_COLOR';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const MenuPage_admin = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('my-key');
        if (jsonValue) {
          const userData = JSON.parse(jsonValue);
          if (userData && userData.Name) {
            setUserName(userData.Name);
          }
        }
      } catch (error) {
        console.error('Error retrieving user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const removeAllData = async () => {
    try {
      await AsyncStorage.clear();
      console.log('All AsyncStorage data removed successfully.');
    } catch (e) {
      console.error('Error clearing AsyncStorage data:', e);
    }
  };
  const logoutHandler = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    removeAllData().then(() => {
      console.log('Logged out successfully.');

      navigation.navigate('Splash');
    });
  };

  const handleHelpAndSupport = () => {
    // Handle Help & Support action
    // console.log('Help & Support clicked');
    navigation.navigate('HelpSupport');
  };
  const handlePrivacy = () => {
    // Handle Privacy action
    navigation.navigate('Privacy');
  };
  const handleAbout = () => {
    // Handle Privacy action
    navigation.navigate('About');
  };
  const handleTimeTbale = () => {
    // Handle Privacy action
    navigation.navigate('SemesterSchedule_admin');

    // navigation.navigate('MakupClass_tr');
  };
  const ExamHandler = () => {
    // Handle Privacy action
    navigation.navigate('Exam_admin');

    // navigation.navigate('MakupClass_tr');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../Asset/Icon/profile.png')}
          style={styles.imageStyle}
        />
        <Text style={styles.nameStyle}>{userName}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>General</Text>
      </View>
      {/* <TouchableOpacity
        style={styles.settingItem}
        onPress={handleHelpAndSupport}>
        <Image
          style={styles.iconStyle}
          source={require('../../Asset/Icon/support.png')}
        />
        <Text style={styles.settingText}>Help & Support</Text>
        <Image
          style={[styles.iconStyle, styles.iconStyleAdd]}
          source={require('../../Asset/Icon/greater.png')}
        />
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.settingItem} onPress={handleTimeTbale}>
        <Image
          style={styles.iconStyle}
          source={require('../../Asset/Icon/timetable.png')}
        />
        <Text style={styles.settingText}>Time Table</Text>
        <Image
          style={[styles.iconStyle, styles.iconStyleAdd]}
          source={require('../../Asset/Icon/greater.png')}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem} onPress={handlePrivacy}>
        <Image
          style={styles.iconStyle}
          source={require('../../Asset/Icon/privacy.png')}
        />
        <Text style={styles.settingText}>Privacy</Text>
        <Image
          style={[styles.iconStyle, styles.iconStyleAdd]}
          source={require('../../Asset/Icon/greater.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={handleAbout}>
        <Image
          style={styles.iconStyle}
          source={require('../../Asset/Icon/about.png')}
        />
        <Text style={styles.settingText}>About</Text>
        <Image
          style={[styles.iconStyle, styles.iconStyleAdd]}
          source={require('../../Asset/Icon/greater.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={ExamHandler}>
        <Image
          style={styles.iconStyle}
          source={require('../../Asset/Icon/about.png')}
        />
        <Text style={styles.settingText}>Exam</Text>
        <Image
          style={[styles.iconStyle, styles.iconStyleAdd]}
          source={require('../../Asset/Icon/greater.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={logoutHandler}>
        {/* <Image 
        style={styles.iconStyle}
        source={require("../../Asset/Icon/")}
        /> */}
        <Text style={styles.logOutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MenuPage_admin;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    height: '100%',
  },
  profileContainer: {
    height: '20%',
    backgroundColor: ColorShade.header,
    // justifyContent:"center",
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameStyle: {
    fontFamily: fontStyle.SanFranciscoRegular,
    color: '#ffff',
    fontSize: 18,
    marginLeft: '3%',
  },
  imageStyle: {
    height: 60,
    width: 60,
    marginLeft: '5%',
  },
  titleContainer: {
    // borderColor: 'red',
    // borderWidth: 1,
    height: '10%',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fontStyle.SFNSDisplayBold,
    color: 'black',
    fontSize: 18,
    marginLeft: '8%',
  },
  header: {
    fontSize: 20,
    // fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: fontStyle.SFNSDisplayBold,
  },
  settingItem: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: ColorShade.borderColor,
    borderRadius: 5,
    marginHorizontal: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 10,

    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  iconStyle: {
    height: 40,
    width: 40,
  },
  iconStyleAdd: {
    position: 'absolute',
    right: 0,
  },
  settingText: {
    fontSize: 16,
    // fontWeight:"500",
    color: '#333',
    fontFamily: fontStyle.SFNSDisplayBold,
    marginLeft: '10%',
  },
  logoutButton: {
    flexDirection: 'row',
    padding: 10,
    // borderWidth: 1,
    // borderColor: ColorShade.containerBorder,
    borderRadius: 5,
    marginHorizontal: 30,
    backgroundColor: ColorShade.buttonBackgroundColor,
    borderRadius: 25,
    // marginBottom: 10,
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  logOutText: {
    // textAlign:"center",
    // justifyContent:"center",
    fontSize: 18,
    color: '#fff',
    fontFamily: fontStyle.SFNSDisplayBold,
  },
});
