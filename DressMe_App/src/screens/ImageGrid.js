import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
} from 'react-native';

export default class ImageGrid extends Component {
  constructor(props) {
    super();
    this.state = {
      dataSource: {},
      event: props.event,
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      event: nextProps.event,
    })
  }

  componentDidMount() {

    var that = this;
    let items = Array.apply(null, Array(12)).map((v, i) => {
      return { id: i, src: 'http://placehold.it/200x200?text=' + this.state.event + (i + 1) };
    });
    that.setState({
      //Setting the data source
      dataSource: items,
    });
  }
  render() {
    if(this.state.event == null){
      return(null)
    }
    return (
      <View >
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
              <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
            </View>
          )}
          //Setting the number of column
          numColumns={3}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});
