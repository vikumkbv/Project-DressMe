import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Theme, { createStyle } from 'react-native-theming';
import themes from '../assets/theme/theme';
import ImageGrid from './ImageGrid';

export default class DiscoverScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ScrollView>
        <Theme.View style={styles.container}>
          <View style={{ borderBottomWidth: 1, backgroundColor: '#f7f7f8', borderColor: '#c8c7cc' }}>
            <Text style={{ alignSelf: 'center', marginTop: 10, marginBottom: 10, fontWeight: 'bold', fontSize: 16 }}>Trending Fashions</Text>
          </View>
          <View style={styles.GridContainer}>
            <ImageGrid event="trending" />
          </View>
        </Theme.View>
      </ScrollView>
    );
  }
}

const styles = createStyle({

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