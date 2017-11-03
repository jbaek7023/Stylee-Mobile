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

class AddStyleScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '스타일 올리기',
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
    isYou: true,
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

        <View style={styles.dContainer}>
          <RkText rkType="header5">Detail</RkText>
        </View>

        <TouchableOpacity style={[styles.dContainer, styles.row]}>
          <RkText rkType="primary3">Gender</RkText><RkText rkType="primary2">Male</RkText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.dContainer, styles.row]}>
          <RkText rkType="primary3">Location</RkText><RkText rkType="primary2">USA</RkText>
        </TouchableOpacity>

        <View style={[styles.dContainer, styles.row]}>
          <RkText rkType="primary3">Are you in the picture?</RkText>
          <RkSwitch
            style={styles.switch}
            value={this.state.isYou}
            name="Push"
            onValueChange={(isYou) => this.setState({isYou})}/>
        </View>

        <View style={[styles.dContainer, styles.drow]}>
          <RkText rkType="header5">Tagged Clothes</RkText><RkText rkType="header5 primary right">Tag Cloth</RkText>
        </View>

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
        {this._renderModal()}
      </ScrollView>
    );
  }
}

// <View>
//   <View><Image /></View>
//   <RkTextInput />
// </View>
// <RkText>Clothes in this outfit</RkText>
// <List></List>
// <RkText>DETAIL</RkText>
// <CheckBox
//   style={{flex: 1, padding: 10}}
//   onClick={(myInfo)=>this.setState({myInfo})}
//   isChecked={this.state.myInfo}
//   leftText={'User Info'}
// />
//
// <RkText>Gender</RkText><RkTextInput />
// <RkText>Location</RkText> <RkTextInput />
// <RkText>Only Me </RkText>
// <RkSwitch
//   style={styles.switch}
//   value={this.state.onlyMe}
//   name="Push"/>
// {this._renderModal}

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

export default AddStyleScreen;
