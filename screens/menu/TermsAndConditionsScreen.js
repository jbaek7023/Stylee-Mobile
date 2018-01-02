import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import { RkButton, RkText } from 'react-native-ui-kitten';
import { WebBrowser } from 'expo';
import {FontAwesome} from '../../assets/icons';

class TermsAndConditionsScreen extends Component {
  static navigationOptions = {
    title: 'Menu',
    tabBarVisible: false,
    header: null,
  };

  _handleLinkPress = (link) => {
    WebBrowser.openBrowserAsync(link);
  }

  _renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerLayout}>
          <RkButton
            rkType='clear'
            style={styles.menu}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <RkText rkType='awesome hero'>{FontAwesome.chevronLeft}</RkText>
          </RkButton>
          <View rkCardHeader style={styles.left}>
            <View style={styles.content}>
              <View style={styles.contentHeader}>
                <RkText rkType='header3'>PRIVACY POLICY</RkText>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  _renderPrivacyContent = () => {
    return (
      <View style={styles.privacyContainer}>
        <Text>{`By downloading or using the app, these terms will automatically apply to you – you should make sure therefore that you read them carefully before using the app. We are offering you this app to use for your own personal use without cost, but you should be aware that you cannot send it on to anyone else, and you’re not allowed to copy, or modify the app, any part of the app, or our trademarks in any way. You’re not allowed to attempt to extract the source code of the app, and you also shouldn’t try to translate the app into other languages, or make derivative versions. The app itself, and all the trade marks, copyright, database rights and other intellectual property rights related to it, still belong to Stylee.`}</Text>
        <View style={styles.newLine}/>
        <Text>{`At the bottom of these terms and conditions you will be able to find links to our website where we set out our Privacy Policy and Terms and Conditions for passengers and baggage, which will be relevant if you use the app to book flights with Stylee in the future.`}</Text>
        <View style={styles.newLine}/>
        <Text>{`Stylee is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason. `}</Text>
        <View style={styles.newLine}/>
        <Text>{`The Stylee app stores and processes personal data that you have provided to us so that you can see the images and information of your clothes and your fashion styles at any places`}</Text>
        <View style={styles.newLine}/>
        <Text>{`If you’re using the app outside of an area with Wi-Fi, you should remember that your terms of agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third party charges. In using the app, you’re accepting responsibility for any such charges, including roaming data charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. If you are not the bill payer for the device on which you’re using the app, please be aware that we assume that you have received permission from the bill payer for using the app.`}</Text>
        <View style={styles.newLine}/>
        <Text>{`At some point we may wish to update the app. The app is currently available on Android and iOS – the requirements for both systems (and for any additional systems we decide to extend the availability of the app to) may change, and you’ll need to download the updates if you want to keep using the app. Stylee does not promise that it will always update the app so that it is relevant to you and/or works with the iOS/Android version that you have installed on your device. However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the app, and (if needed) delete it from your device.`}</Text>
        <View style={styles.newLine}/>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex:1}}>
        {this._renderHeader()}
        <ScrollView>
          {this._renderPrivacyContent()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  linkStyle: {
    color: 'blue'
  },
  header: {
    height: 30,
  },
  newLine: {
    height:5,
  },
  bold: {
    fontWeight: 'bold'
  },
  privacyHeader: {
    fontWeight: 'bold',
    fontSize: 18,
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
    backgroundColor: '#FFFFFF'
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  menu: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  contentHeader: {
    justifyContent: 'space-between',
    paddingLeft: 10
  },
  privacyContainer: {
    padding: 13,
    backgroundColor: '#FFFFFF'
  }
});

export default TermsAndConditionsScreen;
