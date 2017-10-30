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

class TagStyleScreen extends Component {
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
    if(_.includes(this.state.selectedStyleIds, id)) {
      let newSelectedStyleIds = _.filter(this.state.selectedStyleIds, (curObject) => {
          return curObject !== id;
      });
      this.setState({selectedStyleIds : newSelectedStyleIds});
    } else {
      let newSelectedStyleIds = [...this.state.selectedStyleIds, id];
      this.setState({selectedStyleIds : newSelectedStyleIds});
    }
  }

  _renderItem = ({item}) => {
    let isSelected = _.includes(this.state.selectedStyleIds, item.id);

    if(!_.isNil(item.outfit_img)) {
      return (
        <TouchableWithoutFeedback
           style={{flex:1, position:'relative'}}
          onPress={() => this._handleImagePress(item.id, item.outfit_img)}>
          <View style={{flex: 1}}>
            <Image
              key={item.id}
              source={{uri: item.outfit_img}}
              style={styles.rowImage}
              resizeMode="cover"
            />
            <CheckBox checked={isSelected} style={{position: 'absolute', marginLeft:2, marginTop:2}}/>
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback
           style={{flex:1}}
          onPress={() => this._handleImagePress(item.id, null)}>
          <View style={{flex:1}}>
            <Image
              key={item.id}
              source={require('../../assets/images/robot-dev.png')}
              style={styles.rowImage}
              resizeMode="cover"
            />
            <CheckBox checked={isSelected} style={{position:'absolute', marginLeft:2, marginTop:2, right: 0, top:0}}/>
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
    return (
      <View>
        <View>
          <RkButton
            rkType='clear'
            onPress={() => {
              this.props.navigation.goBack()
            }}>
            <RkText rkType='awesome hero'>{FontAwesome.chevronLeft}</RkText>
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
    if(ids == undefined) {
      ids = [];
    }
    return (
      <View style={styles.root}>
        <FlatList
          data={this.props.outfits}
          extraData={this.state.selectedStyleIds}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          numColumns={3}
          renderHeader={this._renderHeader}/>
        <View style={styles.footer}>
          <RkText rkType="primary2">{ids.length} Style(s) Selected</RkText>
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
  }
}));

function mapStateToProps({auth: {token, hType}, outfit: {outfits} }) {
  return {
    token, hType, outfits
  }
}

export default connect(mapStateToProps, actions)(TagStyleScreen);
