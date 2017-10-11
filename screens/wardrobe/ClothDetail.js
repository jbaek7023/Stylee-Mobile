import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { TouchableOpacity, View, Text, Image, ScrollView } from 'react-native';
import {
  RkCard,
  RkText,
  RkStyleSheet
} from 'react-native-ui-kitten';
import { Avatar } from '../../components/Avatar';
import { SocialBar } from '../../components/SocialBar';
import TimeAgo from 'react-native-timeago';


class ClothDetail extends Component {
  componentWillMount() {
    const { id } = this.props.navigation.state.params;
    const { token, hType} = this.props;
    this.props.fetchClothDetail(token, hType, id);
  }

  // categories, comment_count,
  //   comments, content, gender, id,
  //   like_count, liked, location, outfit_img,
  //   publish, tagged_clothes, updated, user

  render () {
    const detail = this.props.clothDetail;
    if(detail) {
      return (
        <ScrollView style={styles.root}>
          <RkCard rkType='article'>
            <Image rkCardImg source={{uri: detail.cloth_image}}/>
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
          </RkCard>
        </ScrollView>
      );
    }
    return (<View><Text>Loading</Text></View>);


  }
}

function mapStateToProps({auth: {token, hType}, wardrobe: {clothDetail}}) {
  return { token, hType, clothDetail}
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  title: {
    marginBottom: 5
  },
}));

export default connect(mapStateToProps, actions)(ClothDetail);
