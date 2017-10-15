import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import {
  RkCard,
  RkText,
  RkStyleSheet
} from 'react-native-ui-kitten';
import { Avatar } from '../../components/Avatar';
import { SocialBar } from '../../components/SocialBar';
import TimeAgo from 'react-native-timeago';

class OutfitDetail extends Component {
  static navigationOptions = {
    title: 'OUTFIT DETAIL'
  };

  componentWillMount() {
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

  render () {
    const detail = this.props.outfitDetail;

    // User Access Not Yet
    if(detail) {
      return (
        <ScrollView style={styles.root}>
          <RkCard rkType='article'>
            <Image rkCardImg source={{uri: detail.outfit_img}}/>
            <View rkCardHeader>
              <View>
                <RkText style={styles.title} rkType='header4'>{detail.user.username}</RkText>
                <RkText rkType='secondary2 hintColor'><TimeAgo time={detail.publish}/></RkText>
              </View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileV1', {id: this.data.id})}>
                <Avatar rkType='circle' img={{uri: detail.user.image}}/>
              </TouchableOpacity>
            </View>
            <View rkCardContent>
              <View>
                <RkText rkType='primary3 bigLine'>{detail.content}</RkText>
              </View>
            </View>
            <View rkCardFooter>
              <SocialBar/>
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
    marginBottom: 5
  },
}));

export default connect(mapStateToProps, actions)(OutfitDetail);
