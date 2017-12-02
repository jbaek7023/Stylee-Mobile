import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native';
import { RkText,RkButton, RkStyleSheet, RkCard } from 'react-native-ui-kitten';
import SocialBar from '../SocialBar';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { width, height, totalSize } from 'react-native-dimension';
import TimeAgo from 'react-native-timeago';

import { Avatar } from '../../components/Avatar';

class OutfitSimpleItem extends Component {
  state = {
    liked: false,
    starred: false,
    isCategoryVisible: false,
  }

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

  _renderAvatar = (uri) => {
    if(_.isNil(uri)) {
      return (<Avatar rkType='circle' style={styles.avatar} img={require('../../assets/images/robot-dev.png')}/>)
    }
    return (
      <Avatar rkType='circle' style={styles.avatar} img={{uri}}/>
    );
  }

  _handleCommentPress = () => {
    let { id } = this.props.item;
    this.props.navigation.navigate('Comments', {id, postType: 1});
  }

  _renderComments = (comments) => {
    let result = comments.map(( obj, index ) => {
      return (<Text key={index}><Text style={{fontWeight: 'bold'}}>{obj.user.username}</Text> {obj.content}</Text>);
    });
    return result;
    // obj.id, obj.user.image, obj.user.id, obj.content, obj.publish, obj.updated, obj.reply_count
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

  _handleImagePress = (id) => {
    this.props.navigation.navigate('OutfitDetail', {id})
  }

  render() {
    let { item } = this.props;
    return (
        <RkCard rkType='article'>
          {this._renderPostHeader(item)}
          <TouchableWithoutFeedback onPress={()=>{this._handleImagePress(item.id)}}>
          	<Image
          		style={styles.outfitImage}
          		resizeMode="cover"
          		source={{uri: item.outfit_img}}
              />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={()=>{this._handleImagePress(item.id)}}>
            <View style={{marginLeft:20, marginRight: 20}}>
              <View style={{marginTop: 10}}>
                  <RkText rkType="header3">{item.content}</RkText>
              </View>
          		<View style={{marginTop: 10, marginBottom: 10, flexDirection: 'row'}}>
        				<RkText rkType="secondary2 hintColor">{item.like_count.toString()} Likes</RkText>
                <TouchableOpacity onPress={()=>this._handleCommentPress}>
        				 <RkText rkType="secondary2 hintColor" style={{marginLeft: 13}}>{item.comment_count.toString()} Comments</RkText>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
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
              oid={item.id}
            />
        	</View>
          <View rkCardContent style={styles.commentContainer}>
            <TouchableOpacity onPress={()=>this._handleCommentPress} style={{marginTop: 5}}>
              {this._renderComments(item.comments)}
              <View>
                <RkText rkType='secondary2 hintColor'>View All {item.comment_count.toString()} Comments</RkText>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.profileSeperator} />
        </RkCard>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  socialContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  contentHeader: {
    justifyContent: 'space-between',
    paddingLeft: 10
  },
  commentContainer: {
    borderTopWidth: 1.5,
    borderColor: '#e3e3e3',
  },
  profileSeperator: {
    backgroundColor: '#D3D3D3',
    height: 10
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

function mapStateToProps({auth: {token, hType}}) {
  return { token, hType }
}

export default connect(mapStateToProps, actions)(OutfitSimpleItem);
