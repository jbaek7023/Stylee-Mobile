import React from 'react';
import { Fab, Icon, Button } from 'native-base';

const FABs = ({active}) => {
  return (
    <Fab
      active={active}
      direction="up"
      containerStyle={{ }}
      style={{ backgroundColor: '#5067FF' }}
      position="bottomRight"
      onPress={() => this.setState({ active: !this.state.active })}>
      <Icon name="share" />
      <Button style={{ backgroundColor: '#34A34F' }}>
        <Icon name="logo-whatsapp" />
      </Button>
      <Button style={{ backgroundColor: '#3B5998' }}>
        <Icon name="logo-facebook" />
      </Button>
      <Button disabled style={{ backgroundColor: '#DD5144' }}>
        <Icon name="mail" />
      </Button>
    </Fab>
  );
}

export { FABs };
