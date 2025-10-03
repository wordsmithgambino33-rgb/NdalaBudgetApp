
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const buttonVariants = {
  default: {
    backgroundColor: '#007bff',
    color: '#ffffff',
  },
  destructive: {
    backgroundColor: '#ff3333',
    color: '#ffffff',
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: '#333333',
    color: '#333333',
    borderWidth: 1,
  },
  secondary: {
    backgroundColor: '#6c757d',
    color: '#ffffff',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: '#333333',
  },
  link: {
    backgroundColor: 'transparent',
    color: '#007bff',
    textDecorationLine: 'underline',
  },
};

const buttonSizes = {
  default: {
    height: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sm: {
    height: 32,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  lg: {
    height: 48,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  icon: {
    height: 40,
    width: 40,
  },
};

const Button = ({ variant = 'default', size = 'default', style, children, disabled, ...props }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonVariants[variant],
        buttonSizes[size],
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled}
      {...props}
    >
      <Text style={[styles.buttonText, { color: buttonVariants[variant].color }]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  disabled: {
    opacity: 0.5,
  },
});

export { Button };