import React, { Component } from 'react';
import { Image, View, Text, ScrollView, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
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
import { Button } from 'native-base';
import TimeAgo from 'react-native-timeago';
import { SocialBar } from '../../components/SocialBar';

class UserProfileScreen extends Component {

  static navigationOptions = ({navigation, screenProps}) => ({
    tabBarVisible: false,
    headerStyle: {height: 50},
    title: !_.isNil(navigation.state.params.username) ? `${navigation.state.params.username}`: ''
  })

  componentWillMount() {
    const { token, hType } = this.props;
    this.props.fetchMyProfile(token, hType);
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

  _renderItem = ({item}) => {
    // detail -> item
    return (
      <RkCard rkType='article'>
        <View style={styles.profileSeperator} />
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {id: userId})}>
            {this._renderAvatar(item.user.image)}
          </TouchableOpacity>
          <View style={styles.content}>
            <View style={styles.contentHeader}>
              <RkText rkType='header5'>{item.user.username}</RkText>
              <RkText rkType='header5' style={{color: 'blue'}}></RkText>
            </View>
          </View>
        </View>
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
                rkType='secondary2 hintColor'>댓글{item.comment_count.toString()}개 모두보기</RkText>
          </View>
        </View>
      </RkCard>
    );
  }

  _renderProfile = (profile) => {
    return (
      <ScrollView style={styles.root}>
        <View style={{flexDirection: 'row', margin: 20}}>
          <View style={{justifyContent: 'center', alignItems: 'center', width:90, height:90}}>
            <Avatar img={{uri:profile.image}} rkType='big'/>
          </View>
          <View style={styles.specContainer}>
            <View style={{flex:1, flexDirection:'row', justifyContent: 'space-around', alignItems: 'stretch'}}>
              <View style={styles.section}>
                <RkText rkType='header4' style={styles.space}>{profile.outfit_count}</RkText>
                <RkText rkType='secondary2 hintColor'>Styles</RkText>
              </View>
              <View style={styles.section}>
                <RkText rkType='header4' style={styles.space}>{profile.followed_count}</RkText>
                <RkText rkType='secondary2 hintColor'>Followers</RkText>
              </View>
              <View style={styles.section}>
                <RkText rkType='header4' style={styles.space}>{profile.following_count}</RkText>
                <RkText rkType='secondary2 hintColor'>Following</RkText>
              </View>
            </View>
            <View style={{flex:1, alignItems:'center'}}>
              <Button block style={{height:30}}><Text style={{color:'white'}}>Follow</Text></Button>
            </View>
          </View>
        </View>
        <View style={{marginLeft:20, marginRight:20, marginBottom:20}}>
          <Text>{profile.title}</Text>
        </View>

        <View style={styles.buttons}>
          <RkButton style={styles.button} rkType='clear'><Text>Category</Text></RkButton>
          <View style={styles.separator}/>
          <RkButton style={styles.button} rkType='clear'><Text>Wardrobe</Text></RkButton>
          <View style={styles.separator}/>
          <RkButton style={styles.button} rkType='clear'><Text>About</Text></RkButton>
        </View>
        <FlatList
          data={profile.outfits}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          numColumns={1}
        />
      </ScrollView>
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
let eachSpec = specWidth/3;

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
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
    alignItems: 'center',
    width: eachSpec,
  },
  space: {
    marginBottom: 3,
  },
  profileSeperator: {
    backgroundColor: '#D3D3D3',
    height: 10
  },
  separator: {
    backgroundColor: theme.colors.border.base,
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 0,
    width: 1,
    height: 42,
    backgroundColor: '#DCDCDC'
  },
  buttons: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#DCDCDC',
    borderBottomWidth: 1,
    height: 40,
    backgroundColor: '#F0F0F0'
  },
  button: {
    flex: 1,
    alignSelf: 'center',
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
  }
}));

export default connect(mapStateToProps, actions)(UserProfileScreen);
