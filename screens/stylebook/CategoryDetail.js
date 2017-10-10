import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { Fab, Icon, Button, H1 } from 'native-base';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class CategoryDetail extends Component {

  componentWillMount() {
    const { id } = this.props.navigation.state.params;
    const { token, hType } = this.props;
    this.props.fetchCategoryDetail(token, hType, id);
  }

  _keyExtractor = (item, index) => item.id;

  _handleImagePress = (id) => {
    this.props.navigation.navigate('OutfitDetail', {id});
  }

  _renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => this._handleImagePress(item.id)}>
        <Image
          key={item.id}
          source={{uri: item.outfit_img}}
          style={styles.rowImage}
          resizeMode="cover"
        />
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const detail = this.props.categoryDetail;

    if(detail) {
      return (
        <View style={{ flex:1 }}>
          <View><H1>{detail.name}</H1></View>
          <ScrollView automaticallyAdjustContentInsets={false}>
            <FlatList
              data={detail.outfits}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
              numColumns={3}
            />
          </ScrollView>
        </View>
      );
    }
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
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

function mapStateToProps({auth: {token, hType}, outfit: {categoryDetail}}) {
  return { token, hType, categoryDetail }
}

export default connect(mapStateToProps, actions)(CategoryDetail);
