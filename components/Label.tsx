
"use client";

import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { cn } from './utils';

interface LabelProps {
  className?: string;
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ className, children }) => (
  <Text style={StyleSheet.flatten([
    styles.label,
    className ? cn(className) : {},
  ])}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
});