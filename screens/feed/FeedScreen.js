import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';
import { FABs } from '../../components/common/FABs';

import {
  RkCard,
  RkText,
  RkStyleSheet
} from 'react-native-ui-kitten';

import { Avatar } from '../../components/Avatar';
import { SocialBar } from '../../components/SocialBar';

class FeedScreen extends Component {
  static navigationOptions = {
    title: 'Feed'
  }

  state = {
    active: false
  }

  _onFABPress = () => {
    this.setState({ active: !this.state.active });
  }

  render() {
    return (
        <View style={{flex: 1}}>
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
          <FABs
            active={this.state.active}
            onPress={this._onFABPress}
          />
        </View>
    )
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
  }
}));

export default FeedScreen;
