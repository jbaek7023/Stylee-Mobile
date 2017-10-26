import React, { Component } from 'react';
import { RkText, RkTextInput, RkStyleSheet, RkButton } from 'react-native-ui-kitten';
import { ScrollView, View, List, Image, TouchableOpacity, StyleSheet, TextInput, Text } from 'react-native';
import CheckBox from 'react-native-check-box';
import CameraImageSelectModal from '../../components/common/CameraImageSelectModal';
import { threeImageWidth } from '../../utils/scale';
import {FontAwesome} from '../../assets/icons';

import {
  RkSwitch
} from '../../components/switch/index';
// Header Left goBack'
// Header Title Post your Style
// Header Right POST
import { NavBar } from '../../components/navBar';
import {withRkTheme} from 'react-native-ui-kitten'
let ThemedNavigationBar = withRkTheme(NavBar);

class AddClothScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '옷 올리기',
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
          navigation.goBack()
        }}>
        <RkText rkType="header3" style={{marginRight:15, color:'#f64e59'}}>저장</RkText>
      </RkButton>
    ),
  })

  state = {
    isModalVisible: true,
    onlyMe: false,
    myInfo: true,
    text: '',
    textHeight: 0,
    inWardrobe: true
  }

  _showModal = () => this.setState({ isModalVisible: true })
  _hideModal = () => this.setState({ isModalVisible: false })

  _renderModal = () => {
    return (
      <CameraImageSelectModal
        hideModal={this._hideModal}
        isModalVisible={this.state.isModalVisible}
        navigation={this.props.navigation}
      />
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headContainer}>
          <View style={styles.leftheadContainer}>
            <TouchableOpacity
              style={[styles.imageContainer, {height: Math.max(70, this.state.textHeight)}]}
              onPress={()=>{this.setState({isModalVisible:true})}}>
              <Image
                source={require('../../assets/images/robot-dev.png')}
                resizeMode="cover"
                style={styles.headImageStyle}
                />
            </TouchableOpacity>
          </View>
          <View style={styles.rightheadContainer}>
            <TextInput
              multiline
              selectionColor='grey'
              underlineColorAndroid='white'
              placeholder="문구입력..."
              style={[styles.inputStyle, {height: Math.max(70, this.state.textHeight)}]}
              onChangeText={(text)=>{
                this.setState({text})
              }}
              onContentSizeChange={(event) => {
                this.setState({ textHeight: event.nativeEvent.contentSize.height });
              }}
              value={this.state.text}/>
          </View>
        </View>

        <View>
          <View style={styles.dContainer}>
            <RkText rkType="header5">Detail</RkText>
          </View>

          <TouchableOpacity style={[styles.dContainer, styles.row]}>
            <RkText rkType="primary3">Type</RkText><RkText rkType="primary2">T-Shirt</RkText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.dContainer, styles.row]}>
            <RkText rkType="primary3">Seasons</RkText><RkText rkType="primary2">Fall, Spring</RkText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.dContainer, styles.row]}>
            <RkText rkType="primary3">Gender</RkText><RkText rkType="primary2">Unisex</RkText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.dContainer, styles.row]}>
            <RkText rkType="primary3">Size</RkText><RkText rkType="primary2">M(95)</RkText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.dContainer, styles.row]}>
            <RkText rkType="primary3">Color</RkText><RkText rkType="primary2">#f64e59</RkText>
          </TouchableOpacity>

          <View style={styles.contextSeperator}/>

          <View style={[styles.dContainer, styles.drow]}>
            <RkText rkType="header5">Tagged Styles</RkText><RkText rkType="header5 primary right">Tag Style</RkText>
          </View>

          <View style={styles.contextSeperator}/>

          <View style={styles.dContainer}>
            <RkText rkType="header5">More Detail</RkText>
          </View>
          <View style={[styles.dContainer, styles.row]}>
            <RkText rkType="primary3">Brand</RkText><RkText rkType="primary2">Nike</RkText>
          </View>
          <View style={[styles.dContainer, styles.row]}>
            <RkText rkType="primary3">Location</RkText><RkText rkType="primary2">USA</RkText>
          </View>
          <View style={[styles.dContainer, styles.row]}>
            <RkText rkType="primary3">Link</RkText><RkText rkType="primary2">www.naver.com</RkText>
          </View>
          <View style={[styles.dContainer, styles.row]}>
            <RkText rkType="primary3">In Wardrobe</RkText>
            <RkSwitch
              style={styles.switch}
              value={this.state.inWardrobe}
              name="Push"
              onValueChange={(inWardrobe) => this.setState({inWardrobe})}/>
          </View>

          <View style={styles.contextSeperator}/>

          <View style={styles.dContainer}>
            <RkText rkType="header5">Privacy</RkText>
          </View>
          <View style={[styles.dContainer, styles.row]}>
            <RkText rkType="primary3">Only Me</RkText>
            <RkSwitch
              style={styles.switch}
              value={this.state.onlyMe}
              name="Push"
              onValueChange={(onlyMe) => this.setState({onlyMe})}/>
          </View>
          <View>
            {this._renderModal()}
          </View>
        </View>
      </ScrollView>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.base,
  },
  switch: {
    marginVertical: 0
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 0,
    paddingLeft:20
  },
  drow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#cfcfd6'
  },
  leftheadContainer: {
    width:90
  },
  imageContainer: {
    margin:10,
    justifyContent: 'center'
  },
  inputStyle: {
    marginTop:10,
    marginBottom:10,
    flex: 1,
    fontSize: 15,
    marginRight: 10
  },
  headImageStyle: {
    width:70,
    height: 70
  },
  rightheadContainer: {
    alignItems: 'stretch',
    flex: 1
  },
  dHeader: {
    color: theme.colors.primary,
  },
  dContainer: {
    padding: 10
  },
  taggedImage: {
    width:threeImageWidth,
    height: threeImageWidth,
    marginRight: 2,
    marginTop: 2,
  },
  contextSeperator: {
    backgroundColor: "#e6e6ee",
    height: 0.5
  }
}));

export default AddClothScreen;
