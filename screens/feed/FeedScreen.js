import React, { Component } from 'react';
import { Image, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import {NavigationActions} from 'react-navigation';
import {
  RkCard,
  RkText,
  RkStyleSheet,
  RkTextInput,
  RkButton
} from 'react-native-ui-kitten';

import { Avatar } from '../../components/Avatar';
import SocialBar from '../../components/SocialBar';
class FeedScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'StyleFeed'
  })

  componentWillMount() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "Feedo",
        })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }

  _keyExtractor = (item, index) => item.id;

  _renderAvatar = (uri) => {
    if(_.isNil(uri)) {
      return (<Avatar rkType='circle' style={styles.avatar} img={require('../../assets/images/default_profile.png')}/>)
    }
    return (
      <Avatar rkType='circle' style={styles.avatar} img={{uri}}/>
    );
  }

  _renderPostHeader = (item) => {
    return (
      <View style={styles.headerLayout}>
        <View rkCardHeader style={styles.left}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {userPk: item.user.id})}>
            {this._renderAvatar(null)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Profile', {userPk: item.user.id})}
            style={styles.content}>
            <View style={styles.contentHeader}>
              <RkText rkType='header5'>haeunbaek</RkText>
              <RkText rkType='secondary2 hintColor'>3 hr ago</RkText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _renderComments = (comments) => {
    if(_.isNil(comments)) return <Text><Text style={{fontWeight: 'bold'}}>jbaek7023</Text> I love this Outfit!</Text>;
    let result = comments.map(( obj, index ) => {
      return (<Text key={index}><Text style={{fontWeight: 'bold'}}>{obj.user.username}</Text> {obj.content}</Text>);
    });

    return result;
  }

  _handleCommentPress = (id) => {
    this.props.navigation.navigate('Comments', {id, postType: 1});
  }

  _renderRow = (item) => {
    return (
      <RkCard rkType='article'>
        <View style={styles.profileSeperator} />
          {this._renderPostHeader(item)}
      	<Image
          fadeDuration={0}
          style={styles.imgStyle} source={require('../../assets/images/72383351.1.jpg')}/>
        <View style={{marginLeft:20, marginRight: 20}}>
          <View style={{marginTop: 10}}>
              <RkText rkType="header5">Black Suit Style</RkText>
          </View>
      		<View style={{marginTop: 10, marginBottom: 10, flexDirection: 'row'}}>
    				<RkText rkType="secondary2 hintColor">64 Likes</RkText>
    				<RkText rkType="secondary2 hintColor" style={{marginLeft: 13}}>8 Comments</RkText>
          </View>
        </View>
      	<View style={styles.socialContainer}>
      		<SocialBar/>
      	</View>
        <View rkCardContent style={styles.commentContainer}>
          <View style={{marginTop: 5}}>
            {this._renderComments(null)}
            <TouchableOpacity onPress={()=>this._handleCommentPress(item.id)}>
              <RkText rkType='secondary2 hintColor'>View All 4 Comments</RkText>
            </TouchableOpacity>
          </View>
        </View>
      </RkCard>
    );
  }

  render() {
    return (
      <View style={{flex:1, alignItems: 'center'}}>
        <View style={styles.defaultContainer}>
          <Image
            fadeDuration={0}
            style={styles.imageStyle} source={require('../../assets/images/follow.png')}/>
          <RkText style={styles.imageBottomText} rkType="header5 hintColor">Follow someone to see your feed</RkText>
        </View>
      </View>
    );
    return (
      <FlatList
        data={[{id:1}, {id:2}, {id:3}, {id:4}]}
        renderItem={this._renderRow}
        keyExtractor={this._keyExtractor}
        ListHeaderComponent={this._renderHeader}
      />
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  imageStyle: {
    width: width(30),
    height: width(30),
  },
  imageBottomText: {
    textAlign: 'center',
    marginTop: 13,
  },
  defaultContainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width(70),
  },
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  card: {
    marginVertical: 8,
  },
  avatar: {
    marginRight: 16
  },
  imgStyle: {
    height: 300
  },
  searchContainer: {
    backgroundColor: theme.colors.navbar,
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 60,
    alignItems: 'center'
  },
  searchBar: {
    backgroundColor: theme.colors.navbar,
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerLayout: {
    height: 55,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: theme.colors.screen.base
  },
  contentHeader: {
    justifyContent: 'space-between',
    paddingLeft: 10
  },
  content: {
    flex: 1,
  },
  socialContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  commentContainer: {
    borderTopWidth: 1.5,
    borderColor: '#e3e3e3',
  },
  profileSeperator: {
    backgroundColor: '#D3D3D3',
    height: 10
  },
}));

export default FeedScreen;
