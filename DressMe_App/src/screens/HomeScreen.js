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
      showTitle: false,
      showError: false,
      event: null,
    };
  }
  componentWillMount = async () => {
    try {
      // check theme
      const value = await AsyncStorage.getItem('@Dark-Theme');
      if (value != null) {
        if(value == 'false'){
          themes[0].apply();
        }else{
          themes[1].apply();
        }
      }     
        this.setState({ isLoading: true });
        // check skin color
        ; (async () => {                         
          const profilePicUrl = await AsyncStorage.getItem('@ProfilePic-Url');

          let age = await AsyncStorage.getItem('@Age');
          let gender = await AsyncStorage.getItem('@Gender');
          let clr = await AsyncStorage.getItem('@Skin-Color-Range');

          // get proPic from database
          var user = firebase.auth().currentUser;
          let itemsRef = firebase.database().ref('users/' + user.uid);

          itemsRef.on('value', (snapshot) => {
            let data = snapshot.val();
            if (data != null && ((data.proPicUrl != profilePicUrl) || (age == null) || (gender == null) || (clr == null))) {

              // get skin tone
              var encodedKey = encodeURIComponent('pic');
              var encodedValue = encodeURIComponent(data.proPicUrl);

              ; (async () => {
                await fetch("http://35.189.40.50:5000/result/", {
                  method: 'POST',
                  headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                  }),
                  body: encodedKey + "=" + encodedValue
                })
                  .then((response) => response.text())
                  .then((responseText) => {
                  
                    // get skin color range
                    fetch('http://35.189.40.50:5050/v1/' + responseText)
                      .then((response2) => response2.text())
                      .then((responseText2) => {
                           
                        var json = JSON.parse(responseText2)

                          ; (async () => {
                            // save to local
                            await AsyncStorage.setItem('@ProfilePic-Url', data.proPicUrl);
                            await AsyncStorage.setItem('@DOB', data.DOB);
                            await AsyncStorage.setItem('@Gender', data.gender);
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
              })()
                .catch((error) => {
                  
                });
            }else if(profilePicUrl != null){
              this.setState({ isLoading: false });
            }
          })
        })();

    } catch (e) {
      console.warn(e);
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
        event: event[0].keyPhrases[0],
      }, () => {
        this.getColor();
      });
    });
  }

  getColor = async () =>  {
    let gender =1;
    if(await AsyncStorage.getItem('@Gender') == "Male"){
       gender = 0;
    }
    const skinColor = await AsyncStorage.getItem('@Skin-Color-Range');

    //Age
    let age = await AsyncStorage.getItem('@Age');
    if(age <20){
      age =1;
    }else if(age < 35){
      age =2;
    }else{
      age =3;
    }

    let occassion = this.state.event;
    if(occassion.toLowerCase() == "dinner"){
      occassion =3;
    }else if (occassion.toLowerCase() == "night party"){
      occassion =2;
    }else if (occassion.toLowerCase() == "b'day party" || occassion.toLowerCase() == "birthday"
       || occassion.toLowerCase() == "birthday party" || occassion.toLowerCase() == "bday" || occassion.toLowerCase() == "Bday"){
      occassion = 1;
    }

    fetch('http://35.189.40.50:8080/api?gender=' + gender + '&skin_color=' + skinColor + '&occassion=' + occassion + '&age=' + age)
      .then((response) => response.text())
      .then((responseText) => {
        if (responseText.includes("<!")) {
          this.setState(
            {
              isLoading: false,
              showError: true,
            });
        } else {
        this.setState(
          {
            color: responseText,
            colorLink: 'color/' + responseText,
            showTitle: true,
            showError: false,
            isLoading: false,
          });
      }
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
        <ScrollView>
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

          {(this.state.showTitle) &&
            <View style={{ borderBottomWidth: 1, backgroundColor: '#f7f7f8', borderColor: '#c8c7cc' }}>
              <Text style={{ alignSelf: 'center', marginTop: 10, marginBottom: 10, fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
                The most prefered Color for your {this.state.event} is {"\n"}
                {this.state.color}</Text>
            </View>
          }

          {(this.state.showError) &&
            <View style={{ borderBottomWidth: 1, backgroundColor: '#f7f7f8', borderColor: '#c8c7cc', paddingLeft:10, paddingRight:10 }}>
              <Text style={{ alignSelf: 'center', marginTop: 10, marginBottom: 10, fontWeight: 'bold', fontSize: 16, textAlign: 'center', color: 'red' }}>
                Some Error occured. This can be happen because of the occassion you are trying to find is currently not available.
              </Text>
            </View>
          }
          <View style={styles.GridContainer}>
            <ImageGrid event={this.state.colorLink} />
          </View>
        </ScrollView>
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
    color: '#777',
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