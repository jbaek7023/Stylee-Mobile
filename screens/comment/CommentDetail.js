import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Keyboard,
  Alert
} from 'react-native';
import {
  RkStyleSheet,
  RkText,
  RkTextInput,
  RkButton
} from 'react-native-ui-kitten';
import { Avatar } from '../../components/Avatar';
import { NavBar } from '../../components/navBar';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {withRkTheme} from 'react-native-ui-kitten';
import TimeAgo from 'react-native-timeago';
import { Spinner } from 'native-base';
import Swipeout from 'react-native-swipeout';
import SnackBar from 'react-native-snackbar-dialog';

let ThemedNavigationBar = withRkTheme(NavBar);

class CommentDetail extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Reply',
    tabBarVisible: false,
    header: (headerProps) => {
      return <ThemedNavigationBar navigation={navigation} headerProps={headerProps}/>
    },
  });

  state = {
    commentDetail: null,
    isLoading: true,
    isReplyFetching: false,
    message: ''
  }

  componentDidMount() {
    this._fetchCommentDetail();
  }

  _fetchCommentDetail = (reply) => {
    const { token, hType} = this.props;
    const { id } = this.props.navigation.state.params;
    this.props.fetchCommentDetail(
      token,
      hType,
      id,
      (commentDetail) => {
        if(reply===1) {
          this.setState({commentDetail, isReplyFetching: false})
        } else {
          this.setState({commentDetail, isLoading: false})
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

  _deleteComment = (commentId) => {
    let { token, hType } = this.props;
    this.props.deleteComment(
      token,
      hType,
      commentId,
      () => {
        let comments = _.filter(this.state.commentDetail.replies, (curObject) => {
            return curObject.id !== commentId;
        });
        this.setState({
          commentDetail: {
            ...this.state.commentDetail,
            replies: comments
          }
        });
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

  _reportPress = (commentId) => {
    setTimeout(()=>SnackBar.show(('Thanks for your feedback! We will review your report soon'), { duration: 2500 }), 1000);
  }

  _renderAvatar = (uri) => {
    if(_.isNil(uri)) {
      return (<Avatar rkType='circle' style={styles.avatar} img={require('../../assets/images/default_profile.png')}/>)
    }
    return (
      <Avatar rkType='circle' style={styles.avatar} img={{uri}}/>
    );
  }

  _renderComment = (user, created_at, content) => {
    let { id, image:uri, username } = user;
    if(user) {
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {userPk: id})}>
            {this._renderAvatar(uri)}
          </TouchableOpacity>
          <View style={styles.content}>
            <View style={styles.contentHeader}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {userPk: id})}>
                <RkText rkType='header5'>{username}</RkText>
              </TouchableOpacity>
              <RkText rkType='secondary4 hintColor'>
                <TimeAgo time={created_at}/>
              </RkText>
            </View>
            <RkText rkType='primary3 mediumLine'>{content}</RkText>
          </View>
        </View>
      );
    }
  }

  _renderItem = ({item}) => {
    let { id, image: uri, username } = item.user;
    let { id: commentId ,content, created_at, is_owner:isOwner } = item;
    let swipeoutBtns = null;

    if(isOwner) {
      swipeoutBtns = [
        {
          text: 'Delete',
          onPress: () => { this._deletePress(commentId) },
          backgroundColor: '#f64e59'
        }
      ]
    } else {
      swipeoutBtns = [
        {
          text: 'Report',
          onPress: () => { this._reportPress(commentId) },
          backgroundColor: '#f64e59'
        }
      ]
    }

    return (
      <Swipeout
        autoClose={true}
        right={swipeoutBtns}
        style={styles.swipeContainer}>
      <View style={[styles.container, styles.replyStyle]}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {userPk: id})}>
          {this._renderAvatar(uri)}
        </TouchableOpacity>
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {userPk: id})}>
              <RkText rkType='header5'>{username}</RkText>
            </TouchableOpacity>
            <RkText rkType='secondary4 hintColor'>
              <TimeAgo time={created_at}/>
            </RkText>
          </View>
          <RkText rkType='primary3 mediumLine'>{content}</RkText>
        </View>
      </View>
      </Swipeout>
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

  _replyOnComment = () => {
    let { id } = this.props.navigation.state.params;
    let { token, hType } = this.props;
    let { message } = this.state;
    this.setState({isReplyFetching: true});

    this.props.replyOnComment(
      token,
      hType,
      id,
      message,
      () => {
        this._fetchCommentDetail(1);
      }
    )
    Keyboard.dismiss();
    this.setState({message:''});
  }

  _renderKeyboard = () => {
    return (
      <View style={styles.footer}>
        <RkTextInput
          onFocus={() => this._scroll(true)}
          onBlur={() => this._scroll(true)}
          onChangeText={(message) => this.setState({message})}
          value={this.state.message}
          rkType='row sticker'
          placeholder="Add a comment..."/>
        <RkButton onPress={() => this._replyOnComment()} style={styles.send} rkType='circle'>
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
    let detail = this.state.commentDetail;
    if(this.state.isLoading) {
      return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}><Spinner color="#6F3AB1"/></View>
      );
    }
    if(detail) {
      return (
        <View style={[{flex:1}, styles.root]}>
          {this._renderComment(detail.user, detail.created_at, detail.content)}
          <FlatList
            ref={(focus) => {this.scrollC = focus}}
            style={styles.root}
            data={detail.replies}
            ItemSeparatorComponent={this._renderSeparator}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}/>
          {this._renderFetchCommentLoading()}
          {this._renderKeyboard()}
          <KeyboardSpacer/>
        </View>
      )
    }
    return <View />;
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  swipeContainer: {
    backgroundColor: theme.colors.screen.base
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
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
  replyStyle: {
    marginLeft: 25
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

export default connect(mapStateToProps, actions)(CommentDetail);
