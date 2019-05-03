/**
 * @Gigara
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, YellowBox, ActivityIndicator} from 'react-native';
import Theme, { createStyle } from 'react-native-theming';
import themes from './src/assets/theme/theme';

// Fireabase
import firebase from '@firebase/app';
import './src/Firebase';

// screens
import LoginNavigator from './src/navigation/LoginNavigator';

//navigator
import DrawerNavigator from './src/navigation/drawer';

type Props = {};

// disable warnings comes from plugin issues
YellowBox.ignoreWarnings(['componentWillUpdate']);
YellowBox.ignoreWarnings(['componentWillReceiveProps']);
YellowBox.ignoreWarnings(['componentWillMount']);
YellowBox.ignoreWarnings(['Setting a timer']);

export default class App extends Component<Props> {
   constructor(props) {
    super(props);
}

state = { loggedIn: null }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
    
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return <DrawerNavigator />;
        break;
        
      case false:
        return <LoginNavigator />;
        break;

      default: 
      return <Theme.View style={styles.Spinner}><ActivityIndicator  size="large" color="#0000ff"/></Theme.View>;
    }
  }
    render() {
      //firebase.auth().signOut();
      return (
        this.renderContent()
      );
    }
}


const styles = createStyle({

  Spinner: {
    flex: 1,
    opacity: 1,
    backgroundColor: '@backgroundColor',
    alignItems: 'center',
    justifyContent: 'center',

  }

});