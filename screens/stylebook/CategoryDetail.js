import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { Fab, Icon, Button, H1 } from 'native-base';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { NavBar } from '../../components/navBar';
import {withRkTheme} from 'react-native-ui-kitten';
import { SocialBar } from '../../components/SocialBar';
import {
  RkCard,
  RkText,
  RkStyleSheet
} from 'react-native-ui-kitten';
import { Avatar } from '../../components/Avatar';

let ThemedNavigationBar = withRkTheme(NavBar);

class CategoryDetail extends Component {
  static navigationOptions = ({navigation}) => ({
    header: (headerProps) => {
      return <ThemedNavigationBar navigation={navigation} headerProps={headerProps}/>
    },
  })

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
        <ScrollView style={styles.root} automaticallyAdjustContentInsets={false}>
          <RkCard>
            <View rkCardContent style={styles.cardContent}>
              <RkText rkType='h2'>{detail.name}</RkText>
              <RkText rkType='h5' style={styles.marginName}>생성자: {detail.owner.username}</RkText>
              <RkText rkType='secondary2 hintColor bigLine'>패션디자인{detail.detail}</RkText>
            </View>

            <View rkCardContent><RkText rkType='secondary2'>`아웃핏 {detail.outfit_count}개`</RkText></View>
          </RkCard>
            <FlatList
              data={detail.outfits}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
              numColumns={3}
            />
        </ScrollView>
      );
    }
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    flex:1,
    backgroundColor: theme.colors.screen.base
  },
  title: {
    marginBottom: 5
  },
  viewRow:{
    flexDirection:'row',
  },
  rowImage:{
    width:width(33),
    height:width(33),
    borderWidth:.5,
    borderColor:'#fff'
  },
  cardContent: {
    backgroundColor: theme.colors.categoryContent
  },
  marginName: {
    marginTop: 3,
    marginBottom: 5
  }
}));

function mapStateToProps({auth: {token, hType}, outfit: {categoryDetail}}) {
  return { token, hType, categoryDetail }
}

export default connect(mapStateToProps, actions)(CategoryDetail);
