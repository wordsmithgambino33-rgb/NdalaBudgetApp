
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { cn } from './utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface RadioGroupProps {
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  className,
  value,
  onValueChange,
  children,
}) => {
  return (
    <View style={StyleSheet.flatten([styles.radioGroup, className ? cn(className) : {}])}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, ({ value, onValueChange } as any))
          : child
      )}
    </View>
  );
};

interface RadioGroupItemProps {
  className?: string;
  value: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({
  className,
  value,
  onValueChange,
  children,
}) => {
  const isChecked = value === value;

  return (
    <TouchableOpacity
      style={StyleSheet.flatten([
        styles.radioGroupItem,
        isChecked ? styles.radioGroupItemChecked : {},
        className ? cn(className) : {},
      ])}
      onPress={() => onValueChange?.(value)}
      activeOpacity={0.7}
      disabled={false}
    >
      <View style={styles.indicator}>
        {isChecked && (
          <MaterialIcons name="circle" size={8} color="#4caf50" style={styles.indicatorIcon} />
        )}
      </View>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioGroup: {
    flexDirection: 'column',
    gap: 12,
  },
  radioGroupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  radioGroupItemChecked: {
    borderColor: '#4caf50',
  },
  indicator: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorIcon: {
    position: 'absolute',
  },
});