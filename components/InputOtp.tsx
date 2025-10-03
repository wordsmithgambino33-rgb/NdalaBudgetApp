
"use client";

import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MinusIcon } from 'react-native-vector-icons/LucideReact'; // Assuming vector icons setup
import { cn } from './utils';

interface OTPInputContextType {
  slots: Array<{ char?: string; hasFakeCaret?: boolean; isActive?: boolean }>;
}

const OTPInputContext = React.createContext<OTPInputContextType | null>(null);

interface InputOTPProps {
  className?: string;
  containerClassName?: string;
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
}

export const InputOTP: React.FC<InputOTPProps> = ({
  className,
  containerClassName,
  length = 6,
  value = '',
  onChange,
}) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const slots = Array.from({ length }, (_, i) => ({
    char: value[i] || '',
    hasFakeCaret: i === focusedIndex && !value[i],
    isActive: i === focusedIndex,
  }));

  const handleChange = (text: string, index: number) => {
    const newValue = value.slice(0, index) + text + value.slice(index + 1);
    onChange?.(newValue);
    if (text && index < length - 1) {
      setFocusedIndex(index + 1);
    }
  };

  return (
    <OTPInputContext.Provider value={{ slots }}>
      <View
        style={StyleSheet.flatten([
          styles.container,
          containerClassName ? cn(containerClassName) : {},
        ])}
      >
        <InputOTPGroup className={cn("flex items-center gap-2", className)}>
          {slots.map((slot, index) => (
            <InputOTPSlot key={index} index={index} focused={slot.isActive}>
              <TextInput
                style={styles.slotInput}
                maxLength={1}
                value={slot.char}
                onChangeText={(text) => handleChange(text, index)}
                onFocus={() => setFocusedIndex(index)}
                keyboardType="numeric"
              />
            </InputOTPSlot>
          ))}
          {slots.map((_, index) => index < length - 1 && <InputOTPSeparator key={index} />)}
        </InputOTPGroup>
      </View>
    </OTPInputContext.Provider>
  );
};

export const InputOTPGroup: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => (
  <View style={StyleSheet.flatten([styles.group, className ? cn(className) : {}])}>
    {children}
  </View>
);

interface InputOTPSlotProps {
  index: number;
  focused?: boolean;
  children: React.ReactNode;
}

export const InputOTPSlot: React.FC<InputOTPSlotProps> = ({ index, focused, children }) => {
  const context = useContext(OTPInputContext);
  const slot = context?.slots[index] || {};

  return (
    <View
      style={StyleSheet.flatten([
        styles.slot,
        focused && styles.slotFocused,
      ])}
    >
      {children}
      {slot.hasFakeCaret && <View style={styles.caret} />}
    </View>
  );
};

export const InputOTPSeparator: React.FC = () => (
  <View style={styles.separator}>
    <MinusIcon name="minus" size={16} color="#666" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  slot: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  slotFocused: {
    borderColor: '#4caf50',
  },
  slotInput: {
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
  },
  caret: {
    position: 'absolute',
    width: 2,
    height: 20,
    backgroundColor: '#000',
    opacity: 0.5,
  },
  separator: {
    justifyContent: 'center',
  },
});