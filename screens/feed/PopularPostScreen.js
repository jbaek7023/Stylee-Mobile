import React, { Component } from 'react';
import { Image, View, Text, FlatList, TouchableOpacity } from 'react-native';

import {
  RkCard,
  RkText,
  RkStyleSheet,
  RkTextInput,
  RkButton
} from 'react-native-ui-kitten';

import { Avatar } from '../../components/Avatar';
import SocialBar from '../../components/SocialBar';
class PopularPostScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Popular'
  })

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
        <Image
          fadeDuration={0}
          style={styles.imgStyle} source={require('../../assets/images/72383351.1.jpg')}/>
        <View rkCardContent>
          <RkText rkType='primary3'>TextoTextoTextoTextoTextoTextoTextoTextoTextoTextoTextoTexto</RkText>
        </View>
        <View rkCardFooter>
          <SocialBar/>
        </View >
      </RkCard>
    );
  }

  // <TouchableOpacity style={[styles.wrapper, this.props.style]} onPress={this.props.onPress}>
  //   <View style={styles.container}>
  //     <View style={styles.text}>
  //       <RkText rkType='awesome' style={[styles.icon, color]}>{this.props.icon}</RkText>
  //       <RkText rkType='header6' style={color}>{`Find Friends With ${this.props.text}`}</RkText>
  //     </View>
  //     <RkText rkType='awesome small' style={color}>{FontAwesome.chevronRight}</RkText>
  //   </View>
  // </TouchableOpacity>

  // <FindFriends color={RkTheme.current.colors.google} text='Google' icon={FontAwesome.google}
  //                        selected={this.state.googleEnabled} onPress={() => {
  //             this.setState({googleEnabled: !this.state.googleEnabled})
  //           }}/>

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

export default PopularPostScreen;
