import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { View, Text, Image } from 'react-native';
import { Container, Content, Button, Card, CardItem, Left, Thumbnail, Body, Icon, Right } from 'native-base';
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
        <Container>
          <Content>
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: detail.user.image}} />
                  <Body>
                    <Text>{detail.user.username}</Text>
                    <Text note>{detail.user.username}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={{uri: detail.cloth_image}} style={{height: 400, width: null, flex: 1}}/>
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent>
                    <Icon active name="thumbs-up" />
                    <Text>{detail.like_count} Likes</Text>
                  </Button>
                </Left>
                <Body>
                  <Button transparent>
                    <Icon active name="chatbubbles" />
                    <Text>{(detail.comment_count-2)} Comments</Text>
                  </Button>
                </Body>
                <Right>
                  <Text><TimeAgo time={detail.detail.publish}/></Text>
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Text>{detail.content}</Text>
                </Left>
              </CardItem>
            </Card>
          </Content>
        </Container>
      );
    }
    return (<View><Text>Loading</Text></View>);


  }
}

function mapStateToProps({auth: {token, hType}, wardrobe: {clothDetail}}) {
  return { token, hType, clothDetail}
}

export default connect(mapStateToProps, actions)(ClothDetail);
