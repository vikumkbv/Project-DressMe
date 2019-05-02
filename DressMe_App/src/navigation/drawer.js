import React, { Component } from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import Dashboard from '../screens/dashboard';
import SettingsScreen from '../screens/settingsScreen';


const Drawer = createDrawerNavigator({
    Home: {
      screen: Dashboard,
    },
    Settings: {
      screen: SettingsScreen,
    },
  });
  
  const DrawerNavigator = createAppContainer(Drawer);
  export default DrawerNavigator;