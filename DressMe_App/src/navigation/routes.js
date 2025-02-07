import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import ImageGrid from '../screens/ImageGrid';


const AppNavigator = createMaterialTopTabNavigator({
    Home: HomeScreen,
    Discover: DiscoverScreen
})

export default AppNavigator