// Gigara Hettige
import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator, ScrollView, AsyncStorage } from 'react-native';
import { getEvent } from '../functions/nlpGetEvent';
import ImageGrid from './ImageGrid';
import Theme, { createStyle } from 'react-native-theming';
import themes from '../assets/theme/theme';

import firebase from '@firebase/app';
import '../Firebase';
import 'firebase/auth';
import 'firebase/database';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userText: "",
      isLoading: false,
      showModal: false,
      event: null,
    };
  }
  componentWillMount = async () => {
    try {
      // check theme
      const value = await AsyncStorage.getItem('@Dark-Theme');
      if (value !== null) {
        if(value == 'false'){
          themes[0].apply();
        }else{
          themes[1].apply();
        }

        this.setState({ isLoading: true });
        // check skin color
        ; (async () => {
          const profilePicUrl = await AsyncStorage.getItem('@ProfilePic-Url');

          // get proPic from database
          var user = firebase.auth().currentUser;
          let itemsRef = firebase.database().ref('users/' + user.uid);

          itemsRef.on('value', (snapshot) => {
            let data = snapshot.val();
            if (data.proPicUrl != profilePicUrl) {

              // get skin tone
              var encodedKey = encodeURIComponent('pic');
              var encodedValue = encodeURIComponent(profilePicUrl);

              fetch("http://35.189.40.50:5000/result/", {
                method: 'POST',
                headers: new Headers({
                  'Content-Type': 'application/x-www-form-urlencoded',
                }),
                body: encodedKey + "=" + encodedValue
              })
                .then((response) => response.text())
                .then((responseText) => {
                  // get skin color range
                  fetch('http://35.189.40.50:5050/v1/CEB0A0')
                    .then((response2) => response2.text())
                    .then((responseText2) => {
                      var json = JSON.parse(responseText2)

                        ; (async () => {
                          // save to local
                          await AsyncStorage.setItem('@ProfilePic-Url', data.proPicUrl);
                          await AsyncStorage.setItem('@DOB', data.DOB);
                          await AsyncStorage.setItem('@Skin-Color', responseText);
                          await AsyncStorage.setItem('@Skin-Color-Range', json.colors[0].name);
                          // calculate age
                          var today = new Date();
                          const age = today.getFullYear() - ((data.DOB).split('-')[0]);
                          // consloe.warn(age);
                          await AsyncStorage.setItem('@Age', JSON.stringify(age));

                          this.setState({ isLoading: false });
                        })();
                    })
                })
                .catch((error) => {
                  console.warn(error);
                });
            }else{
              this.setState({ isLoading: false });
            }
          })
        })();

        
      }
    } catch (error) {
    }
  };

  // calling nlp method
  getnlp(text) {
    // showing the loading status
    this.setState({
      isLoading: true,
    });
    Promise.all([getEvent(text)]).then(([event]) => {

      this.setState({
        isLoading: false,
        event: event[0].keyPhrases[0],
      });
    });
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <Theme.View style={styles.container}>
        <Text></Text>

        <TextInput
          onSubmitEditing={(e) => this.getnlp(this.state.userText)}
          value={this.state.userText.text}
          onChangeText={(text) => this.setState({ userText: { text } })}
          label="email"
          placeholder="What's your focus today? "
          placeholderTextColor='#999'
          style={styles.input}
          returnKeyType={"done"}
        />

        <View style={styles.GridContainer}>
          <ImageGrid event={this.state.event} />
        </View>
      </Theme.View>
    );
  }
}

const styles = createStyle({
  input: {
    fontSize: 18,
    padding: 10,
    paddingLeft: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderBottomColor: '#757575',
    borderBottomWidth: 1,
  },

  GridContainer: {
    justifyContent: 'center',
    padding: 10,
    marginTop: 20,
  },

  container: {
    flex:1,
    backgroundColor: '@backgroundColor',
  }

})