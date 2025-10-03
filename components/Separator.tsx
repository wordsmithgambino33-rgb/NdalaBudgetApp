
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { cn } from './utils';

interface SeparatorProps {
  className?: any;
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

export const Separator: React.FC<SeparatorProps> = ({
  className,
  orientation = 'horizontal',
  decorative = true,
}) => {
  return (
    <View
      style={StyleSheet.flatten([
        styles.separator,
        orientation === 'horizontal' ? styles.horizontal : styles.vertical,
        className ? cn(className) : {},
      ])}
  accessibilityRole={decorative ? ('none' as any) : ('separator' as any)}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#ccc',
  },
  horizontal: {
    height: 1,
    width: '100%',
  },
  vertical: {
    width: 1,
    height: '100%',
  },
});