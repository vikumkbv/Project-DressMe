// Gigara Hettige
import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator, ScrollView, AsyncStorage } from 'react-native';
import { getEvent } from '../functions/nlpGetEvent';
import ImageGrid from './ImageGrid';
import Theme, { createStyle } from 'react-native-theming';
import themes from '../assets/theme/theme';

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
      const value = await AsyncStorage.getItem('@Dark-Theme');
      if (value !== null) {
        if(value == 'false'){
          themes[0].apply();
        }else{
          themes[1].apply();
        }
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