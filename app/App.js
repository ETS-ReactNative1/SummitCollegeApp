import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
//import Icon from 'react-native-ionicons';

import HomeScreen from './screens/HomeScreen';
import DemoStudentsScreen from './screens/DemoStudentsScreen';
import SettingsScreen from './screens/SettingsScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import SplashScreen from './screens/SplashScreen';

const Tab = createBottomTabNavigator();
const Auth = createStackNavigator();

export default function App() {
  const [currentUser, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  return (
    <>
      {isLoading && <SplashScreen />}
      {!isLoading && (
        <NavigationContainer>
          {currentUser && (
            <Tab.Navigator
              screenOptions={({route}) => ({
                // tabBarIcon: ({focused, color, size}) => {
                //   let iconName;
                //   if (route.name === 'Home') {
                //     iconName = focused
                //       ? 'ios-add'
                //       : 'ios-information-circle-outline';
                //   } else if (route.name === 'Settings') {
                //     iconName = focused ? 'ios-list-box' : 'ios-list';
                //   }
                //   // You can return any component that you like here!
                //   return <Icon name={iconName} size={size} color={color} />;
                // },
              })}
              tabBarOptions={{
                labelStyle: {fontSize: 13},
                activeTintColor: '#00a8ff',
                inactiveTintColor: 'gray',
              }}>
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Students" component={DemoStudentsScreen} />
              <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
          )}
          {!currentUser && (
            <Auth.Navigator screenOptions={{headerShown: false}}>
              <Auth.Screen name="Sign Up" component={SignUpScreen} />
              <Auth.Screen name="Login" component={LoginScreen} />
              <Auth.Screen
                name="Forgot Password"
                component={ForgotPasswordScreen}
              />
            </Auth.Navigator>
          )}
        </NavigationContainer>
      )}
    </>
  );
}
