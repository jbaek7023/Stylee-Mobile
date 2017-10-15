import React, { Component } from 'react';
import { Image, View, Text, FlatList } from 'react-native';

import {
  RkCard,
  RkText,
  RkStyleSheet,
  RkTextInput,
} from 'react-native-ui-kitten';

import { Avatar } from '../../components/Avatar';
import { SocialBar } from '../../components/SocialBar';
import { FontAwesome } from '../../assets/icons'


class FeedScreen extends Component {
  static navigationOptions = {
    title: 'Feed',
    header: null,
    headerMode: 'none',
  }

  state = {
    active: false
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
    return (
      <View style={styles.searchContainer}>
        <RkTextInput rkType='row'
          autoCapitalize='none'
          autoCorrect={false}
          label={<RkText rkType='awesome' style={{color:'white'}}>{FontAwesome.search}</RkText>}
          placeholder='Search'
          style={styles.searchBar}
          inputStyle={{color:'white'}}
          />
      </View>
    )
  }

  render() {
    return (
      <FlatList
        data={null}
        renderItem={this._renderRow}
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
  }
}));

export default FeedScreen;
