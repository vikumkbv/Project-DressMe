/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,} from 'react-native';

// Fireabase
import firebase from '@firebase/app';
import './src/Firebase';

// screens
import Login from './src/screens/Login';
import Dashboard from './src/screens/dashboard';
import {Spinner} from './src/screens/Spinner';

type Props = {};

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
        return <Dashboard />;
        break;
        
      case false:
        return <Login />;
        break;

      default: 
      return <View style={styles.Spinner}><Spinner /></View>;

    }
  }
    render() {
      //firebase.auth().signOut();
      return (
        this.renderContent()
      );
    }
}


const styles = StyleSheet.create({

  Spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  }

});