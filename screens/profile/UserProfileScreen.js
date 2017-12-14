import React, { Component } from 'react';
import { TouchableHighlight, Image, View, Text, ScrollView, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import {
  RkText,
  RkButton, RkStyleSheet,
  RkCard
} from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import { Avatar } from '../../components/Avatar';
import { width, height, totalSize } from 'react-native-dimension';
import _ from 'lodash';
import * as actions from '../../actions';
import { Button, Icon, Spinner } from 'native-base';
import TimeAgo from 'react-native-timeago';
import SocialBar from '../../components/SocialBar';
import { Ionicons } from '@expo/vector-icons';
import {FontAwesome} from '../../assets/icons';
import OutfitSimpleItem from '../../components/common/OutfitSimpleItem';

class UserProfileScreen extends Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    header: null
  })

  state = {
    grid: true,
    scrollY: 0,
    isFollowing: false,
    isLoading: true
  }

  componentWillMount() {
    const { token, hType } = this.props;
    this.props.fetchMyProfile(token, hType, this.props.navigation.state.params.userPk);
  }

  componentWillReceiveProps(nextProps) {
    let isFollowing = nextProps.cUserProfile.is_following;
    if(this.state.isFollowing!=isFollowing) {
      this.setState({isFollowing});
    }
    if(this.props.cUserProfile !== nextProps.cUserProfile) {
      this.setState({isLoading: false});
    }
  }

  _renderAvatar = (uri) => {
    if(_.isNil(uri)) {
      return (<Avatar rkType='big' style={styles.mainAvatar} img={require('../../assets/images/default_profile.png')}/>)
    }
    return (
      <Avatar rkType='big' style={styles.avatar} img={{uri}}/>
    );
  }

  _keyExtractor = (item, index) => item.id;

  _handleImagePress = (id) => {
    this.props.navigation.navigate('OutfitDetail', {id})
  }

  _renderComments = (comments) => {
    let result = comments.map(( obj, index ) => {
      return (<Text key={index}><Text style={{fontWeight: 'bold'}}>{obj.user.username}</Text> {obj.content}</Text>);
    });

    return result;
  }

  _renderUsername = (username) => {
    let show = (this.state.scrollY > 180) ? true : false;
    if(show) {
      return (
        <TouchableOpacity
          onPress={
            () => {
              this.scroll.scrollTo({y:0, animated:true});
            }
          }>
          <RkText rkType='header3'>{username}</RkText>
        </TouchableOpacity>
      );
    } else {
      return <View />
    }
  }

  _renderOwner = (isOwner, isFollowing) => {
    let { token, hType } = this.props;
    if(!isOwner) {
      if(this.state.isFollowing) {
        return (
          <TouchableOpacity
            onPress={()=>{
              this.props.unfollow(token, hType, this.props.navigation.state.params.userPk);
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

  _renderHeader = (username, isOwner, isFollowing) => {
    if(username) {
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
            <View style={{justifyContent: 'center'}}>
              {this._renderUsername(username)}
            </View>
          </View>
          <View style={styles.right}>
            {this._renderOwner(isOwner, isFollowing)}
          </View>
        </View>
      );
    }
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
        </View>
      </View>
    );
  }

  _renderItem = ({item}) => {
    return (
      <OutfitSimpleItem item={item} navigation={this.props.navigation}/>
    );
  }


  _renderGridItem = ({item}) => {
    return (
      <TouchableHighlight
        style={styles.gridOutfitImage}
        onPress={()=>{this._handleImagePress(item.id)}}>
        <Image
          fadeDuration={0}
          style={styles.gridOutfitImage}
          resizeMode="cover"
          source={{uri: item.outfit_img}}/>
      </TouchableHighlight>
    );
  }

  _renderFlatList = (outfits) => {
    return (
      <FlatList
        data={outfits}
        renderItem={(this.state.grid) ? this._renderGridItem : this._renderItem }
        keyExtractor={this._keyExtractor}
        numColumns={(this.state.grid) ? 3 : 1}
        key={(this.state.grid) ? 1 : 0}
      />
    );
  }

  _renderSelection1 = () => {
    if(this.state.grid) {
      return (
        <Ionicons name="ios-apps" color='#6F3AB1' size={30}/>
      );
    } else {
      return (
        <Ionicons name="ios-apps" color='grey' size={30}/>
      );
    }

  }

  _renderSelection2 = () => {
    if(this.state.grid) {
      return (
        <Ionicons name="md-list" color='grey' size={30}/>
      );
    } else {
      return (
        <Ionicons name="md-list" color='#6F3AB1' size={30}/>
      );
    }

  }

  _renderProfile = (profile) => {
    return (
      <View style={{flex:1}}>
        <View style={styles.header}>
          {this._renderHeader(profile.username, profile.is_owner, profile.is_following)}
        </View>
        <ScrollView
          ref={ref => this.scroll = ref}
          onScroll={(event)=>{
            this.setState({scrollY: event.nativeEvent.contentOffset.y})}}
          style={styles.root}>
          <View style={{flexDirection: 'row', justifyContent: 'center', marginLeft: 20, marginRight: 20, marginTop: 30, marginBottom: 5}}>
            <View style={{justifyContent: 'center', alignItems: 'center', width:90, height:90}}>
              {this._renderAvatar(profile.image)}
            </View>
          </View>
          <View style={{marginLeft:20, marginRight:20, marginBottom:10, alignItems: 'center'}}>
            <RkText rkType='header3' style={styles.space}>{profile.username}</RkText>
            <RkText rkType='primary3' style={styles.space}>{profile.title}</RkText>
          </View>

          <View style={styles.buttons}>
            <RkButton style={styles.button} rkType='clear'><RkText rktype="header4">{profile.followed_count}</RkText><RkText rkType="secondary2 hintColor">Follower</RkText></RkButton>
            <RkButton style={styles.button} rkType='clear'><RkText rktype="header4">{profile.following_count}</RkText><RkText rkType="secondary2 hintColor">Following</RkText></RkButton>
            <RkButton style={styles.button} rkType='clear'><RkText rktype="header4">{profile.category_count}</RkText><RkText rkType="secondary2 hintColor">Category</RkText></RkButton>
            <RkButton style={styles.button} rkType='clear'><RkText rktype="header4">{profile.clothes_count}</RkText><RkText rkType="secondary2 hintColor">Clothes</RkText></RkButton>
          </View>

          <View style={styles.styleSeparator}>
            <RkText rkType="primary2">{profile.outfit_count} Styles</RkText>
            <View style={{flexDirection: 'row', marginTop: -5}}>
              <TouchableHighlight
                onPress={()=>{this.setState({grid:true})
                }}
                style={{
                  justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#d3d3d3', width: 35, height: 35
                }}>
                {this._renderSelection1()}
              </TouchableHighlight>
              <TouchableHighlight
                onPress={()=>{this.setState({grid:false})}}
                style={{
                  justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#d3d3d3', width: 35, height: 35
                }}>
                {this._renderSelection2()}

              </TouchableHighlight>
            </View>
          </View>
          {this._renderFlatList(profile.outfits)}
        </ScrollView>
      </View>
    );
  }

  render() {
    const profile = this.props.cUserProfile;
    if(this.state.isLoading) {
      return (
        <View style={styles.root}>
          <View style={styles.header}>
            {this._renderHeader(undefined)}
          </View>
          <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
            <Spinner color='#6F3AB1'/>
          </View>
        </View>
      );
    }
    return (
      this._renderProfile(profile)
    );

  }
}



let specWidth = width(100)-150;
let eachSpec = specWidth/4;
let avatarLength = 90;

let styles = RkStyleSheet.create(theme => ({
  mainAvatar: {
    width: avatarLength,
    height: avatarLength
  },
  root: {
    backgroundColor: theme.colors.screen.base,
    flex: 1,
  },
  userInfo: {
    flexDirection: 'row',
    paddingVertical: 18,
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base
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
  section: {
    // width: eachSpec,
  },
  space: {

  },
  profileSeperator: {
    backgroundColor: '#D3D3D3',
    height: 10
  },
  styleSeparator: {
    backgroundColor: "white",
    paddingLeft: 15,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 7,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttons: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 11,
    borderColor: '#DCDCDC',
    paddingBottom: 10,
    paddingTop: 10,
  },
  button: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    height: 50
  },
  separator: {
    backgroundColor: theme.colors.border.base,
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 0,
    width: 1,
    height: 50,
    backgroundColor: '#DCDCDC'
  },
  rowImage:{
    width:width(33),
    height:width(33),
    borderWidth:.5,
    borderColor:'#fff'
  },
  specContainer: {
    flexDirection: 'column',
    marginLeft:20,
    width: specWidth,
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
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
    paddingLeft: 10
  },
  outfitImage: {
    width: width(100),
    height: width(100)
  },
  gridOutfitImage: {
    width:width(33),
    height:width(33),
    borderWidth:.5,
    borderColor:'#fff'
  },
  //header
  menu: {
    width: 50
  },
  content: {
    flex: 1,
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

function mapStateToProps({auth: {token, hType}, user: {cUserProfile}}) {
  return {token, hType, cUserProfile}
}

export default connect(mapStateToProps, actions)(UserProfileScreen);
