import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {ColorShade} from '../../Asset/CSS_COLOR';
import HomeScreen_std from '../screen/HomeScreen_std';
import ProfileScreen_std from '../screen/ProfileScreen_std';
import ScheduleScreen from '../screen/ScheduleScreen';

const Tab = createBottomTabNavigator();

const StudentBottomTab = () => {
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
        tabBarActiveTintColor: ColorShade.borderColor,
        tabBarStyle: [
          {
            backgroundColor: '#ffff',
          },
        ],

        tabBarIcon: ({color, size}) => {
          let iconName;

          switch (route.name) {
            case 'Home_std':
              iconName = 'home';
              break;
            case 'Profile_std':
              iconName = 'supervised-user-circle';
              break;
            case 'Schedule_std':
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
          color: '#000',
        },
      })}>
      <Tab.Screen
        name="Home_std"
        component={HomeScreen_std} // student home screen sy ara
        options={{
          tabBarLabel: 'Home',
        }}
      />

      <Tab.Screen
        name="Schedule_std"
        component={ScheduleScreen}  // schedule screen sy ara
        options={{
          tabBarLabel: 'Schedule',
        }}
      />
      <Tab.Screen
        name="Profile_std"
        component={ProfileScreen_std} // profile screen sya ara
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default StudentBottomTab;
