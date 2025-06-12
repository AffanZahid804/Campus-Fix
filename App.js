// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignupScreen from './src/common/screen/SignupScreen';
import LoginScreen from './src/common/screen/LoginScreen';
import {AuthenticationProvider} from './src/common/Context/AuthenticationContext';
import HomeScreen_std from './src/student/screen/HomeScreen_std';
import HomeScreen_tr from './src/teacher/screen/HomeScreen_tr';
import DetailEventScreen_std from './src/student/screen/DetailEventScreen_std';
import ProfileScreen_std from './src/student/screen/ProfileScreen_std';
import StudentBottomTab from './src/student/navigation/StudentBottomTab';
import ScheduleScreen from './src/student/screen/ScheduleScreen';
import TestScreen from './src/student/screen/TestScreen_std';
import TimeTableScreen_std from './src/student/screen/TimeTableScreen_std';
import HomeScreen_admin from './src/admin/screen/HomeScreen_admin';
import AnnouncementScreen_admin from './src/admin/screen/AnnouncementScreen_admin';
import AdminBottomTab from './src/admin/navigation/AdminBottomTab';
import SemesterScheduleScreen_admin from './src/admin/screen/SemesterScheduleScreen_admin';
import {AnnouncementProvider} from './src/common/Context/AnnouncementContext';
import TeacherBottomTab from './src/teacher/navigation/TeacherBottomTab';
import TimeTableScreen_tr from './src/teacher/screen/TimeTableScreen_tr';
import ProfileScreen_tr from './src/teacher/screen/ProfileScreen_tr';
import DetailEventScreen_tr from './src/teacher/screen/DetailEventScreen_tr';
import {TimeTableProvider} from './src/common/Context/TimeTableContext';
import SplashScreen from './src/common/screen/SplashScreen';
import MakupClassScreen_tr from './src/teacher/screen/MakupClassScreen_tr';
import {MakeupClassProvider} from './src/common/Context/MakeupClassContext';
import AdminSectionScreen_admin from './src/admin/screen/AdminSectionScreen_admin';
import MakeupScheduleScreen from './src/common/screen/MakeupScheduleScreen';
import ComplaintScreen_tr from './src/teacher/screen/ComplaintScreen_tr';
import {ComplaintProvider} from './src/common/Context/ComplaintContext';
import ExamScreen_admin from './src/admin/screen/ExamScreen_admin';
import messaging from '@react-native-firebase/messaging';
import {NotificationProvider} from './src/common/Context/NotificationContext';
import NotificationScreen_admin from './src/admin/screen/NotificationScreen_admin';
import HelpSupportScreen from './src/common/screen/HelpSupportScreen';
import AboutScreen from './src/common/screen/AboutScreen';
import PrivacyScreen from './src/common/screen/PrivacyScreen';

const Stack = createNativeStackNavigator();

function App() {
  React.useEffect(() => {
    // async function fetchData() {
    //   const response = await MyAPI.getData(someId);
    //   // ... your code that uses the response
    // }

    async function requestUserPermission() {
      const authorizationStatus = await messaging().requestPermission();

      if (authorizationStatus) {
        console.log('Permission status:', authorizationStatus);
      }
      if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        console.log('User has notification permissions enabled.');
      } else if (
        authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        console.log('User has provisional notification permissions.');
      } else {
        console.log('User has notification permissions disabled');
      }
    }

    async function init() {
      const a = await messaging().requestPermission({
        provisional: true,
      });

      const b = await messaging().requestPermission({
        providesAppNotificationSettings: true,
      });

      // await fetchData(); // Call fetchData and wait for it to complete

      requestUserPermission();
    }

    init(); // Call the init function immediately
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="MakeupSchedule" component={MakeupScheduleScreen} />
        <Stack.Screen name="StudentBottomTab" component={StudentBottomTab} />
        <Stack.Screen name="Home_std" component={HomeScreen_std} />

        <Stack.Screen
          name="DetailEvent_std"
          component={DetailEventScreen_std}
        />
        <Stack.Screen name="Profile_std" component={ProfileScreen_std} />
        <Stack.Screen name="TimeTable_std" component={TimeTableScreen_std} />

        <Stack.Screen name="TeacherBottomTab" component={TeacherBottomTab} />
        <Stack.Screen name="Schedule_tr" component={ScheduleScreen} />
        <Stack.Screen name="TimeTable_tr" component={TimeTableScreen_tr} />
        <Stack.Screen name="Profile_tr" component={ProfileScreen_tr} />
        <Stack.Screen name="DetailEvent_tr" component={DetailEventScreen_tr} />
        <Stack.Screen name="MakupClass_tr" component={MakupClassScreen_tr} />
        <Stack.Screen name="Complaint_tr" component={ComplaintScreen_tr} />
        <Stack.Screen name="Home_tr" component={HomeScreen_tr} />
        <Stack.Screen name="AdminBottomTab" component={AdminBottomTab} />
        <Stack.Screen name="Home_admin" component={HomeScreen_admin} />
        <Stack.Screen name="Exam_admin" component={ExamScreen_admin} />
        <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Privacy" component={PrivacyScreen} />
        <Stack.Screen
          name="Notification_admin"
          component={NotificationScreen_admin}
        />
        <Stack.Screen
          name="AdminSection_admin"
          component={AdminSectionScreen_admin}
        />
        <Stack.Screen
          name="Announcement_admin"
          component={AnnouncementScreen_admin}
        />
        <Stack.Screen
          name="SemesterSchedule_admin"
          component={SemesterScheduleScreen_admin}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <NotificationProvider>
      <ComplaintProvider>
        <MakeupClassProvider>
          <TimeTableProvider>
            <AnnouncementProvider>
              <AuthenticationProvider>
                <App />
              </AuthenticationProvider>
            </AnnouncementProvider>
          </TimeTableProvider>
        </MakeupClassProvider>
      </ComplaintProvider>
    </NotificationProvider>
  );
};
