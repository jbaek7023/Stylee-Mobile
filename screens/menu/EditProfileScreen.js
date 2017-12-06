import React, { Component } from 'react';

import {
  ScrollView,
  View,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import {
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkTheme,
  RkStyleSheet,
  RkButton
} from 'react-native-ui-kitten';

import * as actions from '../../actions';
import { connect } from 'react-redux';

import {Avatar} from '../../components/Avatar';
import {SocialSetting} from '../../components/SocialSetting';
import {FontAwesome} from '../../assets/icons';
import ProfileEditModal from '../../components/common/ProfileEditModal';

class EditProfileScreen extends Component {
  static navigationOptions = {
    title: 'Menu',
    tabBarVisible: false,
    header: null,
  };

  state = {
    username: '',
    title: '',
    gender: '',
    isSelectorVisible: false,
  }

  componentWillMount() {
    let { token, hType } = this.props;
    this.props.fetchEditProfile(token, hType);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.profile !== nextProps.profile) {
      // API : add username and title.
      let { username, title, gender } = nextProps.profile;
      this.setState({username, title, gender});
    }
  }

  _renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerLayout}>
          <RkButton
            rkType='clear'
            style={styles.menu}
            onPress={() => {
            this.props.navigation.goBack()
          }}>
            <RkText rkType='awesome hero'>{FontAwesome.chevronLeft}</RkText>
          </RkButton>
          <View rkCardHeader style={styles.left}>
            <View style={styles.content}>
              <View style={styles.contentHeader}>
                <RkText rkType='header3'>Edit Profile</RkText>
              </View>
            </View>
          </View>
          <View style={styles.right}>
              <TouchableOpacity onPress={()=>{
                let { token, hType } = this.props;
                let { username, title, gender } = this.state;
                this.props.editProfile(token, hType, username, title, gender)
                this.props.navigation.goBack()
              }}>
                <RkText rkType="header3">SAVE</RkText>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  _selectAction = (gender) => {
    this.setState({gender});
    this.setState({isSelectorVisible:false});
  }

  _hideSelector = () => {
    this.setState({isSelectorVisible:false})
  }

  _renderSelectorModal = () => {
    return (
      <ProfileEditModal
        isSelectorVisible={this.state.isSelectorVisible}
        hideSelector={this._hideSelector}
        selectAction={this._selectAction}
        gender={this.state.gender}
      />
    );
  }

  _renderChangeImage = (uri) => {
    return (
      <View style={styles.headerImage}>
        <Avatar img={{uri}} rkType='big'/>
        <RkText rkType='header6' style={{textAlign:'center', marginTop:8, color:'#2897EB'}}>Change Profile Image</RkText>
      </View>
    );
  }

  _handleGenderPress = () => {
    this.setState({isSelectorVisible:true});
  }

  render() {
    const profile = this.props.profile;
    if(profile) {
      return (
        <View style={{flex:1}}>
          {this._renderHeader()}
          <ScrollView style={styles.root}>
            <RkAvoidKeyboard>
              {this._renderChangeImage(profile.profile_img)}
              <View style={[styles.dContainer, styles.titleRow]}>
                <RkText rkType="header5">Username</RkText>
                <TextInput
                  selectionColor='grey'
                  underlineColorAndroid='white'
                  placeholder="Username"
                  style={[styles.moreDetailStyle]}
                  onChangeText={(username)=>{
                    this.setState({username})
                  }}
                  value={this.state.username}/>
              </View>
              <View style={[styles.dContainer, styles.titleRow]}>
                <RkText rkType="header5">Intro</RkText>
                <TextInput
                  selectionColor='grey'
                  underlineColorAndroid='white'
                  placeholder="Username"
                  style={[styles.moreDetailStyle]}
                  onChangeText={(title)=>{
                    this.setState({title})
                  }}
                  value={this.state.title}/>
              </View>
              <TouchableOpacity
                onPress={()=>{this._handleGenderPress()}}
                style={[styles.dContainer, styles.row]}>
                <RkText rkType="header5">Gender</RkText><RkText rkType="primary2">{this.state.gender}</RkText>
              </TouchableOpacity>
            </RkAvoidKeyboard>
          </ScrollView>
          <View>
            {this._renderSelectorModal()}
          </View>
        </View>
      );
    }
    return (<View><Text>Loading</Text></View>);
  }
}

let styles = RkStyleSheet.create(theme => ({
  dContainer: {
    padding:10
  },
  moreDetailStyle: {
    flex: 1,
    textAlign: 'right',
    fontSize: 15,
  },
  root: {
    backgroundColor: theme.colors.screen.base
  },
  headerImage: {
    backgroundColor: theme.colors.screen.neutral,
    paddingVertical: 25
  },
  section: {
    marginVertical: 25
  },
  heading: {
    paddingBottom: 12.5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 32
  },
  content: {
    flex: 1,
  },
  contentHeader: {
    justifyContent: 'space-between',
    paddingLeft: 10
  },
  header: {
    height: 55,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#CCC',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
    },
    elevation: 4,
    zIndex: 5,
    overflow: 'visible'
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
  menu: {
    width: 40,
  }
}));

function mapStateToProps({ auth: { token, hType }, menu:{ profile }}) {
  return {
    token, hType, profile
  }
}

export default connect(mapStateToProps, actions)(EditProfileScreen);
