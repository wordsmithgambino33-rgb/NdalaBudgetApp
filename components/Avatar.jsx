
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const Avatar = ({ style, children, ...props }) => {
  return (
    <View style={[styles.avatar, style]} {...props}>
      {children}
    </View>
  );
};

const AvatarImage = ({ source, style, ...props }) => {
  return (
    <Image
      source={source}
      style={[styles.avatarImage, style]}
      {...props}
    />
  );
};

const AvatarFallback = ({ style, children, ...props }) => {
  return (
    <View style={[styles.avatarFallback, style]} {...props}>
      <Text style={styles.fallbackText}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: '#333333',
  },
});

export { Avatar, AvatarImage, AvatarFallback };