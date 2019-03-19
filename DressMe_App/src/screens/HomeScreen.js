// Gigara Hettige
import React, { Component } from 'react';
import { View, Text,TextInput, StyleSheet, FlatList, ActivityIndicator } from 'react-native';


export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

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