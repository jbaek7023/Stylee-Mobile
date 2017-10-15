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
      title: '알림',
      header: (headerProps) => {
        return <ThemedNavigationBar navigation={navigation} headerProps={headerProps}/>
      },
    });

  _keyExtractor = (item, index) => item.id;

  _renderRow = (row) => {
    let username = `${row.user.firstName} ${row.user.lastName}`;
    let hasAttachment = row.attach !== undefined;
    let attachment = <View/>;

    let mainContentStyle;
    if (hasAttachment) {
      mainContentStyle = styles.mainContent;
      attachment =
        <Image style={styles.attachment} source={row.attach}/>
    }
    return (
      <View style={styles.container}>
        <Avatar img={row.user.photo}
                rkType='circle'
                style={styles.avatar}
                badge={row.type}/>
        <View style={styles.content}>
          <View style={mainContentStyle}>
            <View style={styles.text}>
              <RkText>
                <RkText rkType='header6'>{username}</RkText>
                <RkText rkType='primary2'> {row.description}</RkText>
              </RkText>
            </View>
            <RkText rkType='secondary5 hintColor'>{moment().add(row.time, 'seconds').fromNow()}</RkText>
          </View>
          {attachment}
        </View>
      </View>
    )
  }

  // Put the Data Srouce Here! notification.photo, type(comment,like), description, time
  render() {
    return (
      <FlatList
        style={styles.root}
        data={null}
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
