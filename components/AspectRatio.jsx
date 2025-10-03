
import React from 'react';
import { View, StyleSheet } from 'react-native';

const AspectRatio = ({ ratio = 1, style, children, ...props }) => {
  return (
    <View
      style={[styles.container, { aspectRatio: ratio }, style]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export { AspectRatio };