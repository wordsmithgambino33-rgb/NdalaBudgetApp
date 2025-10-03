
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { cn } from './utils';

interface ScrollAreaProps {
  className?: string;
  children: React.ReactNode;
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({ className, children }) => {
  return (
    <ScrollView
      style={StyleSheet.flatten([styles.scrollArea, className ? cn(className) : {}])}
      contentContainerStyle={styles.contentContainer}
    >
      <View>{children}</View>
    </ScrollView>
  );
};

const ScrollBar: React.FC = () => {
  return null; // ScrollView handles scrollbars natively
};

const styles = StyleSheet.create({
  scrollArea: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

// Named exports are declared above; no additional re-export needed.