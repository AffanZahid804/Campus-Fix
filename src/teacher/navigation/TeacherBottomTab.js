import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {ColorShade} from '../../Asset/CSS_COLOR';
import HomeScreen_tr from '../screen/HomeScreen_tr';
import ProfileScreen_tr from '../screen/ProfileScreen_tr';
import ScheduleScreen_tr from '../screen/ScheduleScreen_tr';

const Tab = createBottomTabNavigator();

const TeacherBottomTab = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarActiveTintColor: ColorShade.header,
        tabBarStyle: [
          {
            backgroundColor: '#ffff',
          },
        ],

        tabBarIcon: ({color, size}) => {
          let iconName;

          switch (route.name) {
            case 'Home_tr':
              iconName = 'home';
              break;
            case 'Profile_tr':
              iconName = 'supervised-user-circle';
              break;
            case 'Schedule_tr':
              iconName = 'calendar-month';
              break;

            default:
              iconName = 'home';
          }

          return <MaterialIcons name={iconName} color={color} size={size} />;
        },
        tabBarLabelStyle: {
          fontSize: 14, // Set the font size to 20
          fontWeight: 'bold',
        },
      })}>
      <Tab.Screen
        name="Home_tr"
        component={HomeScreen_tr}
        options={{
          tabBarLabel: 'Home',
        }}
      />

      <Tab.Screen
        name="Schedule_tr"
        component={ScheduleScreen_tr}
        options={{
          tabBarLabel: 'Schedule',
        }}
      />
      <Tab.Screen
        name="Profile_tr"
        component={ProfileScreen_tr}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default TeacherBottomTab;
