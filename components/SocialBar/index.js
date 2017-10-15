import React from 'react';
import {
  View
} from 'react-native';
import {
  RkText,
  RkButton,
  RkComponent
} from 'react-native-ui-kitten';
import { FontAwesome } from '../../assets/icons';

export class SocialBar extends RkComponent {
  componentName = 'SocialBar';
  typeMapping = {
    container: {},
    section: {},
    icon: {},
    label: {}
  };

  render() {
    let {container, section, icon, label} = this.defineStyles();

    return (
      <View style={container}>
        <View style={section}>
          <RkButton rkType='clear'>
            <RkText rkType='awesome primary' style={icon}>{FontAwesome.heart}</RkText>
            <RkText rkType='primary primary4' style={label}>좋아요</RkText>
          </RkButton>
        </View>
        <View style={section}>
          <RkButton rkType='clear'>
            <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.comment}</RkText>
            <RkText rkType='primary4 hintColor' style={label}>댓글달기</RkText>
          </RkButton>
        </View>
        <View style={section}>
          <RkButton rkType='clear'>
            <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.user}</RkText>
            <RkText rkType='primary4 hintColor' style={label}>저장</RkText>
          </RkButton>
        </View>
      </View>
    )
  }
}
