
import { StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';

type RNStyle = ViewStyle | TextStyle | ImageStyle;
type ClassValue = string | number | boolean | null | undefined | RNStyle | ClassValue[] | { [key: string]: any };

/**
 * A small helper to merge style-like inputs into a single style object.
 * It aims to be permissive and typed for common usages across components.
 */
export function cn(...inputs: ClassValue[]): StyleProp<RNStyle> {
  const out: any = {};

  function mergeItem(item: ClassValue) {
    if (!item) return;
    if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean') {
      // ignore primitive class-like tokens in RN context
      return;
    }
    if (Array.isArray(item)) {
      item.forEach(mergeItem);
      return;
    }
    if (typeof item === 'object') {
      Object.assign(out, item as object);
    }
  }

  inputs.forEach(mergeItem);
  return out as StyleProp<RNStyle>;
}