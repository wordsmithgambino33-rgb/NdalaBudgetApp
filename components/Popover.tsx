
"use client";

import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { cn } from './utils';

interface PopoverProps {
  children: React.ReactNode;
}

export const Popover: React.FC<PopoverProps> = ({ children }) => (
  <View>{children}</View>
);

interface PopoverTriggerProps {
  children: React.ReactNode;
}

export const PopoverTrigger: React.FC<PopoverTriggerProps> = ({ children }) => (
  <TouchableOpacity>{children}</TouchableOpacity>
);

interface PopoverContentProps {
  className?: string;
  align?: 'center' | 'start' | 'end';
  sideOffset?: number;
  children: React.ReactNode;
}

export const PopoverContent: React.FC<PopoverContentProps> = ({
  className,
  align = 'center',
  sideOffset = 4,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.overlay} onPress={() => setIsOpen(false)}>
      {isOpen && (
        <View
          style={StyleSheet.flatten([
            styles.content,
            align === 'start' && { alignSelf: 'flex-start' },
            align === 'end' && { alignSelf: 'flex-end' },
            { marginTop: sideOffset },
            className ? cn(className) : {},
          ])}
        >
          {children}
        </View>
      )}
    </View>
  );
};

interface PopoverAnchorProps {
  children: React.ReactNode;
}

export const PopoverAnchor: React.FC<PopoverAnchorProps> = ({ children }) => (
  <View>{children}</View>
);

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    zIndex: 50,
  },
  content: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});