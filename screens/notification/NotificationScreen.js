import React, { Component } from 'react';
import {
  ListView,
  View,
  Image,
  Text,
  FlatList,
} from 'react-native';
import {RkStyleSheet, RkText} from 'react-native-ui-kitten';
import {Avatar} from '../../components/Avatar';
import { NavBar } from '../../components/navBar';
import {withRkTheme} from 'react-native-ui-kitten'

let ThemedNavigationBar = withRkTheme(NavBar);

class NotificationScreen extends Component {
  static navigationOptions = ({navigation}) => ({
      title: 'Notification',
      header: (headerProps) => {
        return <ThemedNavigationBar navigation={navigation} headerProps={headerProps}/>
      },
    });

  _keyExtractor = (item, index) => item.id;

  _renderAvatar = (uri, badge) => {
    if(_.isNil(uri)) {
      return (<Avatar badge={badge} rkType='circle' style={styles.avatar} img={require('../../assets/images/robot-dev.png')}/>)
    }
    return (
      <Avatar rkType='circle' style={styles.avatar} img={{uri}}/>
    );
  }

  _renderRow = (row) => {
    return (
      <View style={styles.container}>
        {this._renderAvatar(null, row.item.type)}
        <View style={styles.content}>
          <View style={styles.mainContent}>
            <View style={styles.text}>
              <RkText>
                <RkText rkType='header6'>jbaek7023</RkText>
                <RkText rkType='primary3'> {row.item.description}</RkText>
              </RkText>
            </View>
            <RkText rkType='secondary5 hintColor'>3 min</RkText>
          </View>
        </View>
      </View>
    )
  }

  // Put the Data Srouce Here! notification.photo, type(comment,like), description, time
  render() {
    let mocDataSource = [
      {
        id:1,
        user: {
          photo: 'https://stylee-bucket.s3.amazonaws.com:443/media/profiles/8f69_e540_4816ec121bdf958_999c_d26911.jpeg?Signature=QMcZS0ic6H0uDL%2BVrC3ATuFXB%2Bw%3D&Expires=1511760335&AWSAccessKeyId=AKIAJPOEI4BSXTLWZGMQ'
        },
        type: 'like',
        description:  `liked your 'Blue Jean-Nordstrom' cloth`
      },
      {
        id:2,
        user: {
          photo: 'https://stylee-bucket.s3.amazonaws.com:443/media/profiles/8f69_e540_4816ec121bdf958_999c_d26911.jpeg?Signature=QMcZS0ic6H0uDL%2BVrC3ATuFXB%2Bw%3D&Expires=1511760335&AWSAccessKeyId=AKIAJPOEI4BSXTLWZGMQ'
        },
        type: 'comment',
        description:  `commented your 'Blue Jean-Nordstrom' cloth`
      }
    ]
    return (
      <FlatList
        style={styles.root}
        data={mocDataSource}
        renderItem={this._renderRow}
        keyExtractor={this._keyExtractor}
      />
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base,
    alignItems: 'flex-start'
  },
  avatar: {},
  text: {
    marginBottom: 5,
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0
  },
  mainContent: {
    marginRight: 60
  },
  img: {
    height: 50,
    width: 50,
    margin: 0
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50
  }
}));

export default NotificationScreen;
