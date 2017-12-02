import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList, TouchableWithoutFeedback, Image } from 'react-native';
import {
  RkCard,
  RkText,
  RkStyleSheet,
  RkButton,
} from 'react-native-ui-kitten';
import { Avatar } from '../../components/Avatar';
import SocialBar from '../../components/SocialBar';
import TimeAgo from 'react-native-timeago';
import {FontAwesome} from '../../assets/icons';

import { Ionicons } from '@expo/vector-icons';
import { width, height, totalSize } from 'react-native-dimension';
import { threeImageWidth } from '../../utils/scale';
import CategoryModal from '../../components/common/CategoryModal';
import Toast from 'react-native-simple-toast';

class OutfitDetail extends Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    header: null
  });

  state = {
    isCategoryVisible: false,
    isFollowing: false,
    liked: false,
    starred: false
  }

  componentWillMount() {
    const { id } = this.props.navigation.state.params;
    const { token, hType} = this.props;
    this.props.fetchOutfitDetail(token, hType, id);
  }

  componentWillReceiveProps(nextProps) {
    let isFollowing = nextProps.outfitDetail.is_following;
    let liked = nextProps.outfitDetail.liked;
    let starred = nextProps.outfitDetail.starred;
    let condition = (this.state.isFollowing!=isFollowing || this.state.liked!=liked || this.state.starred!=starred) ? true : false;
    if(condition) {
      this.setState({isFollowing, liked, starred});
    }
  }

  hideModal = () => this.setState({isCategoryVisible: false})
  showModal = () => this.setState({isCategoryVisible: true})

  _handleLikePress = (oid) => {
    let { token, hType } = this.props;
    this.setState({liked: true})
    this.props.likeOutfit(token, hType, oid)
  }

  _handleUnlikePress = (oid) => {
    let { token, hType } = this.props;
    this.setState({liked: false})
    this.props.unlikeOutfit(token, hType, oid)
  }

  _handleBookmarkPress = (oid) => {
    let { token, hType } = this.props;
    this.setState({starred: true})
    this.props.bookmarkOutfit(token, hType, oid)
  }

  _handleUnbookmarkPress = (oid) => {
    let { token, hType } = this.props;
    this.setState({starred: false})
    this.props.unbookmarkOutfit(token, hType, oid)
  }

  _renderComments = (comments) => {
    let result = comments.map(( obj, index ) => {
      return (<Text key={index}><Text style={{fontWeight: 'bold'}}>{obj.user.username}</Text> {obj.content}</Text>);
    });

    return result;
    // obj.id, obj.user.image, obj.user.id, obj.content, obj.publish, obj.updated, obj.reply_count
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

  _renderFollow = (isOwner, isFollowing, userPk) => {
    let { token, hType } = this.props;
    if(!isOwner) {
      // only if this is not owner
      if(this.state.isFollowing) {
        return (
          <TouchableOpacity
            onPress={()=>{
              this.props.unfollow(token, hType, userPk);
              this.setState({isFollowing:false});
            }}>
            <RkText rkType='header3' style={{color: 'black'}}>Following</RkText>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            onPress={()=>{
              this.props.follow(token, hType, userPk);
              this.setState({isFollowing:true});
            }}>
            <RkText rkType='header3' style={{color: 'blue'}}>Follow</RkText>
          </TouchableOpacity>
        )
      }
    } else {
      return <View />
    }
  }

  _renderHeader = (detail) => {
    return (
      <View style={styles.headerLayout}>
        <View rkCardHeader style={styles.left}>
          <RkButton
            rkType='clear'
            style={styles.menu}
            onPress={() => {
            this.props.navigation.goBack()
          }}>
            <RkText rkType='awesome hero'>{FontAwesome.chevronLeft}</RkText>
          </RkButton>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {userPk: detail.user.id})}>
            {this._renderAvatar(detail.user.image)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Profile', {userPk: detail.user.id})}
            style={styles.content}>
            <View style={styles.contentHeader}>
              <RkText rkType='header5'>{detail.user.username}</RkText>
              <RkText rkType='secondary2 hintColor'><TimeAgo time={detail.publish}/></RkText>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.right}>
          {this._renderFollow(detail.is_owner, detail.is_following, detail.user.id)}
        </View>
      </View>
    );
  }

  _renderPrivacy = (onlyMe) => {
    if(onlyMe) {
      return (
        <TouchableWithoutFeedback onPress={() => {Toast.show('Who can see this post? Only Me', Toast.BOTTOM);}}>
          <RkText rkType="awesome">{FontAwesome.onlyMe}</RkText>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback onPress={() => {Toast.show('Who can see this post? All', Toast.BOTTOM);}}>
          <RkText rkType="awesome">{FontAwesome.all}</RkText>
        </TouchableWithoutFeedback>
      );
    }
  }

  render() {
    const detail = this.props.outfitDetail;
    // User Access Not Yet
    if(detail) {
      return (
        <View style={styles.root}>
          <View style={styles.header}>
            {this._renderHeader(detail)}
          </View>
          <ScrollView style={styles.rootScroll}>
            <RkCard rkType='article'>
              <Image
                style={styles.outfitImage}
                resizeMode="cover"
                source={{uri: detail.outfit_img}} />
              <View style={{ marginLeft:20, marginRight: 20, flexDirection: 'row', flex:1, justifyContent: 'space-between' }}>
                <View>
                  <View style={{marginTop: 10}}>
                      <RkText rkType="header4">{detail.content}</RkText>
                  </View>
              		<View style={{marginTop: 10, marginBottom: 10, flexDirection: 'row'}}>
            				<RkText rkType="secondary2 hintColor">{detail.like_count.toString()} Likes</RkText>
            				<RkText rkType="secondary2 hintColor" style={{marginLeft: 13}}>{detail.comment_count.toString()} Comments</RkText>
                  </View>
                </View>
                <View style={{justifyContent: 'center'}}>{this._renderPrivacy(detail.only_me)}</View>
              </View>

              <View style={styles.socialContainer}>
                <SocialBar
                  isLiked={this.state.liked}
                  isStarred={this.state.starred}
                  handleLikePress={this._handleLikePress}
                  handleUnlikePress={this._handleUnlikePress}
                  handleBookmarkPress={this._handleBookmarkPress}
                  handleUnbookmarkPress={this._handleUnbookmarkPress}
                  handleCommentPress={this._handleCommentPress}
                  showModal={this.showModal}
                  oid={detail.id}
                />
              </View>
              <View rkCardContent style={styles.commentContainer}>
                <View style={{marginTop: 5}}>
                  {this._renderComments(detail.comments)}
                  <RkText
                    onPress={this._handleCommentPress}
                    rkType='secondary2 hintColor'>View All {detail.comment_count.toString()} Comments</RkText>
                </View>

              </View>

              <View>
                <View style={styles.headContainer}>
                  <RkText rkType="header5">Tagged Clothes ({this.props.outfitDetail.tagged_clothes.length.toString()})</RkText>
                </View>
                <ScrollView
                  horizontal={true}
                  style={{paddingBottom: 10}}>
                  <FlatList
                    horizontal
                    data={this.props.outfitDetail.tagged_clothes}
                    renderItem={this._renderClothesItem}
                    keyExtractor={this._keyExtractor}
                  />
                </ScrollView>
              </View>
              <View style={{marginBottom: 10}}>
                <View style={styles.headContainer}>
                  <RkText rkType="header5">Detail</RkText>
                </View>
                <TouchableOpacity style={[styles.dContainer, styles.row]}>
                  <RkText rkType="primary2">Gender</RkText><RkText rkType="primary3">{detail.gender}</RkText>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.dContainer, styles.lastrow]}>
                  <RkText rkType="primary2">Location</RkText><RkText rkType="primary3">{detail.location}</RkText>
                </TouchableOpacity>
              </View>
            </RkCard>
            <CategoryModal
              isCategoryVisible={this.state.isCategoryVisible}
              hideModal={this.hideModal}
              />
          </ScrollView>
        </View>
      );
    }
    return (<View><Text>Loading</Text></View>);
  }
}



