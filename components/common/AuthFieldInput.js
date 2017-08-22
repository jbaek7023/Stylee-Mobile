import React from 'react';
import { Item, Label, Input, Text } from 'native-base';

const AuthFieldInput = ({ label, value, onChangeText, placeholder, secureTextEntry, returnKeyType }) => {
  return (
    <Item>
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
        returnKeyType={returnKeyType}
      />
    </Item>
  );
};

export { AuthFieldInput };
