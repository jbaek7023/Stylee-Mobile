import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { NavBar } from '../../components/navBar';
import {withRkTheme} from 'react-native-ui-kitten';
import SocialBar from '../../components/SocialBar';
import { Ionicons } from '@expo/vector-icons';
import {FontAwesome} from '../../assets/icons';
import { Spinner } from 'native-base';
import {
  RkCard,
  RkText,
  RkStyleSheet
} from 'react-native-ui-kitten';
import { Avatar } from '../../components/Avatar';
import { thresholdLength } from '../../utils/scale';
import SnackBar from 'react-native-snackbar-dialog';
import EditCategoryModal from '../../components/common/EditCategoryModal';
import MenuModal from '../../components/common/MenuModal';
import Toast from 'react-native-simple-toast';

let ThemedNavigationBar = withRkTheme(NavBar);

class CategoryDetail extends Component {
  static navigationOptions = ({navigation}) => ({
    header: (headerProps) => {
      return <ThemedNavigationBar navigation={navigation} headerProps={headerProps}/>
    },
  })

  state = {
    isLoading: true,
    categoryDetail: null,
    nextUri: 1,
    isMenuOpen: false,
    isEditVisible: false,
  }

  componentWillMount() {
    const { id } = this.props.navigation.state.params;
    const { token, hType } = this.props;
    this.props.fetchCategoryDetail(
      token,
      hType,
      id,
      (categoryDetail) => {
        this.setState({categoryDetail, isLoading: false})
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.edited && nextProps.edited !== this.props.edited) {
      const { id } = this.props.navigation.state.params;
      const { token, hType } = this.props;
      this.props.fetchCategoryDetail(
        token,
        hType,
        id,
        (categoryDetail) => {
          this.setState({categoryDetail, isLoading: false})
        }
      );
    }
  }

  _onEndReachedThreshold = () => {
    let { token, hType, nextUri } = this.props;
    if(nextUri) {
      this.props.fetchNextOutfitForCategoryDetail(
        token,
        hType,
        nextUri,
        (outfits, nextUri) => {
          this.setState({
            categoryDetail: {
            ...this.state.categoryDetail.outfits,
            outfits
            },
            nextUri
          })
        }
      );
    }
  }

  _keyExtractor = (item, index) => item.id;

  _handleImagePress = (id) => {
    this.props.navigation.navigate('OutfitDetail', {id});
  }

  _renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => this._handleImagePress(item.id)}>
        <Image
          fadeDuration={0}
          key={item.id}
          source={{uri: item.outfit_img}}
          style={styles.rowImage}
          resizeMode="cover"
        />
      </TouchableWithoutFeedback>
    );
  }

  _handleMenuPress = () => {
    this.setState({isMenuOpen: true});
  }

  _handleClose = () => {
    this.setState({isMenuOpen: false});
  }

  _showEditCategory = () => {
    this.setState({isEditVisible: true})
  }

  _renderMenuModal = (detail) => {
    return (
      <MenuModal
        isVisible={this.state.isMenuOpen}
        detail={detail}
        postType={3}
        handleClose={this._handleClose}
        navigation={this.props.navigation}
        showEditCategory={this._showEditCategory}
      />
    );
  }


  _hideModal = () => {
    this.setState({isEditVisible: false});
  }

  _renderEditCategoryModal = ({name, only_me}) => {
    const { id } = this.props.navigation.state.params;
    let { isEditVisible } = this.state;

    return (
      <EditCategoryModal
        isEditVisible={isEditVisible}
        hideModal={this._hideModal}
        categoryId={id}
        categoryName={name}
        onlyMe={only_me}
        />
    );
    // return (<View />);
  }

  _renderOutfitCount = (outfitCount) => {
    if(outfitCount <= 1) {
      return (
        <RkText rkType='secondary2' style={{paddingRight: 7}}>{outfitCount} Style</RkText>
      );
    }
    return (
      <RkText rkType='secondary2' style={{paddingRight: 7}}>{outfitCount} Styles</RkText>
    );
  }


  _renderPrivacy = (onlyMe) => {
    if(onlyMe) {
      return (
        <TouchableWithoutFeedback onPress={() => {Toast.show('Who can see this post? Only Me', Toast.BOTTOM);}}>
          <RkText rkType="awesome" style={{marginTop: 1}}>{FontAwesome.onlyMe}</RkText>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback onPress={() => {Toast.show('Who can see this post? All', Toast.BOTTOM);}}>
          <RkText rkType="awesome" style={{marginTop: 1}}>{FontAwesome.all}</RkText>
        </TouchableWithoutFeedback>
      );
    }
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
          <Spinner color='#6F3AB1'/>
        </View>
      );
    }
    let {categoryDetail} = this.state;
    let outfitCount = categoryDetail.outfit_count.toString();
    return (
      <ScrollView style={styles.root} automaticallyAdjustContentInsets={false}>
        <RkCard>
          <View rkCardContent style={styles.cardContent}>
            <View>
              <RkText rkType='h2'>{categoryDetail.name}</RkText>
              <RkText rkType='secondary2 hintColor bigLine'>{categoryDetail.owner.username}</RkText>
            </View>
          </View>
          <View rkCardContent style={{flexDirection: 'row'}}>
            {this._renderOutfitCount(outfitCount)}
            {this._renderPrivacy(categoryDetail.only_me)}
            <TouchableWithoutFeedback style={{ height:55, width:50 }} onPress={()=>{this._handleMenuPress()}}>
              <Ionicons name="ios-more" size={32} style={{ position: 'absolute', right: 10, top: 10, marginLeft: 5 }}/>
            </TouchableWithoutFeedback>
          </View>
        </RkCard>
          <FlatList
            data={categoryDetail.outfits}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            numColumns={3}
            onEndReachedThreshold={thresholdLength}
            onEndReached = {()=>{
              this._onEndReachedThreshold()
            }}
          />
          <View>{this._renderMenuModal(categoryDetail)}</View>
          <View>{this._renderEditCategoryModal(categoryDetail)}</View>
      </ScrollView>
    );
  }
}


let styles = RkStyleSheet.create(theme => ({
  root: {
    flex:1,
    backgroundColor: theme.colors.screen.base
  },
  title: {
    marginBottom: 5
  },
  viewRow:{
    flexDirection:'row',
  },
  rowImage:{
    width:width(33),
    height:width(33),
    borderWidth:.5,
    borderColor:'#fff'
  },
  cardContent: {
    backgroundColor: theme.colors.categoryContent,
    flexDirection: 'row',
  },
  marginName: {
    marginTop: 3,
    marginBottom: 5
  }
}));

function mapStateToProps({auth: {token, hType}, category: {edited}}) {
  return { token, hType, edited }
}

export default connect(mapStateToProps, actions)(CategoryDetail);
