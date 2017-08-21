import React from 'react';
import { Item, Label, Input, Text } from 'native-base';

const AuthFieldInput = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  return (
    <Item>
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
      />
    </Item>
  );
};

export { AuthFieldInput };
