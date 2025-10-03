
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { cn } from './utils';

interface ProgressProps {
  className?: string;
  value?: number;
}

export const Progress: React.FC<ProgressProps> = ({ className, value = 0 }) => {
  return (
    <View style={StyleSheet.flatten([styles.progress, className ? cn(className) : {}])}>
      <View
        style={StyleSheet.flatten([
          styles.indicator,
          { width: `${Math.min(Math.max(value, 0), 100)}%` },
        ])}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progress: {
    height: 8,
    width: '100%',
    backgroundColor: 'rgba(0, 128, 0, 0.2)', // Green with opacity
    borderRadius: 4,
    overflow: 'hidden',
  },
  indicator: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 4,
  },
});