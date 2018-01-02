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

class PrivacyPolicyScreen extends Component {
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
        <Text style={styles.privacyHeader}>Privacy Policy</Text>
        <Text>John Baek built the Stylee app as a Free app. This SERVICE is provided by John Baek at no cost and is intended for use as is.</Text>
        <View style={styles.newLine}/>
        <Text>This page is used to inform website visitors regarding my policies with the collection, use, and disclosure of Personal Information if anyone decided to use my Service.</Text>
        <View style={styles.newLine}/>
        <Text>If you choose to use my Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that I collect is used for providing and improving the Service. I will not use or share your information with anyone except as described in this Privacy Policy. </Text>
        <View style={styles.newLine}/>
        <Text>The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at Stylee unless otherwise defined in this Privacy Policy.</Text>
        <View style={styles.newLine}/>
        <Text style={styles.privacyHeader}>Information Collection and Use</Text>
        <View style={styles.newLine}/>
        <Text>For a better experience, while using our Service, I may require you to provide us with certain personally identifiable information. The information that I request is retained on your device and is not collected by me in any way</Text>
        <View style={styles.newLine}/>
        <Text>The app does use third party services that may collect information used to identify you.</Text>
        <View style={styles.newLine}/>
        <Text>Link to privacy policy of third party service providers used by the app </Text>
        <View style={styles.newLine}/>
          <TouchableOpacity onPress={()=>{this._handleLinkPress('https://www.apple.com/legal/privacy/en-ww/')}}><Text style={styles.linkStyle}>{`\u2022 iOS App Store`}</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>{this._handleLinkPress('https://www.google.com/policies/privacy/')}}><Text style={styles.linkStyle}>{`\u2022 Google Play Services`}</Text></TouchableOpacity>
        <View style={styles.newLine}/>
        <Text style={styles.privacyHeader}>Log Data</Text>
        <View style={styles.newLine}/>
        <Text> I want to inform you that whenever you use my Service, in a case of an error in the app I collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing my Service, the time and date of your use of the Service, and other statistics.</Text>
        <View style={styles.newLine}/>
        <Text>{`This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collection information and to improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.`}</Text>
        <View style={styles.newLine}/>
        <Text style={styles.privacyHeader}>Service Providers</Text>
        <View style={styles.newLine}/>
        <Text>{"I may employ third-party companies and individuals due to the following reasons:"}</Text>
        <View style={styles.newLine}/>
        <Text>{`\u2022 To facilitate our Service;`}</Text>
        <Text>{`\u2022 To provide the Service on our behalf`}</Text>
        <Text>{`\u2022 To perform Service-related services or `}</Text>
        <Text>{`\u2022 To assist us in analyzing how our Service is used `}</Text>
        <Text>{`\u2022 I want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.`}</Text>
        <View style={styles.newLine}/>

        <Text style={styles.privacyHeader}>Security</Text>

        <Text>
          {`I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100 percent secure and reliable, and I cannot guarantee its absolute security.`}
        </Text>
        <View style={styles.newLine}/>

        <Text style={styles.privacyHeader}>Links to Other Sites</Text>
        <View style={styles.newLine}/>
        <Text>{`This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by me. Therefore, I strongly advise you to review the Privacy Policy of these websites. I have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.`}</Text>
        <View style={styles.newLine}/>
        <Text style={styles.privacyHeader}>{`Children’s Privacy`}</Text>
        <View style={styles.newLine}/>
        <Text>
        {`These Services do not address anyone under the age of 13.
        I do not knowingly collect personally identifiable information from children under 13.
         In the case I discover that a child under 13 has provided me with personal information,
         I immediately delete this from our servers.
         If you are a parent or guardian and you are aware that your child has provided us with personal information,
         please contact me so that I will be able to do necessary actions.`}
         </Text>
        <View style={styles.newLine}/>
        <Text style={styles.privacyHeader}>Changes to This Privacy Policy</Text>
        <View style={styles.newLine}/>
        <Text>{`I may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting  the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.`}</Text>
        <View style={styles.newLine}/>
        <Text style={styles.privacyHeader}>Contact Us</Text>
        <View style={styles.newLine}/>
        <Text>If you have any questions or suggestions about my Privacy Policy, do not hesitate to contact me.</Text>
        <View style={styles.newLine}/>
        <Text>This privacy policy page was created at</Text>
        <TouchableOpacity onPress={
          ()=>{
            this._handleLinkPress("https://privacypolicytemplate.net")
          }
        }>
          <Text style={styles.linkStyle}>{"privacypolicytemplate.net"}</Text>
        </TouchableOpacity>
        <Text>{"and modified/generated by "}</Text>
        <TouchableOpacity onPress={
          ()=>{ this._handleLinkPress("https://app-privacy-policy-generator.firebaseapp.com/") }
        }>
          <Text style={styles.linkStyle}>App Privacy Policy Generator</Text>
        </TouchableOpacity>
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

export default PrivacyPolicyScreen;
