import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { RkText } from 'react-native-ui-kitten';
import _ from 'lodash';

class LikeAndComment extends Component {

  render() {
    let { likeCount, commentCount } = this.props;
    if(!_.isNil(likeCount)) {
      if(likeCount==0) {
        if(commentCount==0) { return (<View />); }
        return (
          <View style={{paddingVertical: 5, paddingLeft:17, flexDirection: 'row', borderTopWidth: 1.5, borderColor: '#e3e3e3',}}>
            <TouchableOpacity onPress={()=>this.props.handleCommentPress()}>
             <RkText rkType="secondary2 hintColor">{commentCount.toString()} Comment</RkText>
            </TouchableOpacity>
          </View>
        );
      }
      if(commentCount==0) {
        return (
          <View style={{paddingVertical: 5, paddingLeft:17, flexDirection: 'row', borderTopWidth: 1.5, borderColor: '#e3e3e3',}}>
            <TouchableOpacity onPress={()=>this.props.handleTheNumberOfLikePress()}>
              <RkText rkType="secondary2 hintColor">{likeCount.toString()} Like</RkText>
            </TouchableOpacity>
          </View>
        );
      }
      return (
        <View style={{paddingVertical: 5, paddingLeft:17, flexDirection: 'row', borderTopWidth: 1.5, borderColor: '#e3e3e3',}}>
          <TouchableOpacity onPress={()=>this.props.handleTheNumberOfLikePress()}>
            <RkText rkType="secondary2 hintColor">{likeCount.toString()} Like</RkText>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.props.handleCommentPress()}>
           <RkText rkType="secondary2 hintColor" style={{marginLeft: 13}}>{commentCount.toString()} Comment</RkText>
          </TouchableOpacity>
        </View>
      );
    }
    return <View />;
  }

}

export default LikeAndComment;
