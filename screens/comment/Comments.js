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
  InteractionManager
} from 'react-native';
import {
  RkStyleSheet,
  RkText,
  RkButton,
  RkTextInput,
  RkAvoidKeyboard
} from 'react-native-ui-kitten';
import { Avatar } from '../../components/Avatar';
import { NavBar } from '../../components/navBar';
import {withRkTheme} from 'react-native-ui-kitten';
import TimeAgo from 'react-native-timeago';
import _ from 'lodash';
import KeyboardSpacer from 'react-native-keyboard-spacer';
let ThemedNavigationBar = withRkTheme(NavBar);

class CommentsScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Comments',
    tabBarVisible: false,
    header: (headerProps) => {
      return <ThemedNavigationBar navigation={navigation} headerProps={headerProps}/>
    },
  });

  state = {
    message: ''
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.addedComment.id !== nextProps.addedComment.id) {
      // fetch things
      const { token, hType} = this.props;
      const { id, postType } = this.props.navigation.state.params;

      this.props.fetchComments(token, hType, id, postType);
    }

    if(this.props.comments.length != nextProps.comments.length) {
      InteractionManager.runAfterInteractions(() => {
        this.scrollC.scrollToEnd();
      });
    }
  }

  _keyExtractor(item, index) {
    return item.id;
  }

  _renderSeparator() {
    return (
      <View style={styles.separator}/>
    )
  }

  _renderReplies = (id, replyCount, userId, uri, username, content, publish) => {
    if(replyCount==1) {
      return (
        <View style={[styles.container, {marginLeft: 25}]}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {id: userId})}>
            <Avatar rkType='circle' style={styles.avatar} img={{uri}}/>
          </TouchableOpacity>
          <View style={styles.content}>
            <View style={styles.contentHeader}>
              <RkText rkType='header5'>{username}</RkText>
              <RkText rkType='secondary4 hintColor'>
                <TimeAgo time={publish}/>
              </RkText>
            </View>
            <RkText rkType='primary3 mediumLine'>{content}</RkText>
          </View>
        </View>
      );
    } else if(replyCount>1) {
      // userId, uri, username, content, publish <- reply
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('CommentDetail', {id})}}
            style={styles.cmtContainer}>
            <RkText
              rkType='header6'>View all {replyCount} replies</RkText>
          </TouchableOpacity>
          <View style={[styles.container, {marginLeft: 25}]}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {id: userId})}>
              <Avatar rkType='circle' style={styles.avatar} img={{uri}}/>
            </TouchableOpacity>
            <View style={styles.content}>
              <View style={styles.contentHeader}>
                <RkText rkType='header5'>{username}</RkText>
                <RkText rkType='secondary4 hintColor'>
                  <TimeAgo time={publish}/>
                </RkText>
              </View>
              <RkText rkType='primary3 mediumLine'>{content}</RkText>
            </View>
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

  _renderItem = (row) => {
    let { id: userId, image: uri, username } = row.item.user;
    let { id: commentId, content, publish, reply_count: replyCount } = row.item;
    // userId, uri, username, content, publish <- reply
    return (
      <View>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {id: userId})}>
            {this._renderAvatar(uri)}
          </TouchableOpacity>
          <View style={styles.content}>
            <View style={styles.contentHeader}>
              <RkText rkType='header5'>{username}</RkText>
              <RkText rkType='secondary4 hintColor'>
                <TimeAgo time={publish}/>
              </RkText>
            </View>
            <RkText rkType='primary3 mediumLine'>{content}</RkText>
          </View>
        </View>
        {this._renderReplies(commentId, replyCount, 1, uri, 'jbaek7023',  'hello world', publish)}
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
    this.props.createComment(token, hType, postType, id, message);
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

//id, replyCount, userId, uri, username, content, publish
  render() {
    return (
      <View style={{flex:1}}>
        <FlatList
          ref={(focus) => {this.scrollC = focus}}
          style={styles.root}
          data={this.props.comments}
          ItemSeparatorComponent={this._renderSeparator}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}/>
        {this._renderKeyboard()}
        <KeyboardSpacer/>
      </View>
    )
  }

  componentDidMount() {
    const { token, hType} = this.props;
    const { id, postType } = this.props.navigation.state.params;

    InteractionManager.runAfterInteractions(() => {
      this.scrollC.scrollToEnd();
    });
    this.props.fetchComments(token, hType, id, postType);
  }
}

let styles = RkStyleSheet.create(theme => ({
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

function mapStateToProps({auth: {token, hType}, comment: {comments, addedComment}}) {
  return { token, hType, comments, addedComment }
}

export default connect(mapStateToProps, actions)(CommentsScreen);
