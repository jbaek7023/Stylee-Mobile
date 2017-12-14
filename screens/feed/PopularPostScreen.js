import React, { Component } from 'react';
import { Image, View, Text, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import {
  RkCard,
  RkText,
  RkStyleSheet,
  RkTextInput,
  RkButton
} from 'react-native-ui-kitten';
import OutfitSimpleItem from '../../components/common/OutfitSimpleItem';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Ionicons } from '@expo/vector-icons';

import { Avatar } from '../../components/Avatar';
import SocialBar from '../../components/SocialBar';

class PopularPostScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'StyleFeed'
  })

  state = {
    grid: true,
    popularStyles: [],
    next: null
  }

  componentWillMount() {
    let {token , hType} = this.props;
    if(token) {
      this.props.fetchFirstPopularFeed(token, hType);
    }
  }

  componentWillReceiveProps(nextProps) {
    if ( nextProps.token && (this.props.token !== nextProps.token)) {
      this.props.fetchFirstPopularFeed(nextProps.token, nextProps.hType);
    }
    if(nextProps.page && (this.props.page!==nextProps.page)) {
      this.setState({popularStyles: nextProps.page.results, next:nextProps.page.next});
    }
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

  _handleCommentPress = (id) => {
    this.props.navigation.navigate('Comments', {id, postType: 1});
  }

  _handleImagePress = (id) => {
    this.props.navigation.navigate('OutfitDetail', {id})
  }

  _renderItem = ({item}) => {
    return (
      <OutfitSimpleItem item={item} navigation={this.props.navigation}/>
    );
  }

  _renderGridItem = ({item}) => {
    return (
      <TouchableHighlight
        style={styles.gridOutfitImage}
        onPress={()=>{this._handleImagePress(item.id)}}>
        <Image
          fadeDuration={0}
          style={styles.gridOutfitImage}
          resizeMode="cover"
          source={{uri: item.outfit_img}}/>
      </TouchableHighlight>
    );
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

  renderFlatHeader = () => {
    return (
      <View style={styles.styleSeparator}>
        <RkText rkType="primary2">Popular styles in this week</RkText>
        <View style={{flexDirection: 'row', marginTop: -5}}>
          <TouchableHighlight
            onPress={()=>{this.setState({grid:true})
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
    );
  }


// ListHeaderComponent={this.renderFlatHeader}
  _renderFlatList = () =>{
    return (
      <FlatList

        data={this.state.popularStyles}
        renderItem={(this.state.grid) ? this._renderGridItem : this._renderItem }
        keyExtractor={this._keyExtractor}
        numColumns={(this.state.grid) ? 3 : 1}
        key={(this.state.grid) ? 1 : 0}
      />
    );
  }

  render() {
    return (
      <View>
        {this._renderFlatList()}
      </View>
    );
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
  }
}

let styles = RkStyleSheet.create(theme => ({
  gridOutfitImage: {
    width:width(33),
    height:width(33),
    borderWidth:.5,
    borderColor:'#fff'
  },
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
  styleSeparator: {
    backgroundColor: "white",
    paddingLeft: 15,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 7,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
}));

function mapStateToProps({auth: {token, hType}, popular: {page}}) {
  return {token, hType, page}
}

export default connect(mapStateToProps, actions)(PopularPostScreen);
