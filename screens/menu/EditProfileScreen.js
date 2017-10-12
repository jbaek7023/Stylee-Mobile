import React, { Component } from 'react';

import {
  ScrollView,
  View,
  StyleSheet,
  Button,
  Text,
} from 'react-native';
import {
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkTheme,
  RkStyleSheet
} from 'react-native-ui-kitten';

import * as actions from '../../actions';
import { connect } from 'react-redux';

import {Avatar} from '../../components/Avatar';
import {SocialSetting} from '../../components/SocialSetting';
import {FontAwesome} from '../../assets/icons';

class EditProfileScreen extends Component {
  static navigationOptions = {
    title: 'PROFILE SETTING',
    headerRight: (
      <Button
        title='SAVE'
      />
    ),
  };

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      phone: '',
      twitter: true,
      google: false,
      facebook: false
    }
  }

  componentWillMount() {
    let { token, hType } = this.props;
    this.props.fetchEditProfile(token, hType);
  }

  render() {
    const profile = this.props.profile;
    if(profile) {
      return (
        <ScrollView style={styles.root}>
          <RkAvoidKeyboard>
            <View style={styles.header}>
              <Avatar img={{uri: profile.profile_img}} rkType='big'/>
            </View>
            <View style={styles.section}>
              <View style={[styles.row, styles.heading]}>
                <RkText rkType='header6 primary'>INFO</RkText>
              </View>
              <View style={styles.row}>
                <RkTextInput label='First Name'
                             value={this.state.firstName}
                             rkType='right clear'
                             onChangeText={(text) => this.setState({firstName: text})}/>
              </View>
              <View style={styles.row}>
                <RkTextInput label='Last Name'
                             value={this.state.lastName}
                             onChangeText={(text) => this.setState({lastName: text})}
                             rkType='right clear'/>
              </View>
              <View style={styles.row}>
                <RkTextInput label='Email'
                             value={this.state.email}
                             onChangeText={(text) => this.setState({email: text})}
                             rkType='right clear'/>
              </View>
              <View style={styles.row}>
                <RkTextInput label='Country'
                             value={this.state.country}
                             onChangeText={(text) => this.setState({country: text})}
                             rkType='right clear'/>
              </View>
              <View style={styles.row}>
                <RkTextInput label='Phone'
                             value={this.state.phone}
                             onChangeText={(text) => this.setState({phone: text})}
                             rkType='right clear'/>
              </View>
            </View>

            <View style={styles.section}>
              <View style={[styles.row, styles.heading]}>
                <RkText rkType='primary header6'>CONNECT YOUR ACCOUNT</RkText>
              </View>
              <View style={styles.row}>
                <SocialSetting name='Twitter' icon={FontAwesome.twitter} tintColor={RkTheme.current.colors.twitter}/>
              </View>
              <View style={styles.row}>
                <SocialSetting name='Google' icon={FontAwesome.google} tintColor={RkTheme.current.colors.google}/>
              </View>
              <View style={styles.row}>
                <SocialSetting name='Facebook' icon={FontAwesome.facebook} tintColor={RkTheme.current.colors.facebook}/>
              </View>
            </View>
          </RkAvoidKeyboard>
        </ScrollView>
      );
    }
    return (<View><Text>Loading</Text></View>);
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  header: {
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
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: 'center'
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 32
  }
}));

function mapStateToProps({ auth: { token, hType }, menu:{ profile }}) {
  return {
    token, hType, profile
  }
}

export default connect(mapStateToProps, actions)(EditProfileScreen);
