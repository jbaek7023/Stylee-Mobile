import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { FlatList, TouchableOpacity, View, Text, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
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
import DetailRender from '../../components/DetailRender';
import Toast from 'react-native-simple-toast';

class ClothDetail extends Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    header: null
  });

  state = {
    isFollowing: false,
    liked: false,
    starred: false
  }

  componentWillMount() {
    const { id } = this.props.navigation.state.params;
    const { token, hType} = this.props;
    this.props.fetchClothDetail(token, hType, id);
  }

  componentWillReceiveProps(nextProps) {
    let isFollowing = nextProps.clothDetail.is_following;
    let liked = nextProps.clothDetail.liked;
    let starred = nextProps.clothDetail.starred;
    let condition = (this.state.isFollowing!=isFollowing || this.state.liked!=liked || this.state.starred!=starred) ? true : false;
    if(condition) {
      this.setState({isFollowing, liked, starred});
    }
  }

  _handleLikePress = (cid) => {
    let { token, hType } = this.props;
    this.setState({liked: true})
    this.props.likeCloth(token, hType, cid)
  }

  _handleUnlikePress = (cid) => {
    let { token, hType } = this.props;
    this.setState({liked: false})
    this.props.unlikeCloth(token, hType, cid)
  }

  _handleBookmarkPress = (cid) => {
    let { token, hType } = this.props;
    this.setState({starred: true})
    this.props.bookmarkCloth(token, hType, cid)
  }

  _handleUnbookmarkPress = (cid) => {
    let { token, hType } = this.props;
    this.setState({starred: false})
    this.props.unbookmarkCloth(token, hType, cid)
  }

  _renderComments = (comments) => {
    let result = comments.map(( obj, index ) => {
      return (<Text key={index}><Text style={{fontWeight: 'bold'}}>{obj.user.username}</Text> {obj.content}</Text>);
    });

    return result;
  }

  _handleCommentPress = () => {
    const { id } = this.props.navigation.state.params;
    this.props.navigation.navigate('Comments', {id, postType: 2});
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
    this.props.navigation.navigate('OutfitDetail', {id})
  }

  _renderOutfitItem = ({item}) => {
    if(!_.isNil(item.outfit_img)) {
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

  _renderAvatar = (uri) => {
    if(_.isNil(uri)) {
      return (<Avatar rkType='circle' style={styles.avatar} img={require('../../assets/images/robot-dev.png')}/>)
    }
    return (
      <Avatar rkType='circle' style={styles.avatar} img={{uri}}/>
    );
  }

  _renderFollow = (isOwner, isFollowing, userPk) => {
    let { token, hType } = this.props;
    if(!isOwner) {
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
              this.props.follow(token, hType, this.props.navigation.state.params.userPk);
              this.setState({isFollowing:true});
            }}>
            <RkText rkType='header3' style={{color: 'blue'}}>Follow</RkText>
          </TouchableOpacity>
        )
      }
    }
    return <View />
  }

  _renderHeader = (detail) => {
    return (
      <View style={styles.header}>
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

  render () {
    const detail = this.props.clothDetail;
    if(detail) {
      return (
        <View style={{flex:1}}>
          {this._renderHeader(detail)}
          <ScrollView style={styles.root}>
            <RkCard rkType='article'>
              <Image
                style={styles.clothImage}
                resizeMode="cover"
                source={{uri: detail.cloth_image}} />

              <View style={{ marginLeft:20, marginRight: 20, flexDirection: 'row', flex:1, justifyContent: 'space-between' }}>
                <View>
                  <View style={{ marginTop: 10 }}>
                      <RkText rkType="header4">{detail.content}</RkText>
                  </View>
              		<View style={{
                    marginTop: 10,
                    marginBottom: 10,
                    flexDirection: 'row',
                  }}>
            				<RkText rkType="secondary2 hintColor">{detail.like_count.toString()} Likes</RkText>
            				<RkText rkType="secondary2 hintColor" style={{marginLeft: 13}}>{detail.comment_count.toString()} Comments</RkText>
                  </View>
                </View>
                <View style={{justifyContent: 'center'}}>{this._renderPrivacy(detail.only_me)}</View>
              </View>
              <View style={{marginTop: 10, marginBottom: 10}}>
                <SocialThreeBar
                  liked={this.state.liked}
                  starred={this.state.starred}
                  handleLikePress={this._handleLikePress}
                  handleUnlikePress={this._handleUnlikePress}
                  handleBookmarkPress={this._handleBookmarkPress}
                  handleUnbookmarkPress={this._handleUnbookmarkPress}
                  handleCommentPress={this._handleCommentPress}
                  cid={detail.id}
                />
              </View>
              <View rkCardContent>
                <TouchableOpacity onPress={()=>this._handleCommentPress()}>
                  <View style={{marginTop: 5}}>
                    {this._renderComments(detail.comments)}
                    <RkText rkType='secondary2 hintColor'>View All {detail.comment_count.toString()} Comments</RkText>
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <View style={styles.headContainer}>
                  <RkText rkType="header5">Tagged Styles ({detail.tagged_outfits.length.toString()})</RkText>
                </View>
                <ScrollView
                  horizontal={true}
                  style={{paddingBottom: 10}}>
                  <FlatList
                    horizontal
                    style={{paddingBottom: 10}}
                    data={detail.tagged_outfits}
                    renderItem={this._renderOutfitItem}
                    keyExtractor={this._keyExtractor}
                  />
                </ScrollView>
              </View>
              <DetailRender
                type={detail.cloth_type}
                seasons={detail.detail.seasons}
                gender={detail.detail.sex}
                sizes={detail.detail.size}
                colors={detail.detail.color}
                brand={detail.detail.brand}
                location={detail.detail.location}
                link={detail.link}
                inWardrobe={detail.in_wardrobe}
                />
            </RkCard>
          </ScrollView>
        </View>
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
    width: (threeImageWidth+15),
    height: (threeImageWidth+15),
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

export default connect(mapStateToProps, actions)(ClothDetail);
