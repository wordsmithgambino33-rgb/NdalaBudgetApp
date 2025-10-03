
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { cn } from './utils';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <View
      style={StyleSheet.flatten([
        styles.skeleton,
        className ? cn(className) : {},
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