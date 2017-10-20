import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {
  RkCard,
  RkText,
  RkStyleSheet,
  RkButton
} from 'react-native-ui-kitten';
import { Avatar } from '../../components/Avatar';
import { SocialBar } from '../../components/SocialBar';
import TimeAgo from 'react-native-timeago';
import {FontAwesome} from '../../assets/icons';
import { Dimensions } from 'react-native';
import Image from 'react-native-scalable-image';

class OutfitDetail extends Component {
  static navigationOptions = ({navigation}) => ({
    headerLeft: (
      <RkButton
        rkType='clear'
        style={{width: 50}}
        onPress={() => {
          navigation.goBack();

        }}>
        <RkText style={{color: 'black'}} rkType='awesome hero'>{FontAwesome.chevronLeft}</RkText>
      </RkButton>
		),
    headerRight: (
      <RkButton
        rkType='clear'
        style={{width: 42}}
        onPress={() => {
          navigation.goBack()
        }}>
        <RkText style={{color: 'black'}} rkType='awesome hero'>{FontAwesome.menu}</RkText>
      </RkButton>
    )
  });

  componentDidMount() {
    const { id } = this.props.navigation.state.params;
    const { token, hType} = this.props;
    this.props.fetchOutfitDetail(token, hType, id);
  }

  _renderComments = (comments) => {
    let result = comments.map(( obj, index ) => {
      return (<Text key={index}><Text style={{fontWeight: 'bold'}}>{obj.user.username}</Text> {obj.content}</Text>);
    });

    return result;
    // obj.id, obj.user.image, obj.user.id, obj.content, obj.publish, obj.updated, obj.reply_count
  }

  // categories, comment_count,
  //   comments, content, gender, id,
  //   like_count, liked, location, outfit_img,
  //   publish, tagged_clothes, updated, user

  _handleCommentPress = () => {
    const { id } = this.props.navigation.state.params;
    this.props.navigation.navigate('Comments', {id, postType: 1});
  }

  _renderAvatar = (uri) => {
    if(_.isNil(uri)) {
      return (<Avatar rkType='circle' style={styles.avatar} img={require('../../assets/images/robot-dev.png')}/>)
    }
    return (
      <Avatar rkType='circle' style={styles.avatar} img={{uri}}/>
    );
  }

  render () {
    const detail = this.props.outfitDetail;

    // User Access Not Yet
    if(detail) {
      return (
        <ScrollView style={styles.root}>
          <RkCard rkType='article'>
            <View style={styles.container}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {id: userId})}>
                {this._renderAvatar(detail.user.image)}
              </TouchableOpacity>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <RkText rkType='header5'>{detail.user.username}</RkText>
                  <RkText rkType='secondary4 hintColor'>
                    <TimeAgo time={detail.publish}/>
                  </RkText>
                </View>
                <RkText rkType='primary3 mediumLine'>{detail.content}</RkText>
              </View>
            </View>
            <Image width={Dimensions.get('window').width} source={{uri: detail.outfit_img}} />
            <View rkCardContent>
              <SocialBar/>
            </View>

            <View rkCardContent>
              <View>
                <RkText rkType='primary3 bigLine'>{detail.content}</RkText>
              </View>
            </View>
            <View rkCardContent>
              <View>
                {this._renderComments(detail.comments)}
                <RkText
                  onPress={this._handleCommentPress}
                  rkType='secondary2 hintColor'>댓글8개 모두보기</RkText>
              </View>
            </View>



          </RkCard>
        </ScrollView>
      );
    }
    return (<View><Text>Loading</Text></View>);
  }
}

function mapStateToProps({auth: {token, hType}, outfit: {outfitDetail}}) {
  return { token, hType, outfitDetail}
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  title: {
    marginBottom: 5,
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
}));

export default connect(mapStateToProps, actions)(OutfitDetail);
