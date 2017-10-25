import React, { Component } from 'react';
import { RkText, RkTextInput, RkStyleSheet } from 'react-native-ui-kitten';
import { ScrollView, View, List, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import CheckBox from 'react-native-check-box';
import CameraImageSelectModal from '../../components/common/CameraImageSelectModal';

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
    header: (headerProps) => {
      return <ThemedNavigationBar navigation={navigation} headerProps={headerProps}/>
    }
  })

  state = {
    isModalVisible: true,
    onlyMe: false,
    myInfo: true,
    text: '',
    textHeight: 0
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
              placeholder="문구입력"
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
          <RkText>General Info</RkText>
        </View>
        <View>
          <TouchableOpacity><RkText>Type</RkText><RkText>T-Shirt</RkText></TouchableOpacity>

          <TouchableOpacity><RkText>Seasons</RkText><RkText>Fall, Spring</RkText></TouchableOpacity>
          <TouchableOpacity><RkText>Gender</RkText><RkText>Unisex</RkText></TouchableOpacity>
          <TouchableOpacity><RkText>Size</RkText><RkText>M(95)</RkText></TouchableOpacity>
          <TouchableOpacity><RkText>Color</RkText><RkText>#333333</RkText></TouchableOpacity>
        </View>
        <View>
          <RkText>Tagged Styles</RkText>
        </View>
        <View>

        </View>
        <View>
          <RkText>Cloth Detail</RkText>

        </View>
        <View>
          <RkText>Brand</RkText>
          <RkText>Location</RkText>
          <RkText>Link</RkText>
          <RkText>In Wardrobe</RkText>
          <CheckBox
            onClick={(myInfo)=>this.setState({myInfo})}
            isChecked={this.state.myInfo}
            leftText='User Info'
          />
        </View>
        <View>
          <RkText>Privacy</RkText>
        </View>
        <View>
          <RkText>Only Me</RkText>
          <RkSwitch
            style={styles.switch}
            value={this.state.onlyMe}
            name="Push"
            onValueChange={(onlyMe) => this.setState({onlyMe})}/>
        </View>
        <View>
          {this._renderModal()}
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
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: 'center'
  },
  headContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'grey'
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
    fontSize: 15
  },
  headImageStyle: {
    width:70,
    height: 70
  },
  rightheadContainer: {
    alignItems: 'stretch',
    flex: 1
  }
}));

export default AddClothScreen;
