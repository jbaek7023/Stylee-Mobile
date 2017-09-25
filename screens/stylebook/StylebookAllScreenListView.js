import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Button } from 'native-base';
import { width, height, totalSize } from 'react-native-dimension';

class StylebookAllListScreen extends Component {
  static navigationOptions = {
  //  title:'All'
  }

  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(this.props.libraries);
  }

  renderRow(libtary) {
    return <ListItem library={library} />;
  }

  render() {
    return (
      <ListView
        dataSource={this.dataSrouce}
        renderRow={this.renderRow}
      />
    )
  }
}

const styles = StyleSheet.create({
  viewRow:{
      flexDirection:'row',
    },
    rowImage:{
      width:width(33),
      height:width(33),
      borderWidth:.5,
      borderColor:'#fff'
    }
});

// var width = Dimensions.get('window').width;

export default StylebookAllScreen;
