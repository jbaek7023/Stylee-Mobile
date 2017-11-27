import React from 'react';
import {
  View
} from 'react-native';
import {
  RkText,
  RkButton,
  RkComponent,
  RkStyleSheet
} from 'react-native-ui-kitten';
import { FontAwesome } from '../../assets/icons';

export class SocialThreeBar extends RkComponent {
  componentName = 'SocialBar';

  state = {
    like: this.props.isLiked,
    star: this.props.isStarred
  }

  typeMapping = {
    container: {},
    section: {},
    icon: {},
    label: {}
  };

  _handleLikePress = () => {
    if(this.state.like) {
      this.setState({like:false})
    } else {
      this.setState({like:true})
    }
  }

  _handleBookmarkPress = () => {
    if(this.state.star) {
      this.setState({star:false})
    } else {
      this.setState({star:true})
    }
  }

  _renderHeart = (like) => {
    let {section, icon, label} = this.defineStyles();
    if (like) {
      return (
        <View style={section}>
          <RkButton rkType='clear' onPress={this._handleLikePress}>
            <RkText rkType='awesome primary' style={icon}>{FontAwesome.heart}</RkText>
            <RkText rkType='primary4 primary' style={[label, {marginTop: 5}]}>Like</RkText>
          </RkButton>
        </View>
      );
    }
    return (
      <View style={section}>
        <RkButton rkType='clear' onPress={this._handleLikePress}>
          <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.hearto}</RkText>
          <RkText rkType='primary4 hintColor' style={[label, {marginTop: 5}]}>Like</RkText>
        </RkButton>
      </View>
    );
    // Like 일때 글자수 맞춰야함. 'Like ''이렇게 스페이스로 넣던지해야함.
    // container와 buttonStyle 에 파랑핑크로 테스트해보면 암
  }

  _renderStar = (star) => {
    let {section, icon, label} = this.defineStyles();
    if (star) {
      return (
        <View style={section}>
          <RkButton rkType='clear'  onPress={this._handleBookmarkPress}>
            <RkText rkType='awesome' style={[icon, {color: '#FF8F00'}]}>{FontAwesome.bookmark}</RkText>
            <RkText rkType='primary4' style={[label, {marginTop: 5, color: '#FF8F00'}]}>Bookmark</RkText>
          </RkButton>
        </View>
      );
    }
    return (
      <View style={section}>
        <RkButton rkType='clear' onPress={this._handleBookmarkPress}>
          <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.bookmarko}</RkText>
          <RkText rkType='primary4 hintColor' style={[label, {marginTop: 5}]}>Bookmark</RkText>
        </RkButton>
      </View>
    );

  }

  render() {
    let {container, section, icon, label} = this.defineStyles();

    return (
      <View style={container}>
        {this._renderHeart(this.state.like)}
        <View style={section}>
          <RkButton rkType='clear' onPress={()=>{this.props.handleCommentPress()}}>
            <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.comment}</RkText>
            <RkText rkType='primary4 hintColor' style={[label, {marginTop: 5}]}>Comment</RkText>
          </RkButton>
        </View>
        {this._renderStar(this.state.star)}
      </View>
    )
  }
}
