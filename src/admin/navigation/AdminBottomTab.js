import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {ColorShade} from '../../Asset/CSS_COLOR';
import HomeScreen_admin from '../screen/HomeScreen_admin';
import AnnouncementScreen_admin from '../screen/AnnouncementScreen_admin';
import MenuScreen_admin from '../screen/MenuScreen_admin';
import AdminSectionScreen_admin from '../screen/AdminSectionScreen_admin';

const Tab = createBottomTabNavigator();

const AdminBottomTab = () => {
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
            case 'Home_admin':
              iconName = 'home';
              break;
            case 'AdminSection_admin':
              iconName = 'person-add-alt-1';
              break;
            case 'Announcement_admin':
              iconName = 'supervised-user-circle';
              break;
            case 'Menu_admin':
              iconName = 'menu';
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
        name="Home_admin"
        component={HomeScreen_admin}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="AdminSection_admin"
        component={AdminSectionScreen_admin}
        options={{
          tabBarLabel: 'AdminSection',
        }}
      />

      <Tab.Screen
        name="Announcement_admin"
        component={AnnouncementScreen_admin}
        options={{
          tabBarLabel: 'Announcement',
        }}
      />
      <Tab.Screen
        name="Menu_admin"
        component={MenuScreen_admin}
        options={{
          tabBarLabel: 'Menu',
        }}
      />
    </Tab.Navigator>
  );
};

export default AdminBottomTab;
