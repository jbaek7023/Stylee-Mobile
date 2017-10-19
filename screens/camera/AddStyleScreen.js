import React, { Component } from 'react';
import { RkText, RkTextInput, RkStyleSheet } from 'react-native-ui-kitten';
import { View, List, Image, TouchableOpacity } from 'react-native';
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

class AddStyleScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '스타일 올리기',
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
      <View>
        <View>
          <TouchableOpacity
            onPress={()=>{this.setState({isModalVisible:true})}}>
            <Image
              source={require('../../assets/images/robot-dev.png')}
              resizeMode="cover"
              />
          </TouchableOpacity>
          <RkTextInput />
        </View>
        <View>
          <RkText>Clothes in this outfit</RkText>

          <RkText>DETAIL</RkText>
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
        {this._renderModal()}
      </View>
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
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  switch: {
    marginVertical: 0
  }
}));

export default AddStyleScreen;
