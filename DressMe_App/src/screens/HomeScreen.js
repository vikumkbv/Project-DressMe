// Gigara Hettige
import React, { Component } from 'react';
import { View, Text,TextInput, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import {test} from '../functions/nlpGetEvent';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userText:"",
      isLoading: false
    };
  }
  getEvent(text){
    this.setState({
      isLoading: true,
    });

    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        "documents": [
          {
            "language": "en",
            "id": "1",
            "text": text.text
          }
        ]
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key':'f22d5583570246c8a42dc169935b2780'
      }
    }
    return fetch('https://centralus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases',data)
      .then((response) => response.json())
      .then((responseJson) => {
        
        this.setState({
          isLoading: false,
          dataSource: responseJson.documents,
        }, function(){

        });

      })
      .catch((error) =>{
        console.warn(error);
      });
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
      <View>
        <Text></Text>

        <TextInput
        onSubmitEditing={ (e) => this.getEvent(this.state.userText) }
        //value={this.state.userText}
        onChangeText={ (text) => this.setState({userText:{text}})}
        label="email"
        placeholder="What's your focus today? " 
        placeholderTextColor='#999'
        style={styles.input}
        returnKeyType={"done"}
        />

        <FlatList
        data={this.state.dataSource}
        renderItem={({item}) => <Text>{item.keyPhrases}</Text>}
        keyExtractor={({id}, index) => id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input:{
    fontSize:18,
    padding: 10,
    paddingLeft: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderBottomColor: '#757575',
    borderBottomWidth: 1,
  }
})