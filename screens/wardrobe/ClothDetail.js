import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { FlatList, TouchableOpacity, View, Text, Image, ScrollView } from 'react-native';
import {
  RkCard,
  RkText,
  RkStyleSheet,
  RkButton
} from 'react-native-ui-kitten';
import { Avatar } from '../../components/Avatar';
import { SocialThreeBar } from '../../components/SocialThreeBar';
import TimeAgo from 'react-native-timeago';
import { Ionicons } from '@expo/vector-icons';
import {FontAwesome} from '../../assets/icons';
import { width, height, totalSize } from 'react-native-dimension';
import { threeImageWidth } from '../../utils/scale';


class ClothDetail extends Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerLeft: (
      <RkButton
        rkType='clear'
        style={styles.menu}
        onPress={() => {
          navigation.goBack()
        }}>
        <RkText rkType='awesome hero'>{FontAwesome.chevronLeft}</RkText>
      </RkButton>
    ),
    headerStyle: {height: 50},
    headerRight: (
      <Ionicons name="md-more" style={{marginRight: 14}} size={27} color="black"/>
    ),
    title: !_.isNil(screenProps.clothDetail) ? `${screenProps.clothDetail.user.username}'s Style`: ''
  });

  componentWillMount() {
    const { id } = this.props.navigation.state.params;
    const { token, hType} = this.props;
    this.props.fetchClothDetail(token, hType, id);
  }

  // categories, comment_count,
  //   comments, content, gender, id,
  //   like_count, liked, location, outfit_img,
  //   publish, tagged_clothes, updated, user

  _renderComments = (comments) => {
    let result = comments.map(( obj, index ) => {
      return (<Text key={index}><Text style={{fontWeight: 'bold'}}>{obj.user.username}</Text> {obj.content}</Text>);
    });

    return result;
  }

  _handleCommentPress = () => {
    const { id } = this.props.navigation.state.params;
    this.props.navigation.navigate('Comments', {id, postType: 1});
  }

  _renderAvatar = (uri) => {
    if(_.isNil(uri)) {
      return (<Avatar rkType='circle' style={styles.avatar} img={require('../../assets/images/robot-dev.png')}/>)
    }
    return (
      <Avatar rkType='circle' style={styles.avatar} img={{uri}}/>
    );
  }

  _handleImagePress = (id) => {
    this.props.navigation.navigate('ClothDetail', {id})
  }

  _renderOutfitItem = ({item}) => {
    if(!_.isNil(item.cloth_image)) {
      return (
        <TouchableWithoutFeedback
          onPress={() => this._handleImagePress(item.id)}>
          <Image
            key={item.id}
            source={{uri: item.cloth_image}}
            style={styles.rowImage}
            resizeMode="cover"
          />
        </TouchableWithoutFeedback>
      );
    }
    return (
      <TouchableWithoutFeedback
        onPress={() => this._handleImagePress(item.id)}>
        <Image
          key={item.id}
          source={require('../../assets/images/robot-dev.png')}
          style={styles.rowImage}
          resizeMode="cover"
        />
      </TouchableWithoutFeedback>
    );
  }

  _keyExtractor = (item, index) => item.id;


  render () {
    const detail = this.props.clothDetail;
    if(detail) {
      return (
        <ScrollView style={styles.root}>
          <RkCard rkType='article'>
            <Image
              style={styles.clothImage}
              resizeMode="cover"
              source={{uri: detail.cloth_image}} />
            <View rkCardContent>
              <SocialThreeBar />
            </View>
            <View rkCardContent>
              <View>
                <View>
                  <Text style={{fontWeight: 'bold'}}>좋아요 {detail.like_count.toString()}개</Text>
                </View>
                <View style={{marginTop: 5}}>
                  <Text><Text style={{fontWeight: 'bold'}}>{detail.user.username}</Text> {detail.content}</Text>
                </View>
                <View style={{marginTop: 5}}>
                  <RkText
                    onPress={this._handleCommentPress}
                    rkType='secondary2 hintColor'>댓글{detail.comment_count.toString()}개 모두보기</RkText>
                    {this._renderComments(detail.comments)}
                  <RkText style={{marginTop: 8}} rkType='secondary4 hintColor'>
                    <TimeAgo time={detail.publish}/>
                  </RkText>
                </View>
              </View>
            </View>
            <View>
              <View style={styles.headContainer}>
                <RkText rkType="header4">작성자</RkText>
              </View>
              <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {id: userId})}>
                  {this._renderAvatar(detail.user.image)}
                </TouchableOpacity>
                <View style={styles.content}>
                  <View style={styles.contentHeader}>
                    <RkText rkType='header5'>{detail.user.username}</RkText>
                    <RkText rkType='header5' style={{color: 'blue'}}>팔로우하기</RkText>
                  </View>
                </View>
              </View>
            </View>

            <View>
              <View style={styles.headContainer}>
                <RkText rkType="header4">태그된 스타일 (2)</RkText>
              </View>
              <FlatList
                style={{marginTop:8}}
                data={this.props.clothDetail.tagged_clothes}
                renderItem={this._renderClothesItem}
                keyExtractor={this._keyExtractor}
                numColumns={3}
              />
            </View>
            <View>
              <View style={styles.headContainer}>
                <RkText rkType="header4">Detail</RkText>
              </View>
              <TouchableOpacity style={[styles.dContainer, styles.row]}>
                <RkText rkType="primary3">Type</RkText><RkText rkType="primary2">T-Shirt</RkText>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.dContainer, styles.row]}>
                <RkText rkType="primary3">Seasons</RkText><RkText rkType="primary2">Fall, Spring</RkText>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.dContainer, styles.row]}>
                <RkText rkType="primary3">Gender</RkText><RkText rkType="primary2">Unisex</RkText>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.dContainer, styles.row]}>
                <RkText rkType="primary3">Size</RkText><RkText rkType="primary2">M(95)</RkText>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.dContainer, styles.row]}>
                <RkText rkType="primary3">Color</RkText><RkText rkType="primary2">#f64e59</RkText>
              </TouchableOpacity>
              <View style={[styles.dContainer, styles.row]}>
                <RkText rkType="primary3">Brand</RkText><RkText rkType="primary2">Nike</RkText>
              </View>
              <View style={[styles.dContainer, styles.row]}>
                <RkText rkType="primary3">Location</RkText><RkText rkType="primary2">USA</RkText>
              </View>
              <View style={[styles.dContainer, styles.row]}>
                <RkText rkType="primary3">Link</RkText><RkText rkType="primary2">www.naver.com</RkText>
              </View>
              <View style={[styles.dContainer, styles.lastrow]}>
                <RkText rkType="primary3">In wardrobe</RkText>
                <RkText rkType="primary2">Yes</RkText>
              </View>
            </View>
          </RkCard>
        </ScrollView>
      );
    }
    return (<View><Text>Loading</Text></View>);


  }
}

function mapStateToProps({auth: {token, hType}, wardrobe: {clothDetail}}) {
  return { token, hType, clothDetail }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  title: {
    marginBottom: 5
  },
  menu: {
    width: 50
  },
  clothImage: {
    width: width(100),
    height: width(100)
  },
  rowImage:{
    width: threeImageWidth,
    height: threeImageWidth,
    marginRight: 2,
    marginTop: 2
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },

  content: {
    marginLeft: 16,
    flex: 1,
  },
  dContainer: {
    padding: 10
  },
  headContainer: {
    padding: 10,
    backgroundColor: '#f5f5f8'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 0,
    paddingLeft:20
  },
  lastrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft:20
  }
}));

export default connect(mapStateToProps, actions)(ClothDetail);
