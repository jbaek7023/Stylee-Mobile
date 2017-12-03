import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
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
import { width, height } from 'react-native-dimension';

class SocialBar extends RkComponent {
  componentName = 'SocialBar';

  typeMapping = {
    container: {},
    section: {},
    icon: {},
    label: {}
  };

  _renderHeart = (like) => {
    let {section, icon, label} = this.defineStyles();
    let { oid } = this.props;

    if (like) {
      return (
        <View style={section}>
          <RkButton rkType='clear' style={styles.buttonStyle} onPress={()=>this.props.handleUnlikePress(oid)}>
            <RkText rkType='awesome primary' style={icon}>{FontAwesome.heart}</RkText>
            <RkText rkType='primary4 primary' style={{marginTop: 5}}>Like</RkText>
          </RkButton>
        </View>
      );
    }
    return (
      <View style={section}>
        <RkButton rkType='clear' style={styles.buttonStyle} onPress={()=>this.props.handleLikePress(oid)}>
          <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.hearto}</RkText>
          <RkText rkType='primary4 hintColor' style={{marginTop: 5}}>Like</RkText>
        </RkButton>
      </View>
    );
  }

  _renderStar = (star) => {
    let {section, icon, label} = this.defineStyles();
    let { oid } = this.props;
    if (star) {
      return (
        <View style={section}>
          <RkButton rkType='clear' style={styles.buttonStyle} onPress={()=>this.props.handleUnbookmarkPress(oid)}>
            <RkText rkType='awesome' style={[icon, {color: '#FF8F00'}]}>{FontAwesome.bookmark}</RkText>
            <RkText rkType='primary4' style={[{marginTop: 5}, {color: '#FF8F00'}]}>Bookmark</RkText>
          </RkButton>
        </View>
      );
    }
    return (
      <View style={section}>
        <RkButton rkType='clear' style={styles.buttonStyle} onPress={()=>this.props.handleBookmarkPress(oid)}>
          <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.bookmarko}</RkText>
          <RkText rkType='primary4 hintColor' style={{marginTop: 5}}>Bookmark</RkText>
        </RkButton>
      </View>
    );
  }

  render() {
    let { oid } = this.props;
    let {container, section, icon, label} = this.defineStyles();
    return (
      <View style={styles.container}>
        {this._renderHeart(this.props.isLiked)}
        <View style={section}>
          <RkButton rkType='clear' style={styles.buttonStyle}
            onPress={()=>this.props.handleCommentPress(oid)}>
            <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.comment}</RkText>
            <RkText rkType='primary4 hintColor' style={{marginTop: 5}}>Comment</RkText>
          </RkButton>
        </View>
        <View style={section}>
          <RkButton rkType='clear' style={styles.buttonStyle}
            onPress={()=>this.props.handleCategoryPress(oid)}>
            <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.category}</RkText>
            <RkText rkType='primary4 hintColor' style={{marginTop: 5}}>Categorize</RkText>
          </RkButton>
        </View>
        {this._renderStar(this.props.isStarred)}
      </View>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    margin: 0,
    padding: 0,
    borderWidth: 0
  },
  buttonStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

function mapStateToProps({auth: {token, hType}}) {
  return { token, hType }
}

export default connect(mapStateToProps, actions)(SocialBar);
