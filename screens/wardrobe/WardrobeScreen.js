import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FABs } from '../../components/common/FABs';
import { Tabs, Tab, TabHeading } from 'native-base';

import { connect } from 'react-redux';
import * as actions from '../../actions';

import TopScreen from './TopScreen';
import OutwearScreen from './OutwearScreen';
import BottomScreen from './BottomScreen';
import ShoeScreen from './ShoeScreen';
import EtcScreen from './EtcScreen';

class WardrobeScreen extends Component {
  static navigationOptions = {
    title: 'Wardrobe'
  }

  state = {
    active: false
  }

  componentWillMount() {
    this.props.fetchClothesAll(this.props.token, this.props.hType);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Tabs initialPage={0}>
          <Tab heading={<TabHeading><Text style={styles.tabHeadingStyle}>Tops</Text></TabHeading>}>
            <TopScreen clothes={this.props.tops} navigation={this.props.navigation}/>
          </Tab>
          <Tab heading={<TabHeading><Text style={styles.tabHeadingStyle}>Outers</Text></TabHeading>}>
            <OutwearScreen clothes={this.props.outwears} navigation={this.props.navigation}/>
          </Tab>
          <Tab heading={<TabHeading><Text style={styles.tabHeadingStyle}>Bottoms</Text></TabHeading>}>
           <BottomScreen clothes={this.props.bottoms} navigation={this.props.navigation}/>
          </Tab>
          <Tab heading={<TabHeading><Text style={styles.tabHeadingStyle}>Shoes</Text></TabHeading>}>
            <ShoeScreen clothes={this.props.shoes} navigation={this.props.navigation}/>
          </Tab>
          <Tab heading={<TabHeading><Text style={styles.tabHeadingStyle}>ETC</Text></TabHeading>}>
            <EtcScreen clothes={this.props.etcs} navigation={this.props.navigation}/>
          </Tab>
        </Tabs>
        <FABs
          active={this.state.active}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabHeadingStyle: {
    color: 'white'
  }
});

function mapStateToProps({auth: {token, hType}, wardrobe: {clothesList}}) {
  let tops = clothesList.filter((item) =>  item.big_cloth_type === 't');
  let outwears = clothesList.filter((item) =>  item.big_cloth_type === 'o');
  let bottoms = clothesList.filter((item) =>  item.big_cloth_type === 'b');
  let shoes = clothesList.filter((item) =>  item.big_cloth_type === 's');
  let etcs = clothesList.filter((item) =>  item.big_cloth_type === 'e');

  return {
    token,
    hType,
    tops,
    outwears,
    bottoms,
    shoes,
    etcs
  };
}

export default connect(mapStateToProps, actions)(WardrobeScreen);
