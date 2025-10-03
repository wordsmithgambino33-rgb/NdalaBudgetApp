
import React from 'react';
import { View, PanResponder, StyleSheet } from 'react-native';
import { cn } from './utils';

interface SliderProps {
  className?: string;
  defaultValue?: number[];
  value?: number[];
  min?: number;
  max?: number;
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
  onValueChange?: (value: number[]) => void;
}

export const Slider: React.FC<SliderProps> = ({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  orientation = 'horizontal',
  disabled = false,
  onValueChange,
}) => {
  const [localValue, setLocalValue] = React.useState<number[]>(
    value || defaultValue || [min]
  );

  const handlePanResponderMove = (index: number) => (event: any, gestureState: any) => {
    const trackDimension = orientation === 'horizontal' ? 200 : 176; // Approximate track size
    const delta = orientation === 'horizontal' ? gestureState.dx : gestureState.dy;
    const newValue = Math.min(
      Math.max(
        min,
        localValue[index] + (delta / trackDimension) * (max - min)
      ),
      max
    );
    const newValues = [...localValue];
    newValues[index] = newValue;
    setLocalValue(newValues);
    onValueChange?.(newValues);
  };

  const panResponders = localValue.map((_, index) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onPanResponderMove: handlePanResponderMove(index),
      onPanResponderRelease: () => {},
    })
  );

  return (
    <View
      style={StyleSheet.flatten([
        styles.slider,
        orientation === 'vertical' ? styles.sliderVertical : {},
        disabled ? styles.disabled : {},
        className ? cn(className) : {},
      ])}
    >
      <View style={styles.track}>
        <View
          style={StyleSheet.flatten([
            styles.range,
            orientation === 'vertical' ? { height: `${((localValue[0] - min) / (max - min)) * 100}%` } : { width: `${((localValue[0] - min) / (max - min)) * 100}%` },
          ])}
        />
      </View>
      {localValue.map((val, index) => (
        <View
          key={index}
          {...panResponders[index].panHandlers}
          style={StyleSheet.flatten([
            styles.thumb,
            { [orientation === 'horizontal' ? 'left' : 'bottom']: `${((val - min) / (max - min)) * 100}%` },
          ])}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 16,
  },
  sliderVertical: {
    flexDirection: 'column',
    height: 176,
    width: 16,
  },
  track: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    height: 4,
  },
  range: {
    backgroundColor: '#4caf50',
    borderRadius: 4,
    height: '100%',
  },
  thumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4caf50',
    backgroundColor: '#fff',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  disabled: {
    opacity: 0.5,
  },
});