import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {
  RkStyleSheet,
  RkText
} from 'react-native-ui-kitten';
import { Avatar } from '../../components/Avatar';
import { NavBar } from '../../components/navBar';
import {withRkTheme} from 'react-native-ui-kitten';
import TimeAgo from 'react-native-timeago';

let ThemedNavigationBar = withRkTheme(NavBar);

class CommentDetail extends Component {
  constructor(props){
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Comments',
    tabBarVisible: false,
    header: (headerProps) => {
      return <ThemedNavigationBar navigation={navigation} headerProps={headerProps}/>
    },
  });

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
      return (<View style={styles.container}>
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
      </View>);
    }
    return <View />

  }

  _renderItem({item}) {
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
  }
}));

function mapStateToProps({auth: {token, hType}, comment: {replyComment}}) {
  return { token, hType, replyComment }
}

export default connect(mapStateToProps, actions)(CommentDetail);
