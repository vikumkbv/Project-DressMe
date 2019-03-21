// Gigara Hettige
import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { getEvent } from '../functions/nlpGetEvent';
import ImageGrid from './ImageGrid';

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
      <ScrollView style={styles.container}>
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
  }

})