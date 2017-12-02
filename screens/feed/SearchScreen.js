import React, { Component } from 'react';
import { Image, View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import {UIConstants} from '../../config/appConstants';

import {
  RkCard,
  RkText,
  RkStyleSheet,
  RkTextInput,
  RkButton
} from 'react-native-ui-kitten';
import { NavBar } from '../../components/navBar';
import {withRkTheme} from 'react-native-ui-kitten';
import { Avatar } from '../../components/Avatar';
import SocialBar from '../../components/SocialBar';
import { FontAwesome } from '../../assets/icons';
let ThemedNavigationBar = withRkTheme(NavBar);

class SearchScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    header: null,
    tabBarVisible: false
  })

  state = {
    active: false,
    inputText: ''
  }

  _keyExtractor = (item, index) => item.id;

  _renderRow = (row) => {
    return (
      <RkCard style={styles.card}>
        <View rkCardHeader>
          <Avatar rkType='small'
                  style={styles.avatar}
                  img={require('../../assets/images/styleeicon.png')}/>
          <View>
            <RkText rkType='header4'>Firstname LastName</RkText>
            <RkText rkType='secondary2 hintColor'>20 hrs ago</RkText>
          </View>
        </View>
        <Image style={styles.imgStyle} source={require('../../assets/images/72383351.1.jpg')}/>
        <View rkCardContent>
          <RkText rkType='primary3'>TextoTextoTextoTextoTextoTextoTextoTextoTextoTextoTextoTexto</RkText>
        </View>
        <View rkCardFooter>
          <SocialBar/>
        </View >
      </RkCard>
    );
  }

  _renderHeader = () => {
    // underline width doesn't work properly
    return (
      <View style={styles.layoutheader}>
        <View style={styles.containerheader}>
          <RkTextInput
            rkType='row'
            autoCapitalize='none'
            autoCorrect={false}
            label={<RkText rkType='awesome' style={{color:'white'}}>{FontAwesome.search}</RkText>}
            placeholder='검색'
            underlineWidth="1"
            underlineColor="white"
            style={styles.searchBarheader}
            inputStyle={{color:'white'}}
            labelStyle={{marginRight:0}}
            value={this.state.inputText}
            onChangeText={(inputText)=>{this.setState({inputText})}}
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
    )
  }

  render() {
    return (
      <FlatList
        data={null}
        renderItem={this._renderRow}
        renderHeader={this._renderHeader}
        keyExtractor={this._keyExtractor}
        ListHeaderComponent={this._renderHeader}
      />
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
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
    borderBottomColor: theme.colors.border.base
  },
  containerheader: {
    flexDirection: 'row',
    height: UIConstants.AppbarHeight,
  },
  menuheader: {
    width: 40
  },
  searchBarheader: {
    backgroundColor: theme.colors.navbar,
    marginLeft: 27,
  },
  titleText: {
    color: theme.colors.navbarText
  },
  left: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center'
  }

}));

export default SearchScreen;
