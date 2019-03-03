import React, { Component } from 'react';
import { View, Text, StyleSheet,CameraRoll, ScrollView } from 'react-native';
import { createAppContainer } from 'react-navigation';

import AppNavigator from '../navigation/routes';

// icons
import Icon from 'react-native-vector-icons/Ionicons';

const AppIndex = createAppContainer(AppNavigator)

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _handleButtonPress = () => {
    CameraRoll.getPhotos({ first: 1000000 })
        .then(res => {
          console.warn(res, "images data")
        })
    };

  render() {
    return (
      <View style={{ flex: 1}}>
        <View style={styles.header}>
          <Icon.Button name='ios-camera' backgroundColor="#444" size={48} color='white' onPress={this._handleButtonPress}/>
          <View style={styles.logo}>
            <Text style={{color:'white', fontSize: 22}}>DressMe</Text>
          </View>
        </View>
        <AppIndex/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#444',
  },
  wrapper : {
    flex: 1,
  },
  logo:{
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})