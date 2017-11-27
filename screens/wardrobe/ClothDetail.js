import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { FlatList, TouchableOpacity, View, Text, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import {
  RkCard,
  RkText,
  RkStyleSheet,
  RkButton
} from 'react-native-ui-kitten';
import { Avatar } from '../../components/Avatar';
import { SocialThreeBar } from '../../components/SocialThreeBar';
import TimeAgo from 'react-native-timeago';
import { Ionicons } from '@expo/vector-icons';
import {FontAwesome} from '../../assets/icons';
import { width, height, totalSize } from 'react-native-dimension';
import { threeImageWidth } from '../../utils/scale';
import DetailRender from '../../components/DetailRender';

class ClothDetail extends Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    tabBarVisible: false,
    header: null
  });

  componentWillMount() {
    const { id } = this.props.navigation.state.params;
    const { token, hType} = this.props;
    this.props.fetchClothDetail(token, hType, id);
  }

  _renderComments = (comments) => {
    let result = comments.map(( obj, index ) => {
      return (<Text key={index}><Text style={{fontWeight: 'bold'}}>{obj.user.username}</Text> {obj.content}</Text>);
    });

    return result;
  }

  _handleCommentPress = () => {
    const { id } = this.props.navigation.state.params;
    this.props.navigation.navigate('Comments', {id, postType: 1});
  }

  _renderAvatar = (uri) => {
    if(_.isNil(uri)) {
      return (<Avatar rkType='circle' style={styles.avatar} img={require('../../assets/images/robot-dev.png')}/>)
    }
    return (
      <Avatar rkType='circle' style={styles.avatar} img={{uri}}/>
    );
  }

  _handleImagePress = (id) => {
    this.props.navigation.navigate('OutfitDetail', {id})
  }

  _renderOutfitItem = ({item}) => {
    if(!_.isNil(item.outfit_img)) {
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
    return (
      <TouchableWithoutFeedback
        onPress={() => this._handleImagePress(item.id)}>
        <Image
          key={item.id}
          source={require('../../assets/images/robot-dev.png')}
          style={styles.rowImage}
          resizeMode="cover"
        />
      </TouchableWithoutFeedback>
    );
  }

  _keyExtractor = (item, index) => item.id;

  _renderAvatar = (uri) => {
    if(_.isNil(uri)) {
      return (<Avatar rkType='circle' style={styles.avatar} img={require('../../assets/images/robot-dev.png')}/>)
    }
    return (
      <Avatar rkType='circle' style={styles.avatar} img={{uri}}/>
    );
  }

  _renderHeader = (detail) => {
    return (
      <View style={styles.header}>
        <View style={styles.headerLayout}>
          <View rkCardHeader style={styles.left}>
            <RkButton
              rkType='clear'
              style={styles.menu}
              onPress={() => {
              this.props.navigation.goBack()
            }}>
              <RkText rkType='awesome hero'>{FontAwesome.chevronLeft}</RkText>
            </RkButton>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {id: userId})}>
              {this._renderAvatar(detail.user.image)}
            </TouchableOpacity>
            <View style={styles.content}>
              <View style={styles.contentHeader}>
                <RkText rkType='header5'>{detail.user.username}</RkText>
                <RkText rkType='secondary2 hintColor'><TimeAgo time={detail.publish}/></RkText>
              </View>
            </View>
          </View>
          <View style={styles.right}>
            <RkText><RkText rkType='header5' style={{color: 'blue'}}>Follow</RkText></RkText>
          </View>
        </View>
      </View>
    );
  }

  render () {
    const detail = this.props.clothDetail;
    if(detail) {
      return (
        <View style={{flex:1}}>
          {this._renderHeader(detail)}
          <ScrollView style={styles.root}>
            <RkCard rkType='article'>
              <Image
                style={styles.clothImage}
                resizeMode="cover"
                source={{uri: detail.cloth_image}} />

              <View style={{marginLeft:20, marginRight: 20}}>
                <View style={{marginTop: 10}}>
                    <RkText rkType="header3">{detail.content}</RkText>
                </View>
            		<View style={{marginTop: 10, marginBottom: 10, flexDirection: 'row'}}>
          				<RkText rkType="secondary2 hintColor">{detail.like_count.toString()} Likes</RkText>
          				<RkText rkType="secondary2 hintColor" style={{marginLeft: 13}}>{detail.comment_count.toString()} Comments</RkText>
                </View>
              </View>
              <View style={{marginTop: 10, marginBottom: 10}}>
                <SocialThreeBar
                  isLiked={detail.liked}
                  isStarred={detail.starred}
                  handleCommentPress={this._handleCommentPress}
                />
              </View>
              <View rkCardContent>
                <View>
                  <View style={{marginTop: 5}}>
                    {this._renderComments(detail.comments)}
                    <RkText
                      onPress={()=>this._handleCommentPress()}
                      rkType='secondary2 hintColor'>View All {detail.comment_count.toString()} Comments</RkText>
                  </View>
                </View>
              </View>
              <View>
                <View style={styles.headContainer}>
                  <RkText rkType="header5">Tagged Styles ({detail.tagged_outfits.length.toString()})</RkText>
                </View>
                <ScrollView
                  horizontal={true}
                  style={{paddingBottom: 10}}>
                  <FlatList
                    horizontal
                    style={{paddingBottom: 10}}
                    data={detail.tagged_outfits}
                    renderItem={this._renderOutfitItem}
                    keyExtractor={this._keyExtractor}
                  />
                </ScrollView>
              </View>
              <DetailRender
                type={detail.cloth_type}
                seasons={detail.detail.seasons}
                gender={detail.detail.sex}
                sizes={detail.detail.size}
                colors={detail.detail.color}
                brand={detail.detail.brand}
                location={detail.detail.location}
                link={detail.link}
                inWardrobe={detail.in_wardrobe}
                />
            </RkCard>
          </ScrollView>
        </View>
      );
    }
    return (<View><Text>Loading</Text></View>);


  }
}

function mapStateToProps({auth: {token, hType}, wardrobe: {clothDetail}}) {
  return { token, hType, clothDetail }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  title: {
    marginBottom: 5
  },
  menu: {
    width: 50
  },
  clothImage: {
    width: width(100),
    height: width(100)
  },
  rowImage:{
    width: (threeImageWidth+15),
    height: (threeImageWidth+15),
    marginRight: 2,
    marginTop: 2
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6
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
  dContainer: {
    padding: 10
  },
  headContainer: {
    padding: 10,
    backgroundColor: '#f5f5f8'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 0,
    paddingLeft:20
  },
  lastrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft:20
  },
  //header
  content: {
    flex: 1,
  },
  contentHeader: {
    justifyContent: 'space-between',
    paddingLeft: 10
  },
  header: {
    height: 55,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#CCC',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
    },
    elevation: 4,
    zIndex: 5,
    overflow: 'visible'
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

export default connect(mapStateToProps, actions)(ClothDetail);
