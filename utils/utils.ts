
import { StyleSheet } from 'react-native';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  const classNames = clsx(inputs);
  return StyleSheet.create({ style: classNames }).style;
}