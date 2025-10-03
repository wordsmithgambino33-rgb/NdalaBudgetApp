
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { cn } from './utils';

interface SkeletonProps {
  className?: string;
  style?: any;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, style }) => {
  return (
    <View
      style={StyleSheet.flatten([
        styles.skeleton,
        className ? cn(className) : {},
        style,
      ])}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
});