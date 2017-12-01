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
import { Button, Icon } from 'native-base';
import TimeAgo from 'react-native-timeago';
import { SocialBar } from '../../components/SocialBar';
import { Ionicons } from '@expo/vector-icons';

import {FontAwesome} from '../../assets/icons';
class UserProfileScreen extends Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    tabBarVisible: false,
    header: null
  })

  state = {
    grid: true
  }

  componentWillMount() {
    const { token, hType } = this.props;
    this.props.fetchMyProfile(token, hType, this.props.navigation.state.params.userPk);
  }

  _renderAvatar = (uri) => {
    if(_.isNil(uri)) {
      return (<Avatar rkType='circle' style={styles.avatar} img={require('../../assets/images/robot-dev.png')}/>)
    }
    return (
      <Avatar rkType='circle' style={styles.avatar} img={{uri}}/>
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
    // obj.id, obj.user.image, obj.user.id, obj.content, obj.publish, obj.updated, obj.reply_count
  }

  _handleCommentPress = () => {
    const { id } = this.props.navigation.state.params;
    this.props.navigation.navigate('Comments', {id, postType: 1});
  }

  _renderPostHeader = (item) => {
    return (
      <View style={styles.headerLayout}>
        <View rkCardHeader style={styles.left}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {userPk: item.user.id})}>
            {this._renderAvatar(item.user.image)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Profile', {userPk: item.user.id})}
            style={styles.content}>
            <View style={styles.contentHeader}>
              <RkText rkType='header5'>{item.user.username}</RkText>
              <RkText rkType='secondary2 hintColor'><TimeAgo time={item.publish}/></RkText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }


  _renderHeader = (username) => {
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
            <RkText rkType='header3'></RkText>
          </View>
        </View>
        <View style={styles.right}>
          <RkText rkType='header3' style={{color: 'blue'}}>Follow</RkText>
        </View>
      </View>
    );
  }

  _renderItem = ({item}) => {
    console.log(item);
    return (
      <RkCard rkType='article'>
          {this._renderPostHeader(item)}
      	<Image
      		style={styles.outfitImage}
      		resizeMode="cover"
      		source={{uri: item.outfit_img}}
          onPress={()=>{this._handleImagePress(item.id)}}/>
        <View style={{marginLeft:20, marginRight: 20}}>
          <View style={{marginTop: 10}}>
              <RkText rkType="header3">{item.content}</RkText>
          </View>
      		<View style={{marginTop: 10, marginBottom: 10, flexDirection: 'row'}}>
    				<RkText rkType="secondary2 hintColor">{item.like_count.toString()} Likes</RkText>
    				<RkText rkType="secondary2 hintColor" style={{marginLeft: 13}}>{item.comment_count.toString()} Comments</RkText>
          </View>
        </View>
      	<View style={styles.socialContainer}>
      		<SocialBar/>
      	</View>
        <View rkCardContent style={styles.commentContainer}>
          <View style={{marginTop: 5}}>
            {this._renderComments(item.comments)}
            <RkText
              onPress={this._handleCommentPress}
                rkType='secondary2 hintColor'>View All {item.comment_count.toString()} Comments</RkText>
          </View>
        </View>
        <View style={styles.profileSeperator} />
      </RkCard>
    );
  }


  _renderGridItem = ({item}) => {
    console.log(item);
    return (
      <TouchableHighlight
        style={styles.gridOutfitImage}
        onPress={()=>{this._handleImagePress(item.id)}}>
        <Image
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
        key={(this.state.grid) ? 1 : 1}
      />
    );

    // key={(this.state.grid) ? 1 : 0}
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
          {this._renderHeader(profile.username)}
        </View>
        <ScrollView style={styles.root}>
          <View style={{flexDirection: 'row', justifyContent: 'center', marginLeft: 20, marginRight: 20, marginTop: 30, marginBottom: 5}}>
            <View style={{justifyContent: 'center', alignItems: 'center', width:90, height:90}}>
              <Avatar img={{uri:profile.image}} style={styles.mainAvatar}rkType='big'/>
            </View>
          </View>
          <View style={{marginLeft:20, marginRight:20, marginBottom:10, alignItems: 'center'}}>
            <RkText rkType='header3' style={styles.space}>{profile.username}</RkText>
            <RkText rkType='primary3' style={styles.space}>{profile.title}</RkText>
          </View>

          <View style={styles.buttons}>
            <RkButton style={styles.button} rkType='clear'><RkText rktype="header4">{profile.followed_count}</RkText><RkText rkType="secondary2 hintColor">Follower</RkText></RkButton>
            <RkButton style={styles.button} rkType='clear'><RkText rktype="header4">{profile.following_count}</RkText><RkText rkType="secondary2 hintColor">Following</RkText></RkButton>
            <RkButton style={styles.button} rkType='clear'><RkText rktype="header4">1</RkText><RkText rkType="secondary2 hintColor">Category</RkText></RkButton>
            <RkButton style={styles.button} rkType='clear'><RkText rktype="header4">1</RkText><RkText rkType="secondary2 hintColor">Clothes</RkText></RkButton>
          </View>

          <View style={styles.styleSeparator}>
            <RkText rkType="primary2">{profile.outfit_count} Styles</RkText>
            <View style={{flexDirection: 'row', marginTop: -5}}>
              <TouchableHighlight
                onPress={()=>{this.setState({grid:true})
                  console.log(this.state.grid);
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
    if(profile) {
      return (
        this._renderProfile(profile)
      );
    }
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
}

function mapStateToProps({auth: {token, hType}, user: {cUserProfile}}) {
  return {token, hType, cUserProfile}
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
    backgroundColor: theme.colors.screen.base
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
    marginBottom: 6
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

export default connect(mapStateToProps, actions)(UserProfileScreen);
