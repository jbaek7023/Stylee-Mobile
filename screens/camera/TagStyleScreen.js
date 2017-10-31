import React, { Component } from 'react';
import { Image, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { Text, Button, CheckBox} from 'native-base';
import { width, height, totalSize } from 'react-native-dimension';
import { RkText, RkStyleSheet, RkButton } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {FontAwesome} from '../../assets/icons';
import { threeImageWidth } from '../../utils/scale';
import _ from 'lodash';
import {UIConstants} from '../../config/appConstants';

class TagStyleScreen extends Component {
  // normal navigation
  static navigationOptions = ({ navigation }) => ({
    title: 'Tag Your Style',
    gesturesEnabled: false,
    tabBarVisible: false,
    headerStyle: {height: 50},
    headerLeft: (
      <RkButton
        rkType='clear'
        style={{width: 50}}
        onPress={() => {
          navigation.goBack()
        }}>
        <RkText rkType='awesome hero'>{FontAwesome.chevronLeft}</RkText>
      </RkButton>
    ),
    headerRight: (
      <RkButton
        rkType='clear'
        onPress={() => {
          navigation.state.params.onCheck({selectedStyleIds: navigation.state.params.selectedStyleIds});



          navigation.goBack();
        }}>
        <RkText rkType="header3" style={{marginRight:15, color:'#f64e59'}}>SAVE</RkText>
      </RkButton>
    ),
  })

  state = {
    selectedStyleIds: this.props.navigation.state.params.selectedStyleIds
  }

  _handleImagePress = (id) => {
    // add image to selected press
    // add id to the array.
    let ids = this.state.selectedStyleIds
    if(ids == undefined) {
      ids = [];
    }
    if(_.includes(ids, id)) {
      let newSelectedStyleIds = _.filter(ids, (curObject) => {
          return curObject !== id;
      });
      this.setState({selectedStyleIds : newSelectedStyleIds});
      this.props.navigation.setParams({
        selectedStyleIds: newSelectedStyleIds
      })
    } else {
      let newSelectedStyleIds = [...ids, id];
      this.setState({selectedStyleIds : newSelectedStyleIds});
      this.props.navigation.setParams({
        selectedStyleIds: newSelectedStyleIds
      })
    }

  }

  _renderItem = ({item}) => {
    let isSelected = _.includes(this.state.selectedStyleIds, item.id);

    // checkbox = onPress, checked, color,
    if(!_.isNil(item.outfit_img)) {
      return (
        <TouchableWithoutFeedback
           style={{flex:1}}
          onPress={() => this._handleImagePress(item.id, item.outfit_img)}>
          <View style={styles.rowImage}>
            <Image
              key={item.id}
              source={{uri: item.outfit_img}}
              style={styles.rowImage}
              resizeMode="cover"
            />
            <View style={{height:32, width:32, position:'absolute', top:0, right:0, marginTop:4, paddingRight:12}}>
              <CheckBox checked={isSelected} color="#f64e59"/>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback
           style={{flex:1}}
          onPress={() => this._handleImagePress(item.id, null)}>
          <View style={styles.rowImage}>
            <Image
              key={item.id}
              source={require('../../assets/images/robot-dev.png')}
              style={styles.rowImage}
              resizeMode="cover"
            />
            <View style={{height:32, width:32, position:'absolute', top:0, right:0, marginTop:4, paddingRight:12}}>
              <CheckBox checked={isSelected} color="#f64e59"/>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }

  _goBack = () => {
    const { navigation } = this.props;
    navigation.state.params.onCheck({selectedStyleIds: this.state.selectedStyleIds});
    navigation.goBack();
  }

  _renderHeader = () => {
    console.log('renderHeader');
    return (
      <View style={[styles.layoutheader, {backgroundColor:'blue'}]}>
        <View style={styles.containerheader}>
          <RkButton
            rkType='clear'
            onPress={() => {
              this.props.navigation.goBack()
            }}>
            <RkText rkType='awesome hero'>asd{FontAwesome.chevronLeft}</RkText>
          </RkButton>
        </View>

        <RkButton
          rkType='clear'
          onPress={() => {
            this._goBack();
          }}>
          <RkText rkType="header3" style={{marginRight:15, color:'#f64e59'}}>CHECK</RkText>
        </RkButton>
      </View>
    );
  }

  _keyExtractor = (item, index) => item.id;
  render() {
    let ids = this.state.selectedStyleIds
    console.log(ids);
    if(ids == undefined) {
      ids = [];
    }
    return (
      <View style={styles.root}>
        <FlatList
          renderHeader={this._renderHeader()}
          data={this.props.outfits}
          extraData={this.state.selectedStyleIds}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          numColumns={3}

          />
        <View style={styles.footer}>
          <RkText rkType="primary2">{ids.length} Style Selected</RkText>
        </View>
      </View>
    );
  }

  componentDidMount() {
    this.props.loadOutfitAll(this.props.token, this.props.hType);
  }
};

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
    flex: 1
  },
  rowImage:{
    width: threeImageWidth,
    height: threeImageWidth,
    marginRight: 2,
    marginTop: 2
  },
  footer: {
    padding: 10,
    backgroundColor: theme.colors.screen.alter,
    alignItems: 'center',
    justifyContent: 'center'
  },
  layoutheader: {
    backgroundColor: theme.colors.navbar,
    paddingTop: UIConstants.StatusbarHeight,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border.base
  },
  containerheader: {
    flexDirection: 'row',
    height: UIConstants.AppbarHeight,
  },
}));

function mapStateToProps({auth: {token, hType}, outfit: {outfits} }) {
  return {
    token, hType, outfits
  }
}

export default connect(mapStateToProps, actions)(TagStyleScreen);
