// Gigara Hettige
import React, { Component } from 'react';
import { View, Text,TextInput, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import {getEvent} from '../functions/nlpGetEvent';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userText:"",
      isLoading: false
    };
  }

  // calling nlp method
  getnlp(text) {
    // showing the loading status
    this.setState({
          isLoading: true,
        });
    Promise.all([getEvent(text)]).then(([event]) => {

      this.setState({
        isLoading: false,
        dataSource: event
      });
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
        onSubmitEditing={ (e) => this.getnlp(this.state.userText) }
        value={this.state.userText.text}
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