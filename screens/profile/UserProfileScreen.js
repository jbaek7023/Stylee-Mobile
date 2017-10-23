import React, { Component } from 'react';
import { Image, View, Text, ScrollView, FlatList, TouchableWithoutFeedback } from 'react-native';
import {
  RkText,
  RkButton, RkStyleSheet
} from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import { Avatar } from '../../components/Avatar';
import { width, height, totalSize } from 'react-native-dimension';
import _ from 'lodash';
import * as actions from '../../actions';

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

  _keyExtractor = (item, index) => item.id;

  _handleImagePress = (id) => {
    this.props.navigation.navigate('OutfitDetail', {id})
  }

  _renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => this._handleImagePress(item.id)}>
        <Image
          key={item.id}
          source={{uri: item.outfit_img}}
          style={styles.rowImage}
          resizeMode="cover"
        />
      </TouchableWithoutFeedback>
    );
  }


  // <RkText rkType='header2'>{profile.username}</RkText>
  // <RkText rkType='header4'>{profile.title}</RkText>
  //
  _renderProfile = (profile) => {
    return (
      <ScrollView style={styles.root}>
        <View style={[{flexDirection: 'row'}, styles.bordered]}>
          <View style={styles.header}>
            <Avatar img={{uri:profile.image}} rkType='circle'/>
            <View style={{flex:1}}>
              <View style={styles.section}>
                <RkText rkType='header3' style={styles.space}>{profile.outfit_count}</RkText>
                <RkText rkType='secondary1 hintColor'>Posts</RkText>
              </View>
              <View style={styles.section}>
                <RkText rkType='header3' style={styles.space}>{profile.followed_count}</RkText>
                <RkText rkType='secondary1 hintColor'>Followers</RkText>
              </View>
              <View style={styles.section}>
                <RkText rkType='header3' style={styles.space}>{profile.following_count}</RkText>
                <RkText rkType='secondary1 hintColor'>Following</RkText>
              </View>
            </View>
          </View>
          <Text>{profile.title}</Text>
        </View>
        <View style={styles.buttons}>
          <RkButton style={styles.button} rkType='clear'><Text>Category (1)</Text></RkButton>
          <View style={styles.separator}/>
          <RkButton style={styles.button} rkType='clear'><Text>Wardrobe (3)</Text></RkButton>
          <View style={styles.separator}/>
          <RkButton style={styles.button} rkType='clear'><Text>About</Text></RkButton>
        </View>
        <Text>{profile.username}님의 스타일</Text>
        <FlatList
          data={profile.outfits}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          numColumns={3}
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

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  header: {
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 17,
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
  section: {
    alignItems: 'center'
  },
  space: {
    marginBottom: 3
  },
  separator: {
    backgroundColor: theme.colors.border.base,
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 0,
    width: 1,
    height: 42
  },
  buttons: {
    flexDirection: 'row',
    paddingVertical: 8,
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
  }
}));

export default connect(mapStateToProps, actions)(UserProfileScreen);
