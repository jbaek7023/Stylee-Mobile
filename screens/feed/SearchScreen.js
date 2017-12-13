import React, { Component } from 'react';
import { Image, View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import {UIConstants} from '../../config/appConstants';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import {
  RkCard,
  RkText,
  RkStyleSheet,
  RkTextInput,
  RkButton
} from 'react-native-ui-kitten';
import { Spinner } from 'native-base';
import { NavBar } from '../../components/navBar';
import {withRkTheme} from 'react-native-ui-kitten';
import { Avatar } from '../../components/Avatar';
import SocialBar from '../../components/SocialBar';
import { FontAwesome } from '../../assets/icons';
import _ from 'lodash';
let ThemedNavigationBar = withRkTheme(NavBar);

class SearchScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    header: null,
    tabBarVisible: false
  })

  state = {
    active: false,
    text: '',
    isLoading: false,
    result: []
  }

  componentWillMount() {
    // render History

    this.handleDebounced = _.debounce(e => {
      let {token, hType} = this.props;
      let { text } = this.state;
      if(text && token) {
        this.props.searchFor(token, hType, this.state.text);
      }
    }, 500);
  }

  componentWillReceiveProps(nextProps) {
    let condition = true;
    if(nextProps.result && (this.props.result !== nextProps.result)) {
      this.setState({result: nextProps.result, isLoading: false});
    }
    // https://www.youtube.com/watch?v=aWTYoWFrrh8 implement search!
  }

  onChangeText = (text) => {
    this.setState({text, isLoading: true});
    this.handleDebounced();
  }

  _keyExtractor = (item, index) => item.id;

  _renderAvatar = (uri) => {
    if(_.isNil(uri)) {
      return (<Avatar rkType='circle' img={require('../../assets/images/default_profile.png')}/>)
    }
    return (
      <Avatar rkType='circle' img={{uri}}/>
    );
  }

  _renderRow = ({item}) => {
    // id(user_id), image, username

    return (
      <TouchableOpacity
        style={styles.rowStyle}
        onPress={() => this.props.navigation.navigate('Profile', {userPk: item.id})}>
        <View>
          {this._renderAvatar(item.image)}
        </View>
        <View style={styles.unameContainer}>
          <RkText rkType='header5'>{item.username}</RkText>
        </View>
      </TouchableOpacity>
    );
  }

  _renderLoading = () => {
    let { text, isLoading } = this.state;

    if(text && isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <View style={styles.spinnerContainer}>
            <Spinner color='#6F3AB1'/>
          </View>
          <RkText rkType='primary4 hintColor'>Searching For "{this.state.text}"</RkText>
        </View>
      );
    }
    return <View />
  }

  _renderResultHeader = () => {
    let { isLoading, text, result } = this.state;
    if(!this.state.isLoading && this.state.text && this.state.result.length==0) {
      return (
        <View>
          <RkText rkType='primary4 hintColor'>No Result found with "{this.state.text}"</RkText>
        </View>
      );
    }
    if(this.state.result.length!=0) {
      return (
        <View style={{marginLeft: 20, marginTop:10, marginBottom:3,}}>
          <RkText rkType='primary4 hintColor'>Search Result</RkText>
        </View>
      );
    }
    return (<View />);
  }

  _renderHeader = () => {
    return (
      <View>
        <View style={styles.layoutheader}>
          <View style={styles.containerheader}>
            <RkTextInput
              rkType='row'
              autoCapitalize='none'
              autoCorrect={false}
              placeholder='Enter Username'
              underlineWidth="1"
              underlineColor="white"
              style={styles.searchBarheader}
              inputStyle={{color:'white'}}
              value={this.state.text}
              onChangeText={(text) => { this.onChangeText(text) }}
              autoFocus={true}
            />
            <View style={styles.left}>
              <RkButton
                rkType='clear'
                style={styles.menuheader}
                onPress={() => {
                  this.props.navigation.goBack()
                }}>
                <RkText style={styles.titleText} rkType='awesome hero'>{FontAwesome.chevronLeft}</RkText>
              </RkButton>
            </View>
          </View>
        </View>
        {this._renderLoading()}
        {this._renderResultHeader()}
      </View>
    )
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor: 'white'}}>
        <FlatList
          data={this.state.result}
          renderItem={this._renderRow}
          renderHeader={this._renderHeader}
          keyExtractor={this._keyExtractor}
          ListHeaderComponent={this._renderHeader}
          extraData={this.state.text}
        />
      </View>
    );

  }
}

let styles = RkStyleSheet.create(theme => ({
  unameContainer: {
    justifyContent: 'center',
    marginLeft: 15,
  },
  rowStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    flexDirection: 'row',
    flex:1,
    borderBottomWidth: 0.5,
    borderColor: '#e6e6ee'
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  spinnerContainer: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 10,
  },
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  card: {
    marginVertical: 8,
  },
  avatar: {
    marginRight: 16
  },
  imgStyle: {
    height: 300
  },
  searchContainer: {
    backgroundColor: theme.colors.navbar,
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 60,
    alignItems: 'center'
  },
  searchBar: {
    backgroundColor: theme.colors.navbar,
  },
  layoutheader: {
    backgroundColor: theme.colors.navbar,
    paddingTop: UIConstants.StatusbarHeight,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border.base,
    height: 40,
  },
  containerheader: {
    flexDirection: 'row',
    height: UIConstants.AppbarHeight,
  },
  menuheader: {
    width: 40,
  },
  searchBarheader: {
    backgroundColor: theme.colors.navbar,
    marginLeft: 9,
    height: 40,
  },
  titleText: {
    color: theme.colors.navbarText
  },
  left: {
    position: 'absolute',
    justifyContent: 'center'
  }

}));


function mapStateToProps({auth: {token, hType}, search: {result}}) {
  return { token, hType, result }
}

export default connect(mapStateToProps, actions)(SearchScreen);
