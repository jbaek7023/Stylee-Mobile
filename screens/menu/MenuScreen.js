import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text} from 'native-base';

class MenuScreen extends Component {
  static navigationOptions = {
    title: 'Menu',
    header: null,
    headerMode: 'none',
    navigationOptions: {
      header: null
    }
  }

  _drawModal = () => {
    return (
      <View><Text>modalHere</Text></View>
    );
  }

  render() {
    var items = ['John Baek','Language', 'Calendar','Logout'];
    return (
      <Container>
        <Content>
          <List dataArray={items}
            renderRow={(item) =>
              <ListItem>
                <Text>{item}</Text>
              </ListItem>
            }>
          </List>
        </Content>
        {this._drawModal()}
      </Container>
    );

  }
}

export default MenuScreen;
