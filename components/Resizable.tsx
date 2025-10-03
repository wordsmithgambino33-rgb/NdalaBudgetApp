
import React, { useState } from 'react';
import { View, PanResponder, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { cn } from './utils';

interface ResizablePanelGroupProps {
  className?: string;
  direction?: 'horizontal' | 'vertical';
  children: React.ReactNode;
}

export const ResizablePanelGroup: React.FC<ResizablePanelGroupProps> = ({
  className,
  direction = 'horizontal',
  children,
}) => {
  return (
    <View
      style={StyleSheet.flatten([
        styles.panelGroup,
        { flexDirection: direction === 'horizontal' ? 'row' : 'column' },
        className ? cn(className) : {},
      ])}
    >
      {children}
    </View>
  );
};

interface ResizablePanelProps {
  defaultSize?: number;
  children: React.ReactNode;
}

export const ResizablePanel: React.FC<ResizablePanelProps> = ({ defaultSize = 50, children }) => {
  return (
    <View style={[styles.panel, { flex: defaultSize / 100 }]}>
      {children}
    </View>
  );
};

interface ResizableHandleProps {
  className?: string;
  withHandle?: boolean;
}

export const ResizableHandle: React.FC<ResizableHandleProps> = ({ className, withHandle }) => {
  const [isDragging, setIsDragging] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: () => {
      setIsDragging(true);
    },
    onPanResponderRelease: () => {
      setIsDragging(false);
    },
  });

  return (
    <View
      {...panResponder.panHandlers}
      style={StyleSheet.flatten([
        styles.handle,
        withHandle ? styles.handleWithIcon : {},
        isDragging ? styles.handleActive : {},
        className ? cn(className) : {},
      ])}
    >
      {withHandle && (
        <View style={styles.handleIconContainer}>
          <MaterialIcons name="drag-indicator" size={16} color="#666" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  panelGroup: {
    flex: 1,
  },
  panel: {
    flex: 1,
  },
  handle: {
    width: 2,
    backgroundColor: '#ccc',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  handleWithIcon: {
    width: 4,
  },
  handleIconContainer: {
    backgroundColor: '#e0e0e0',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  handleActive: {
    backgroundColor: '#4caf50',
  },
});