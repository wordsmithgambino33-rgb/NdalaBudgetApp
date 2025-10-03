import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { cn } from './utils';

interface InputProps extends React.ComponentProps<typeof TextInput> {
  className?: string;
  type?: string;
}

export const Input: React.FC<InputProps> = ({ className, type = 'text', ...props }) => {
  return (
    <TextInput
      keyboardType={type === 'number' ? 'numeric' : 'default'}
      style={StyleSheet.flatten([
        styles.input,
        className ? (cn(className) as any) : {},
      ])}
      placeholderTextColor="#999"
      editable={typeof props.editable === 'boolean' ? props.editable : true}
      {...(props as any)}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#000',
  },
});