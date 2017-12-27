import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native';
import { RkText,RkButton, RkStyleSheet, RkCard } from 'react-native-ui-kitten';
import SocialBar from '../SocialBar';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { width, height, totalSize } from 'react-native-dimension';
import TimeAgo from 'react-native-timeago';
import CategoryModal from '../../components/common/CategoryModal';
import SnackBar from 'react-native-snackbar-dialog';

import { Avatar } from '../../components/Avatar';

class OutfitSimpleItem extends Component {
  state = {
    liked: false,
    starred: false,
    isCategoryVisible: false,
    newScreen: false,
    listOnOutfit: [],
    title: '',
    onlyMe: false,
    taggedCategories: []
  }

  componentWillReceiveProps(nextProps) {
    let { liked, starred } = nextProps.item;
    let condition = (
      this.state.liked!=liked ||
      this.state.starred!=starred
    ) ? true : false;
    if(condition) {
      this.setState({liked, starred});
    }

    let { listOnOutfit, name } = nextProps;
    let categoryUpdateCondition = (this.state.listOnOutfit != listOnOutfit) ? true: false;
    if(categoryUpdateCondition) {
      this.setState({listOnOutfit});
      let taggedCategories = listOnOutfit.reduce((row, {id, added}) => {
        if(added)
          row.push(id);
        return row;
      }, []);
      this.setState({ taggedCategories })
    }
    // Snackbar disabled
  }

  hideModal = () => this.setState({isCategoryVisible: false})
  showModal = () => this.setState({isCategoryVisible: true});

  _handleLikePress = (oid) => {
    let { token, hType } = this.props;
    this.setState({liked: true})
    this.props.likeOutfit(token, hType, oid)
  }

  _handleUnlikePress = (oid) => {
    let { token, hType } = this.props;
    this.setState({liked: false})
    this.props.unlikeOutfit(token, hType, oid)
  }

  _handleBookmarkPress = (oid) => {
    let { token, hType } = this.props;
    this.setState({starred: true})
    this.props.bookmarkOutfit(token, hType, oid)
  }

  _handleUnbookmarkPress = (oid) => {
    let { token, hType } = this.props;
    this.setState({starred: false})
    this.props.unbookmarkOutfit(token, hType, oid)
  }

  _renderAvatar = (uri) => {
    if(_.isNil(uri)) {
      return (<Avatar rkType='circle' style={styles.avatar} img={require('../../assets/images/default_profile.png')}/>)
    }
    return (
      <Avatar rkType='circle' style={styles.avatar} img={{uri}}/>
    );
  }

  _handleCommentPress = () => {
    let { id } = this.props.item;
    this.props.navigation.navigate('Comments', {id, postType: 1});
  }

  _renderComments = (comments) => {
    let result = comments.map(( obj, index ) => {
      return (<Text key={index}><Text style={{fontWeight: 'bold'}}>{obj.user.username}</Text> {obj.content}</Text>);
    });
    return result;
  }

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

  _setToCreateScreen = (newScreen) => {
    this.setState({newScreen});
  }

  _handleCreatePress = (oid) => {
    let { title, onlyMe } = this.state;
    let { token, hType } = this.props;
    this.props.createNewCategory(token, hType, oid, title, onlyMe);
    this.setState({newScreen:false});
    this.hideModal();
  }

  _unselectCategory = (oid, categoryId) => {
    let taggedCategories = _.filter(this.state.taggedCategories, (curObject) => {
        return curObject !== categoryId;
    });
    let { token, hType } = this.props;
    this.setState({taggedCategories});
    this.props.deleteFromCategory(token, hType, oid, categoryId);
  }

  _selectCategory = (oid, categoryId) => {
    let taggedCategories = [...this.state.taggedCategories, categoryId];
    let { token, hType } = this.props;
    this.setState({taggedCategories});
    this.props.addToCategory(token, hType, oid, categoryId);
  }

  _renderPostHeader = (item) => {
    return (
      <View style={styles.headerLayout}>
        <View rkCardHeader style={styles.left}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {userPk: item.user.id})}>
            {this._renderAvatar(item.user.image)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Profile', {userPk: item.user.id})}
            style={styles.content}>
            <View style={styles.contentHeader}>
              <RkText rkType='header5'>{item.user.username}</RkText>
              <RkText rkType='secondary2 hintColor'><TimeAgo time={item.created_at}/></RkText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _handleImagePress = (id) => {
    this.props.navigation.navigate('OutfitDetail', {id})
  }

  hideModal = () => this.setState({isCategoryVisible: false})

  _renderCategoryModal = (oid) => {
    return (
      <CategoryModal
        newScreen={this.state.newScreen}
        categoryList={this.state.listOnOutfit}
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

  _handleCategoryPress = (oid) => {
    let { token, hType } = this.props;
    // fetchCategory
    this.props.fetchOutfitCategories(token, hType, oid);
    this.setState({newScreen:false});
    this.showModal();
  }

  render() {
    let { item } = this.props;
    return (
        <RkCard rkType='article'>
          {this._renderPostHeader(item)}
          <TouchableWithoutFeedback onPress={()=>{this._handleImagePress(item.id)}}>
          	<Image
              fadeDuration={0}
          		style={styles.outfitImage}
          		resizeMode="cover"
          		source={{uri: item.outfit_img}}
              />
          </TouchableWithoutFeedback>

        	<View style={styles.socialContainer}>
        		<SocialBar
              isLiked={this.state.liked}
              isStarred={this.state.starred}
              handleLikePress={this._handleLikePress}
              handleUnlikePress={this._handleUnlikePress}
              handleBookmarkPress={this._handleBookmarkPress}
              handleUnbookmarkPress={this._handleUnbookmarkPress}
              handleCategoryPress={this._handleCategoryPress}
              handleCommentPress={this._handleCommentPress}
              showModal={this.showModal}
              oid={item.id}
            />
        	</View>
          <View style={{paddingVertical: 5, paddingLeft:17, flexDirection: 'row', borderTopWidth: 1.5, borderColor: '#e3e3e3',}}>
            <RkText rkType="secondary2 hintColor">{item.like_count.toString()} Likes</RkText>
            <TouchableOpacity onPress={()=>this._handleCommentPress}>
             <RkText rkType="secondary2 hintColor" style={{marginLeft: 13}}>{item.comment_count.toString()} Comments</RkText>
            </TouchableOpacity>
          </View>
          <View style={styles.commentContainer}>
            <TouchableOpacity onPress={()=>this._handleCommentPress}>
              {this._renderComments(item.comments)}
              <View>
                <RkText rkType='secondary2 hintColor'>View All {item.comment_count.toString()} Comments</RkText>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.profileSeperator} />
          {this._renderCategoryModal(item.id)}
        </RkCard>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  socialContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  contentHeader: {
    justifyContent: 'space-between',
    paddingLeft: 10
  },
  commentContainer: {
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
    paddingVertical: 8,
    paddingLeft:17,
  },
  profileSeperator: {
    backgroundColor: '#D3D3D3',
    height: 10
  },
  button: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    height: 50
  },
  outfitImage: {
    width: width(100),
    height: width(100)
  },
  gridOutfitImage: {
    width:width(33),
    height:width(33),
    borderWidth:.5,
    borderColor:'#fff'
  },
  //header
  menu: {
    width: 50
  },
  content: {
    flex: 1,
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

function mapStateToProps({auth: {token, hType}, category: {listOnOutfit, name, added, removed}}) {
  return { token, hType, listOnOutfit, name, added, removed }
}

export default connect(mapStateToProps, actions)(OutfitSimpleItem);