let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  rootScroll: {
    backgroundColor: theme.colors.screen.base,
    marginBottom: 50
  },
  socialContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  commentContainer: {
    // borderColor: '#e3e3e3',
    borderTopWidth: 1.5,
    borderColor: '#e3e3e3',
  },
  title: {
    marginBottom: 5,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  outfitImage: {
    width: width(100),
    height: width(100)
  },
  rowImage:{
    width: (threeImageWidth+15),
    height: (threeImageWidth+15),
    marginRight: 2,
    marginTop: 2
  },
  dContainer: {
    padding: 10
  },
  headContainer: {
    padding: 10,
    backgroundColor: '#f5f5f8'
  },
  menu: {
    width: 50
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
  },
  //header
  content: {
    flex: 1,
  },
  contentHeader: {
    justifyContent: 'space-between',
    paddingLeft: 10
  },
  header: {
    height: 55,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#CCC',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
    },
    elevation: 4,
    zIndex: 5,
    overflow: 'visible'
  },
  headerLayout: {
    height: 55,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: theme.colors.screen.base
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  right: {
    position: 'absolute',
    right: 15,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
}));

function mapStateToProps({auth: {token, hType}, outfit: {outfitDetail}}) {
  return { token, hType, outfitDetail }
}

export default connect(mapStateToProps, actions)(OutfitDetail);
