import React, { Component } from 'react';
import { RkText, RkTextInput, RkStyleSheet } from 'react-native-ui-kitten';
import { ScrollView, View, List, Image, TouchableOpacity, StyleSheet } from 'react-native';
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
    myInfo: true
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
        <View style={styles.photoRow}>
          <TouchableOpacity
            onPress={()=>{this.setState({isModalVisible:true})}}>
            <Image
              source={require('../../assets/images/robot-dev.png')}
              resizeMode="cover"
              />
          </TouchableOpacity>
          <RkTextInput />
        </View>
        <View style={styles.row}>
          <RkText>Cloth Detail</RkText>
          <TouchableOpacity>
            <RkText>Cloth Type(AI)</RkText>
          </TouchableOpacity>
          <TouchableOpacity><RkText>Color(Auto)</RkText></TouchableOpacity>

          <TouchableOpacity><RkText>Seasons(Auto)</RkText></TouchableOpacity>

          <TouchableOpacity><RkText>Location(Auto)</RkText></TouchableOpacity>
          <RkText>link, Brand</RkText>

          <RkText>Tag Outfit</RkText>

          <RkText>General Information</RkText>
          <CheckBox
            onClick={(myInfo)=>this.setState({myInfo})}
            isChecked={this.state.myInfo}
            leftText='User Info'
          />
          <RkText>Gender</RkText>
          <RkTextInput />
          <RkText>Location</RkText>
          <RkTextInput />
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
// onContentSizeChange={(event) => { let currentHeight = event.nativeEvent.contentSize.height; if (currentHeight > 100){ currentHeight = 100; } this.setState({ inputHeight: currentHeight }) }}

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
  photoRow: {
    flexDirection: 'row',
    paddingHorizontal: 17.5,
    borderBottomWidth: 3,
    borderColor: theme.colors.border.base,
    alignItems: 'center'
  }
}));

export default AddClothScreen;
