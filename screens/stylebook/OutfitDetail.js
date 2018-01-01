import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList, TouchableWithoutFeedback, Image } from 'react-native';
import {
  RkCard,
  RkText,
  RkStyleSheet,
  RkButton,
} from 'react-native-ui-kitten';
import { Avatar } from '../../components/Avatar';
import SocialBar from '../../components/SocialBar';
import TimeAgo from 'react-native-timeago';
import {FontAwesome} from '../../assets/icons';

import { Ionicons } from '@expo/vector-icons';
import { width, height, totalSize } from 'react-native-dimension';
import { threeImageWidth } from '../../utils/scale';
import CategoryModal from '../../components/common/CategoryModal';
import MenuModal from '../../components/common/MenuModal';
import Toast from 'react-native-simple-toast';
import SnackBar from 'react-native-snackbar-dialog';
import { Spinner } from 'native-base';
import Modal from 'react-native-modal';

class OutfitDetail extends Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    header: null,
  });

  state = {
    isCategoryVisible: false,
    newScreen: false,
    listOnOutfit: [],
    title: '',
    onlyMe: false,
    taggedCategories: [],
    isLoading: true,
    isMenuOpen: false,
    outfitDetail: undefined,
    isCategoryLoading: true,
  }

  componentWillMount() {
    const { id } = this.props.navigation.state.params;
    const { token, hType } = this.props;
    this.props.fetchOutfitDetail(
      token,
      hType,
      id,
      (outfitDetail) => {
        this.setState({outfitDetail, isLoading: false})
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.edited && (this.props.edited !== nextProps.edited)) {
      const { token, hType } = nextProps;
      const { id } = this.props.navigation.state.params;
      this.setState({isLoading: true});
      this.props.fetchOutfitDetail(
        token, hType, id,
        (outfitDetail)=>{
          this.setState({
            outfitDetail,
            isLoading:false
          })
        }
      );
    }

    let addedCondition = (this.props.added != nextProps.added) ? true : false;
    if(addedCondition) {
      SnackBar.show(('Added to '+nextProps.added), { duration: 2500 })
    }
    let removedCondition = (this.props.removed != nextProps.removed) ? true : false;
    if(removedCondition) {
      SnackBar.show(('Removed From '+nextProps.removed), { duration: 2500 })
    }

    let newCategoryCondition = (this.props.name != nextProps.name) ? true: false;
    if (newCategoryCondition) {
      SnackBar.show(('Added to '+nextProps.name), { duration: 2500 })
    }
  }

  hideModal = () => this.setState({isCategoryVisible: false, isCategoryLoading: true});
  showModal = () => this.setState({isCategoryVisible: true});
  _handleLikePress = (oid) => {
    let { token, hType } = this.props;
    this.setState({
      outfitDetail: {
        ...this.state.outfitDetail,
        liked: true
      }
    })
    this.props.likeOutfit(token, hType, oid)
  }

  _handleUnlikePress = (oid) => {
    let { token, hType } = this.props;
    this.setState({
      outfitDetail: {
        ...this.state.outfitDetail,
        liked: false
      }
    })
    this.props.unlikeOutfit(token, hType, oid)
  }

  _handleBookmarkPress = (oid) => {
    let { token, hType } = this.props;
    this.setState({
      outfitDetail: {
        ...this.state.outfitDetail,
        starred: true
      }
    })
    this.props.bookmarkOutfit(token, hType, oid)
  }

  _handleUnbookmarkPress = (oid) => {
    let { token, hType } = this.props;
    this.setState({
      outfitDetail: {
        ...outfitDetail,
        starred: false
      }
    })
    this.props.unbookmarkOutfit(token, hType, oid)
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
      return (<Avatar rkType='circle' img={require('../../assets/images/default_profile.png')}/>)
    }
    return (
      <Avatar rkType='circle' img={{uri}}/>
    );
  }

  _handleImagePress = (id) => {
    this.props.navigation.navigate('ClothDetail', {id})
  }

  _renderClothesItem = ({item}) => {
    if(!_.isNil(item.cloth_image)) {
      return (
        <TouchableWithoutFeedback
          onPress={() => this._handleImagePress(item.id)}>
          <Image
            fadeDuration={0}
            key={item.id}
            source={{uri: item.cloth_image}}
            style={styles.rowImage}
            resizeMode="cover"
            defaultSource={require('../../assets/images/styles.png')}
          />
        </TouchableWithoutFeedback>
      );
    }
    return (
      <TouchableWithoutFeedback
        onPress={() => this._handleImagePress(item.id)}>
        <Image
          key={item.id}
          source={require('../../assets/images/styles.png')}
          style={styles.rowImage}
          resizeMode="cover"
        />
      </TouchableWithoutFeedback>
    );
  }

  _keyExtractor = (item, index) => item.id;

  _handleMenuPress = () => {
    this.setState({isMenuOpen: true});
  }

  _renderFollow = () => {
    return (
      <TouchableOpacity  style={{height:55, width:50, paddingLeft:25, justifyContent: 'center'}} onPress={()=>{this._handleMenuPress()}}>
        <Ionicons name="ios-more" size={32} style={{ marginLeft: 5 }}/>
      </TouchableOpacity>
    );
  }

  _renderHeader = (detail) => {
    if(detail) {
      return (
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
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {userPk: detail.user.id})}>
              {this._renderAvatar(detail.user.image)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Profile', {userPk: detail.user.id})}
              style={styles.content}>
              <View style={styles.contentHeader}>
                <RkText rkType='header5'>{detail.user.username}</RkText>
                <RkText rkType='secondary2 hintColor'><TimeAgo time={detail.created_at}/></RkText>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.right}>
            {this._renderFollow()}
          </View>
        </View>
      );
    }
    return (
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
        </View>
      </View>

    );
  }

  _renderPrivacy = (onlyMe) => {
    if(onlyMe) {
      return (
        <TouchableWithoutFeedback onPress={() => {Toast.show('Who can see this post? Only Me', Toast.BOTTOM);}}>
          <RkText rkType="awesome">{FontAwesome.onlyMe}</RkText>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback onPress={() => {Toast.show('Who can see this post? All', Toast.BOTTOM);}}>
          <RkText rkType="awesome">{FontAwesome.all}</RkText>
        </TouchableWithoutFeedback>
      );
    }
  }

  // Category Actions
  _setTitle = (title) => {
    this.setState({title})
  }

  _setOnlyMe = () => {
    if(this.state.onlyMe) {
      this.setState({onlyMe: false});
    } else {
      this.setState({onlyMe: true});
    }
  }

  _handleCategoryPress = (oid) => {
    let { token, hType } = this.props;
    // fetchCategory
    this.showModal();
    this.props.fetchOutfitCategories(
      token,
      hType,
      oid,
      (listOnOutfit) => {
      let taggedCategories = listOnOutfit.reduce((row, {id, added}) => {
        if(added)
          row.push(id);
        return row;
      }, []);
      this.setState({listOnOutfit, taggedCategories, newScreen: false, isCategoryLoading: false});
    });

  }

  // Category Modal Functions
  _setToCreateScreen = (newScreen) => {
    this.setState({newScreen});
  }

  _handleCreatePress = (oid) => {
    let { title, onlyMe } = this.state;
    let { token, hType } = this.props;
    this.props.createNewCategory(token, hType, oid, title, onlyMe);
    this.setState({newScreen:false, title: '', onlyMe: false});
    this.hideModal();
  }

  _unselectCategory = (oid, categoryId) => {
    let taggedCategories = _.filter(this.state.taggedCategories, (curObject) => {
        return curObject !== categoryId;
    });
    let { token, hType } = this.props;
    this.setState({taggedCategories});
    this.props.deleteOutfitFromCategory(token, hType, oid, categoryId);
  }

  _selectCategory = (oid, categoryId) => {
    let taggedCategories = [...this.state.taggedCategories, categoryId];
    let { token, hType } = this.props;
    this.setState({taggedCategories});
    this.props.addToCategory(token, hType, oid, categoryId);
  }

  _renderCategoryModal = (oid) => {
    return (
      <CategoryModal
        newScreen={this.state.newScreen}
        categoryList={this.state.listOnOutfit}
        isCategoryLoading={this.state.isCategoryLoading}
        isCategoryVisible={this.state.isCategoryVisible}
        hideModal={this.hideModal}
        setToCreateScreen={this._setToCreateScreen}
        handleCreatePress={this._handleCreatePress}
        selectCategory={this._selectCategory}
        unselectCategory={this._unselectCategory}
        title={this.state.title}
        onlyMe={this.state.onlyMe}
        setTitle={this._setTitle}
        setOnlyMe={this._setOnlyMe}
        oid={oid}
        taggedCategories={this.state.taggedCategories}
        />
    );
  }

  _handleClose = () => this.setState({isMenuOpen: false})

  _renderMenuModal = (detail) => {
    return (
      <MenuModal
        isVisible={this.state.isMenuOpen}
        detail={detail}
        postType={1}
        handleClose={this._handleClose}
        navigation={this.props.navigation}
      />
    );
  }

  _renderCommentCount = (count) => {
    if(count>0) {
      return (
        <RkText rkType='secondary2 hintColor'>View All {count.toString()} Comments</RkText>
      );
    }
    return (<View />);
  }

  _renderTaggedClothes = (taggedClothes) => {
    if(taggedClothes.length>0) {
      return (
        <View>
          <View style={styles.headContainer}>
            <RkText rkType="header5">Tagged Clothes ({taggedClothes.length.toString()})</RkText>
          </View>
          <ScrollView
            horizontal={true}
            style={{paddingBottom: 10}}>
            <FlatList
              horizontal
              data={taggedClothes}
              renderItem={this._renderClothesItem}
              keyExtractor={this._keyExtractor}
            />
          </ScrollView>
        </View>
      );
    }
    return (<View />);
  }


  render() {
    const detail = this.state.outfitDetail;
    // User Access Not Yet
    if(this.state.isLoading) {
      return (
        <View style={styles.root}>
          <View style={styles.header}>
            {this._renderHeader(undefined)}
          </View>
          <View style={{ flex:1, alignItems: 'center', justifyContent: 'center'  }}>
            <Spinner color='#6F3AB1'/>
          </View>
        </View>
      );
    }
    if(detail) {
      return (
        <View style={styles.root}>
          <View style={styles.header}>
            {this._renderHeader(detail)}
          </View>
          <ScrollView style={styles.rootScroll}>
            <RkCard rkType='article'>
              <Image
                fadeDuration={0}
                style={styles.outfitImage}
                resizeMode="cover"
                source={{uri: detail.outfit_img}} />
              <View style={{ marginLeft:20, marginRight: 20, flexDirection: 'row', flex:1, justifyContent: 'space-between' }}>
                <View>
                  <View style={{marginTop: 10}}>
                      <RkText rkType="header4">{detail.content}</RkText>
                  </View>
              		<View style={{marginTop: 10, marginBottom: 10, flexDirection: 'row'}}>
            				<RkText rkType="secondary2 hintColor">{detail.like_count.toString()} Likes</RkText>
                    <TouchableOpacity onPress={()=>this._handleCommentPress()}>
            				  <RkText rkType="secondary2 hintColor" style={{marginLeft: 13}}>{detail.comment_count.toString()} Comments</RkText>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{justifyContent: 'center'}}>{this._renderPrivacy(detail.only_me)}</View>
              </View>
              <View style={styles.socialContainer}>
                <SocialBar
                  isLiked={this.state.outfitDetail.liked}
                  isStarred={this.state.outfitDetail.starred}
                  handleLikePress={this._handleLikePress}
                  handleUnlikePress={this._handleUnlikePress}
                  handleBookmarkPress={this._handleBookmarkPress}
                  handleUnbookmarkPress={this._handleUnbookmarkPress}
                  handleCategoryPress={this._handleCategoryPress}
                  handleCommentPress={this._handleCommentPress}
                  oid={detail.id}
                />
              </View>

              <View rkCardContent style={styles.commentContainer}>
                <TouchableOpacity onPress={()=>{this._handleCommentPress()}} style={{marginTop: 5}}>
                  {this._renderComments(detail.comments)}
                  <View>
                    {this._renderCommentCount(detail.comment_count)}
                  </View>
                </TouchableOpacity>
              </View>

                {this._renderTaggedClothes(this.state.outfitDetail.tagged_clothes)}


              <View style={{marginBottom: 10}}>
                <View style={styles.headContainer}>
                  <RkText rkType="header5">Detail</RkText>
                </View>
                <TouchableOpacity style={[styles.dContainer, styles.row]}>
                  <RkText rkType="primary2">Gender</RkText><RkText rkType="primary3">{detail.gender}</RkText>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.dContainer, styles.row]}>
                  <RkText rkType="primary2">Location</RkText><RkText rkType="primary3">{detail.location}</RkText>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.dContainer, styles.lastrow]}>
                  <RkText rkType="primary2">Link</RkText><RkText rkType="primary3">{detail.link}</RkText>
                </TouchableOpacity>
              </View>
            </RkCard>
            {this._renderCategoryModal(detail.id)}
            <View>
              {this._renderMenuModal(detail)}
            </View>
          </ScrollView>
        </View>
      );
    }
    return <View />;
  }
}



let styles = RkStyleSheet.create(theme => ({

  root: {
    backgroundColor: theme.colors.screen.base,
    flex: 1
  },
  rootScroll: {
    backgroundColor: theme.colors.screen.base,
  },
  socialContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  commentContainer: {
    // borderColor: '#e3e3e3',
    borderTopWidth: 1.5,
    borderColor: '#e3e3e3',
  },
  title: {
    marginBottom: 5,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  outfitImage: {
    width: width(100),
    height: width(100)
  },
  rowImage:{
    width: (threeImageWidth+15),
    height: (threeImageWidth+15),
    marginRight: 2,
    marginTop: 2
  },
  dContainer: {
    padding: 10
  },
  headContainer: {
    padding: 10,
    backgroundColor: '#f5f5f8'
  },
  menu: {
    width: 50
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

function mapStateToProps({auth: {token, hType}, outfit: {edited}, category: {name, added, removed}}) {
  return { token, hType, name, added, removed, edited}
}

export default connect(mapStateToProps, actions)(OutfitDetail);
