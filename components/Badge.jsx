
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const badgeVariants = {
  default: {
    backgroundColor: '#007bff',
    color: '#ffffff',
  },
  secondary: {
    backgroundColor: '#6c757d',
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
  },
};

const Badge = ({ variant = 'default', style, children, ...props }) => {
  return (
    <View
      style={[
        styles.badge,
        badgeVariants[variant],
        style,
      ]}
      {...props}
    >
      <Text style={styles.badgeText}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export { Badge };