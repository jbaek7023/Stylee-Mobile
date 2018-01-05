import React from 'react';
import { Item, Label, Input, Text } from 'native-base';

const AuthFieldInput = ({ label, value, onChangeText, placeholder, secureTextEntry, returnKeyType, onSubmitEditing }) => {
  return (
    <Item>
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
      />
    </Item>
  );
};

export { AuthFieldInput };
