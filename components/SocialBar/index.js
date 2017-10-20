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

export class SocialBar extends RkComponent {
  componentName = 'SocialBar';

  state = {
    like: false,
    star: false
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
          <RkButton rkType='clear' style={styles.buttonStyle} onPress={this._handleLikePress}>
            <RkText rkType='awesome primary' style={icon}>{FontAwesome.heart}</RkText>
            <RkText rkType='primary4 primary' style={[label, {marginTop: 5}]}>좋아요 </RkText>
          </RkButton>
        </View>
      );
    }
    return (
      <View style={section}>
        <RkButton rkType='clear' style={styles.buttonStyle} onPress={this._handleLikePress}>
          <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.hearto}</RkText>
          <RkText rkType='primary4 hintColor' style={[label, {marginTop: 5}]}>좋아요 </RkText>
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
          <RkButton rkType='clear' style={styles.buttonStyle} onPress={this._handleBookmarkPress}>
            <RkText rkType='awesome' style={[icon, {color: '#FF8F00'}]}>{FontAwesome.bookmark}</RkText>
            <RkText rkType='primary4' style={[label, {marginTop: 5, color: '#FF8F00'}]}>북마크 </RkText>
          </RkButton>
        </View>
      );
    }
    return (
      <View style={section}>
        <RkButton rkType='clear' style={styles.buttonStyle} onPress={this._handleBookmarkPress}>
          <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.bookmarko}</RkText>
          <RkText rkType='primary4 hintColor' style={[label, {marginTop: 5}]}>북마크 </RkText>
        </RkButton>
      </View>
    );

  }

  render() {
    let {container, section, icon, label} = this.defineStyles();

    return (
      <View style={styles.container}>
        {this._renderHeart(this.state.like)}

        <View style={section}>
          <RkButton rkType='clear' style={styles.buttonStyle}>
            <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.comment}</RkText>
            <RkText rkType='primary4 hintColor' style={[label, {marginTop: 5}]}>댓글달기 </RkText>
          </RkButton>
        </View>
        <View style={section}>
          <RkButton rkType='clear' style={styles.buttonStyle}>
            <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.category}</RkText>
            <RkText rkType='primary4 hintColor' style={[label, {marginTop: 5}]}>카테고리 </RkText>
          </RkButton>
        </View>
        {this._renderStar(this.state.star)}
      </View>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    margin: 0,
  },
  buttonStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));
