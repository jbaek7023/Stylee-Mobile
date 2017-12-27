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

let ThemedNavigationBar = withRkTheme(NavBar);

class CategoryDetail extends Component {
  static navigationOptions = ({navigation}) => ({
    // headerRight: (
    //   <Ionicons name="md-more" size={32} style={{ marginLeft: 5 }} color="white"/>
    // ),
    header: (headerProps) => {
      return <ThemedNavigationBar navigation={navigation} headerProps={headerProps}/>
    },
  })

  state = {
    isLoading: true,
  }

  componentWillMount() {
    const { id } = this.props.navigation.state.params;
    const { token, hType } = this.props;
    this.props.fetchCategoryDetail(token, hType, id);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.deleted && this.props.deleted !== nextProps.deleted) {
      const { id } = this.props.navigation.state.params;
      const { token, hType } = this.props;
      this.props.fetchCategoryDetail(token, hType, id);
      SnackBar.show(('Deleted the post'), { duration: 2500 })
    }
  }

  _onEndReachedThreshold = () => {
    let { token, hType, nextUri } = this.props;
    if(nextUri) {
      this.props.fetchNextOutfitForCategoryDetail(token, hType, nextUri);
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

// category fork.
// <View style={{alignItems: 'flex-end'}}><RkText rkType='awesome small'>{FontAwesome.category} Add</RkText></View>
  render() {
    const detail = this.props.categoryDetail;
    if(detail) {
      let outfitCount = detail.outfit_count.toString();
      return (
        <ScrollView style={styles.root} automaticallyAdjustContentInsets={false}>
          <RkCard>
            <View rkCardContent style={styles.cardContent}>
              <RkText rkType='h2'>{detail.name}</RkText>
              <RkText rkType='secondary2 hintColor bigLine'>{detail.owner.username}</RkText>
            </View>
            <View rkCardContent>
              <RkText rkType='secondary2'>{outfitCount} Styles</RkText>
            </View>
          </RkCard>
            <FlatList
              data={detail.outfits}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
              numColumns={3}
              onEndReachedThreshold={thresholdLength}
              onEndReached = {()=>{
                this._onEndReachedThreshold()
              }}
            />
        </ScrollView>
      );
    }
    return (
      <View>
        <Text>Loading</Text>
      </View>
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
    backgroundColor: theme.colors.categoryContent
  },
  marginName: {
    marginTop: 3,
    marginBottom: 5
  }
}));

function mapStateToProps({auth: {token, hType}, category: {categoryDetail, nextCategoryUri}}) {
  return { token, hType, categoryDetail, nextUri: nextCategoryUri}
}

export default connect(mapStateToProps, actions)(CategoryDetail);
