import React, {useEffect, useState, useContext} from 'react';
import {View, Image, Animated, Easing, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useIsFocused} from '@react-navigation/native';
import {AuthenticationContext} from '../Context/AuthenticationContext';
import {TimeTableContext} from '../Context/TimeTableContext';
import {MakeupClassContext} from '../Context/MakeupClassContext';
import {AnnouncementContext} from '../Context/AnnouncementContext';
import {ComplaintContext} from '../Context/ComplaintContext';
import {NotificationContext} from '../Context/NotificationContext';
const SplashScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const [refresh, setRefresh] = useState(true);
  const {getLogInHandlerCxt} = useContext(AuthenticationContext);
  const {getTimeTableHandlerCxt} = useContext(TimeTableContext);
  const {getMakeupClassesHandlerCxt} = useContext(MakeupClassContext);
  const {getAnnouncementHandlerCxt} = useContext(AnnouncementContext);
  const {getComplaintHandlerCxt} = useContext(ComplaintContext);
  const {getNotificationsHandlerCxt} = useContext(NotificationContext);

  const opacity = new Animated.Value(1);

  // const [animationDuration,setAnimationDuration] = useState(2000)
  useEffect(() => {
    // console.log('Splash Screen Call');
    getLogInHandlerCxt();
    getTimeTableHandlerCxt();
    getMakeupClassesHandlerCxt();
    getAnnouncementHandlerCxt();
    getComplaintHandlerCxt();
    getNotificationsHandlerCxt();
    const getData = async () => {
      console.log('Hey');
      try {
        const jsonValue = await AsyncStorage.getItem('my-key');
        // console.log("jsonValue  : ",jsonValue);

        return jsonValue != null ? JSON.parse(jsonValue) : null;
        //  console.log("jsonValue  : ",jsonValue);
      } catch (e) {
        // error reading value
      }
    };

    setTimeout(() => {
      getData().then(val => {
        // console.log('SplashScreen Val : ', val);
        setRefresh(false);
        if (val === null) {
          navigation.navigate('Login');
        } else if (val.Email.includes('@cs.uol.edu.pk')) {
          navigation.navigate('TeacherBottomTab');
        } else if (val.Email.includes('@student.uol.edu.pk')) {
          navigation.navigate('StudentBottomTab');
        } else if (val.Email.includes('@admin.uol.edu.pk')) {
          navigation.navigate('AdminBottomTab');
        } else {
          // Handle other cases or provide a default navigation
        }
      });
    }, 4000);
  }, [isFocused]);
  useEffect(() => {
    navigation.setOptions({
      // headerTitle:""
      headerShown: false,
    });

    // Animation duration

    const animationDuration = 4000; // Total duration for one blink cycle
    const fadeInDuration = animationDuration * 0.4; // Duration for fading in
    const fadeOutDuration = animationDuration * 0.6; // Duration for fading out

    const blinkAnimation = () => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: fadeInDuration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: fadeOutDuration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start(blinkAnimation);
    };

    blinkAnimation();

    // Hide splash screen after animation
    // setTimeout(() => {
    //   // SplashScreen.hide();
    // }, animationDuration);
  }, []);

  return (
    <Animated.View style={[styles.container, {opacity}]}>
      {/* Your splash screen content */}
      <Image
        source={require('../../Asset/Icon/logo.png')}
        style={styles.image}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Background color of splash screen
  },
  image: {
    width: '50%', // Adjust according to your image size
    height: '50%', // Adjust according to your image size
    resizeMode: 'contain',
  },
});

export default SplashScreen;
