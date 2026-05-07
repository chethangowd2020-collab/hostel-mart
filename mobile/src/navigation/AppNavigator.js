import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, ShoppingBag, User, Heart } from 'lucide-react-native';
import { COLORS } from '../theme/theme';

import LoginScreen from '../screens/LoginScreen';
import VerifyOTPScreen from '../screens/VerifyOTPScreen';
import RegisterStudentScreen from '../screens/RegisterStudentScreen';
import HomeScreen from '../screens/Student/HomeScreen';
import GroupCartScreen from '../screens/Student/GroupCartScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StudentTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') return <Home size={size} color={color} />;
          if (route.name === 'Orders') return <ShoppingBag size={size} color={color} />;
          if (route.name === 'Wishlist') return <Heart size={size} color={color} />;
          if (route.name === 'Profile') return <User size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.secondary,
        tabBarInactiveTintColor: COLORS.grey,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Orders" component={HomeScreen} />
      <Tab.Screen name="Wishlist" component={HomeScreen} />
      <Tab.Screen name="Profile" component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
      <Stack.Screen name="RegisterStudent" component={RegisterStudentScreen} />
      <Stack.Screen name="MainTabs" component={StudentTabs} />
      <Stack.Screen name="GroupCart" component={GroupCartScreen} />
    </Stack.Navigator>
  );
}
