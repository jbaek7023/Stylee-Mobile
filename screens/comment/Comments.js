import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Image,
  Platform,
  InteractionManager,
  Alert
} from 'react-native';
import {
  RkStyleSheet,
  RkText,
  RkButton,
  RkTextInput,
  RkAvoidKeyboard
} from 'react-native-ui-kitten';
import Swipeout from 'react-native-swipeout';
import { Avatar } from '../../components/Avatar';
import { NavBar } from '../../components/navBar';
import {withRkTheme} from 'react-native-ui-kitten';
import TimeAgo from 'react-native-timeago';
import _ from 'lodash';
import KeyboardSpacer from 'react-native-keyboard-spacer';
let ThemedNavigationBar = withRkTheme(NavBar);
import { Spinner } from 'native-base';
import SnackBar from 'react-native-snackbar-dialog';

class CommentsScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Comments',
    tabBarVisible: false,
    header: (headerProps) => {
      return <ThemedNavigationBar navigation={navigation} headerProps={headerProps}/>
    },
  });

  state = {
    message: '',
    comments: [],
    isLoading: true,
    isReplyFetching: false,
  }

  componentDidMount() {
    this._fetchComments();
  }

  _fetchComments = (create) => {
    const { token, hType} = this.props;
    const { id, postType } = this.props.navigation.state.params;

    this.props.fetchComments(
      token,
      hType,
      id,
      postType,
      (comments) => {
        if(create===1) {
          this.setState({comments, isReplyFetching: false})
        } else {
          this.setState({comments, isLoading: false});
          InteractionManager.runAfterInteractions(() => {
            setTimeout(()=>this.scrollC.scrollToEnd(), 200);
          });
        }
      }
    );
  }

  _keyExtractor(item, index) {
    return item.id;
  }

  _renderSeparator() {
    return (
      <View style={styles.separator}/>
    )
  }

  _renderReplies = (commentId, replyCount, userId, uri, username, content, created_at) => {
    if(replyCount==1) {
      return (
        <View style={[styles.container, {marginLeft: 25}]}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {id: userId})}>
            {this._renderAvatar(uri)}
          </TouchableOpacity>
          <View style={styles.content}>
            <View style={styles.contentHeader}>
              <RkText rkType='header5'>{username}</RkText>
              <RkText rkType='secondary4 hintColor'>
                <TimeAgo time={created_at}/>
              </RkText>
            </View>
            <RkText rkType='primary3 mediumLine'>{content}</RkText>
            <View style={{flexDirection: 'row', marginTop:5}}>
              <TouchableOpacity onPress={()=>this._handleReplyPress(commentId)}>
                <RkText rkType='secondary4 hintColor'>Reply</RkText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else if(replyCount>1) {
      return (
        <View>
          <TouchableOpacity
            onPress={()=>this._handleReplyPress(commentId)}
            style={styles.cmtContainer}>
            <RkText
              rkType='header6'>View all {replyCount} replies</RkText>
          </TouchableOpacity>
          <View style={[styles.container, {marginLeft: 25}]}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {id: userId})}>
              {this._renderAvatar(uri)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>this._handleReplyPress(commentId)}
              style={styles.content}>
              <View style={styles.contentHeader}>
                <TouchableOpacity  onPress={() => this.props.navigation.navigate('Profile', {id: userId})}>
                <RkText rkType='header5'>{username}</RkText>
                </TouchableOpacity>
                <RkText rkType='secondary4 hintColor'>
                  <TimeAgo time={created_at}/>
                </RkText>
              </View>
              <RkText rkType='primary3 mediumLine'>{content}</RkText>
              <View style={{flexDirection: 'row', marginTop:5}}>
                <TouchableOpacity onPress={()=>this._handleReplyPress(commentId)}>
                  <RkText rkType='secondary4 hintColor'>Reply</RkText>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }//댓글 4개 모두보기
    return (<View />)
  }

  _renderAvatar = (uri) => {
    if(_.isNil(uri)) {
      return (<Avatar rkType='circle' style={styles.avatar} img={require('../../assets/images/default_profile.png')}/>)
    }
    return (
      <Avatar rkType='circle' style={styles.avatar} img={{uri}}/>
    );
  }

  _deleteComment = (commentId) => {
    let { token, hType } = this.props;
    this.props.deleteComment(
      token,
      hType,
      commentId,
      () => {
        let comments = _.filter(this.state.comments, (curObject) => {
            return curObject.id !== commentId;
        });
        this.setState({ comments });
        SnackBar.show(('Comment Deleted'), { duration: 1100 })
      }
    );
  }

  _deletePress = (commentId) => {
    // SHOW Alert
    Alert.alert(
      'Delete',
      'Are you permanently deleting this comment?',
      [
        {text: 'Cancel'},
        {text: 'Delete', onPress: () => this._deleteComment(commentId)},
      ],
      { cancelable: true }
    )
  }

  _handleReplyPress = (commentId) => {
    this.props.navigation.navigate('CommentDetail', {id: commentId});
  }

  _renderItem = (row) => {
    let { id: userId, image: uri, username } = row.item.user;
    let { id: commentId, content, created_at, reply_count: replyCount } = row.item;
    var swipeoutBtns = [
      {
        text: 'Delete',
        onPress: () => { this._deletePress(commentId) },
        backgroundColor: '#f64e59'
      }
    ]
    return (
      <View>
        <Swipeout
          autoClose={true}
          right={swipeoutBtns}
          style={styles.swipeContainer}>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {id: userId})}>
              {this._renderAvatar(uri)}
            </TouchableOpacity>
            <View style={styles.content}>
              <View style={styles.contentHeader}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {id: userId})}>
                  <RkText rkType='header5'>{username}</RkText>
                </TouchableOpacity>
                <RkText rkType="secondary4 hintColor">
                  <TimeAgo time={created_at}/>
                </RkText>
              </View>
              <RkText rkType='primary3 mediumLine'>{content}</RkText>
              <View style={{flexDirection: 'row', marginTop:5}}>
                <TouchableOpacity onPress={()=>this._handleReplyPress(commentId)}>
                  <RkText rkType='secondary4 hintColor'>Reply</RkText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Swipeout>
        {this._renderReplies(commentId, replyCount, 1, uri, 'jbaek7023',  'hello world', created_at)}
      </View>
    )
  }

  // Keyboard Setup
  _scroll() {
    if (Platform.OS === 'ios') {
      this.scrollC.scrollToEnd();
    } else {
      _.delay(() => this.scrollC.scrollToEnd(), 100);
    }
  }

  _pushMessage = () => {
    let { token, hType } = this.props;
    let { id, postType } = this.props.navigation.state.params;
    let { message } = this.state;
    this.setState({isReplyFetching: true})
    this.props.createComment(
      token,
      hType,
      postType,
      id,
      message,
      () => {
        this._fetchComments(1);
      }
    );
    Keyboard.dismiss();
    this.setState({message: ''});
  }

  _renderKeyboard = () => {
    return (
      <View style={styles.footer}>
        <RkTextInput
          onFocus={() => this._scroll(false)}
          onBlur={() => this._scroll(false)}
          onChangeText={(message) => this.setState({message})}
          value={this.state.message}
          rkType='row sticker'
          placeholder="Add a comment..."/>
        <RkButton onPress={() => this._pushMessage()} style={styles.send} rkType='circle'>
          <Image
            fadeDuration={0}
            source={require('../../assets/icons/sendIcon.png')}/>
        </RkButton>
      </View>
    );
  }

  _renderFetchCommentLoading = () => {
    if(this.state.isReplyFetching) {
      return (
        <View style={{alignItems: 'center'}}><Spinner color="#6F3AB1"/></View>
      );
    }
    return <View />;

  }

  render() {
    if(this.state.isLoading) {
      return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}><Spinner color="#6F3AB1"/></View>
      );
    }
    return (
      <View style={[{flex:1}, styles.root]}>
        <FlatList
          ref={(focus) => {this.scrollC = focus}}
          data={this.state.comments}
          ItemSeparatorComponent={this._renderSeparator}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}/>
          {this._renderFetchCommentLoading()}

        {this._renderKeyboard()}
        <KeyboardSpacer/>
      </View>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  swipeContainer: {
    backgroundColor: theme.colors.screen.base
  },
  root: {
    backgroundColor: theme.colors.screen.base
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  cmtContainer: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    alignItems: 'flex-start',
    marginLeft: 25
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.border.base
  },
  footer: {
    flexDirection: 'row',
    minHeight: 60,
    padding: 10,
    backgroundColor: theme.colors.screen.alter
  },
  send: {
    backgroundColor: theme.colors.navbar,
    width: 40,
    height: 40,
    marginLeft: 10,
  }
}));

function mapStateToProps({auth: {token, hType}}) {
  return { token, hType }
}

export default connect(mapStateToProps, actions)(CommentsScreen);
