import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { View, Text, ScrollView, TouchableOpacity, FlatList, TouchableWithoutFeedback, Image } from 'react-native';
import {
  RkCard,
  RkText,
  RkStyleSheet,
  RkButton,
} from 'react-native-ui-kitten';
import { Avatar } from '../../components/Avatar';
import { SocialBar } from '../../components/SocialBar';
import TimeAgo from 'react-native-timeago';
import {FontAwesome} from '../../assets/icons';
import { Dimensions } from 'react-native';
import { NavBar } from '../../components/navBar';
import {withRkTheme} from 'react-native-ui-kitten'
let ThemedNavigationBar = withRkTheme(NavBar);
import { Ionicons } from '@expo/vector-icons';
import { width, height, totalSize } from 'react-native-dimension';
import { threeImageWidth } from '../../utils/scale';

console.log(threeImageWidth);

class OutfitDetail extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Style',
    headerRight: (<Ionicons name="md-more" size={32} style={{ marginLeft: 5 }} color="white"/>),
    header: (headerProps) => {
      return <ThemedNavigationBar navigation={navigation} headerProps={headerProps}/>
    },
  });

  componentWillMount() {
    const { id } = this.props.navigation.state.params;
    const { token, hType} = this.props;
    this.props.fetchOutfitDetail(token, hType, id);
  }

  _renderComments = (comments) => {
    let result = comments.map(( obj, index ) => {
      return (<Text key={index}><Text style={{fontWeight: 'bold'}}>{obj.user.username}</Text> {obj.content}</Text>);
    });

    return result;
    // obj.id, obj.user.image, obj.user.id, obj.content, obj.publish, obj.updated, obj.reply_count
  }

  // categories, comment_count,
  //   comments, content, gender, id,
  //   like_count, liked, location, outfit_img,
  //   publish, tagged_clothes, updated, user

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

  _renderClothesItem = ({item}) => {
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
    const detail = this.props.outfitDetail;
    // User Access Not Yet
    if(detail) {
      return (
        <ScrollView style={styles.root}>
          <RkCard rkType='article'>
            <View style={styles.container}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {id: userId})}>
                {this._renderAvatar(detail.user.image)}
              </TouchableOpacity>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <RkText rkType='header5'>{detail.user.username}</RkText>
                  <RkButton>Follow</RkButton>
                </View>
              </View>
            </View>
            <Image
              style={styles.outfitImage}
              resizeMode="cover"
              source={{uri: detail.outfit_img}} />
            <View rkCardContent>
              <SocialBar/>
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
            <View style={{marginTop: 11}}>
              <RkText style={{marginLeft:14}}>태그된 옷 (3)</RkText>
              <FlatList
                style={{marginTop:8}}
                data={this.props.outfitDetail.tagged_clothes}
                renderItem={this._renderClothesItem}
                keyExtractor={this._keyExtractor}
                numColumns={3}
              />
            </View>
          </RkCard>
        </ScrollView>
      );
    }
    return (<View><Text>Loading</Text></View>);
  }
}

function mapStateToProps({auth: {token, hType}, outfit: {outfitDetail}}) {
  return { token, hType, outfitDetail}
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  title: {
    marginBottom: 5,
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  outfitImage: {
    width: width(100),
    height: width(100)
  },
  rowImage:{
    width: threeImageWidth,
    height: threeImageWidth,
    marginRight: 2,
    marginTop: 2
  }
}));

export default connect(mapStateToProps, actions)(OutfitDetail);
