import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform
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

let ThemedNavigationBar = withRkTheme(NavBar);

class CommentDetail extends Component {
  constructor(props){
    super(props);
  }

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

  _keyExtractor(item, index) {
    return item.id;
  }

  _renderSeparator() {
    return (
      <View style={styles.separator}/>
    )
  }

  _renderComment = (user, publish, content) => {
    if(user) {
      let { id, image:uri, username } = user;
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {id})}>
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
    }
    return <View />

  }

  _renderItem = ({item}) => {
    let { id, image: uri, username } = item.user;
    let { content, publish } = item;
    return (
      <View style={[styles.container, styles.replyStyle]}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {id})}>
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
    )
  }

  // Keyboard Setup
  _scroll() {
    if (Platform.OS === 'ios') {
      this.refs.list.scrollToEnd();
    } else {
      _.delay(() => this.refs.list.scrollToEnd(), 100);
    }
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
        <RkButton onPress={() => this._pushMessage()} style={styles.send} rkType='circle'>
          <Image source={require('../../assets/icons/sendIcon.png')}/>
        </RkButton>
      </View>
    );
  }

  render() {
    let { user, publish, content } = this.props.replyComment;
    return (
      <View style={[{flex:1}, styles.root]}>
        {this._renderComment(user, publish, content)}
        <FlatList
          style={styles.root}
          data={this.props.replyComment.replies}
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
    this.props.fetchCommentDetail(token, hType, id);
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

function mapStateToProps({auth: {token, hType}, comment: {replyComment}}) {
  return { token, hType, replyComment }
}

export default connect(mapStateToProps, actions)(CommentDetail);
