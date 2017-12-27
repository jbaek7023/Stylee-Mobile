import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableWithoutFeedback, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { width, height, totalSize } from 'react-native-dimension';
import * as actions from '../../actions';
import { RkText } from 'react-native-ui-kitten';
import { Spinner } from 'native-base';
import { thresholdLength } from '../../utils/scale';

class EtcScreen extends Component {
  state = {
    isLoading: true,
    refreshing: false,
  }

  componentWillMount() {
    if(this.props.token) {
      this.props.fetchEtcsAll(this.props.token, this.props.hType);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.etcs !== nextProps.etcs) {
      // loading순간으로 바꿔야할수도... loading했는데 empty면 얻허게 할꺼야?
      this.setState({isLoading: false});
    }
  }

  _onEndReachedThreshold = () => {
    let { token, hType, nextUri } = this.props;
    if(nextUri) {
      this.props.fetchEtcsNextAll(token, hType, nextUri);
    }
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.fetchEtcsAll(this.props.token, this.props.hType).then((data)=>{
      this.setState({refreshing: false})
    })
  }


  _handleImagePress = (id) => {
    this.props.navigation.navigate('ClothDetail', {id})
  }

  _keyExtractor = (item, index) => item.id;


  _renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => this._handleImagePress(item.id)}>
        <Image
          fadeDuration={0}
          key={item.id}
          source={{uri: item.cloth_image}}
          style={styles.rowImage}
          resizeMode="cover"
        />
      </TouchableWithoutFeedback>
    );
  }


  // ToDo: AppLoading
  render() {
    if(this.state.isLoading) {
      return (
        <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
          <Spinner color='#6F3AB1'/>
        </View>
      );
    }

    if(this.props.etcs && this.props.etcs.length==0) {
      return (
        <View style={{ flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            fadeDuration={0}
            style={styles.imageStyle} source={require('../../assets/images/outerwear.png')}/>
          <RkText style={styles.imageBottomText} rkType="header5 hintColor">Your Outwerwear will be stored here</RkText>
        </View>
      );
    }
    return (
      <View style={{ flex:1 }}>
        <ScrollView automaticallyAdjustContentInsets={false}>
          <FlatList
            data={this.props.etcs}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            numColumns={3}
            refreshControl={
              <RefreshControl
                refreshing = {this.state.refreshing}
                onRefresh = {()=>this._onRefresh()}
              />
            }
            onEndReachedThreshold={thresholdLength}
            onEndReached = {()=>{
              this._onEndReachedThreshold()
            }}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rowImage:{
    width:width(33),
    height:width(33),
    borderWidth:.5,
    borderColor:'#fff'
  },
  imageStyle: {
    width: width(30),
    height: width(30),
  },
  imageBottomText: {
    width: width(70),
    marginLeft: 23,
  }
});

function mapStateToProps({auth: {token, hType}, wardrobe: {etcs, etcsNextUri}}) {
  return {token, hType, etcs, nextUri: etcsNextUri}
}

export default connect(mapStateToProps, actions)(EtcScreen);
