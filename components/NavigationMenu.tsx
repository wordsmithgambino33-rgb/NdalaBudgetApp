
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import { ChevronDownIcon } from 'react-native-vector-icons/LucideReact';
import { cn } from './utils';

interface NavigationMenuProps {
  className?: string;
  children: React.ReactNode;
  viewport?: boolean;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  className,
  children,
  viewport = true,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={StyleSheet.flatten([styles.root, className ? cn(className) : {}])}>
      <NavigationMenuList>
        {React.Children.map(children, (child, index) =>
          React.isValidElement(child) && child.type === NavigationMenuItem
            ? React.cloneElement(child, { isActive: index === activeIndex, onPress: () => setActiveIndex(index) })
            : child
        )}
      </NavigationMenuList>
      {viewport && <NavigationMenuViewport content={children[activeIndex]?.props.children} />}
    </View>
  );
};

export const NavigationMenuList: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.list}>
    {children}
  </View>
);

export const NavigationMenuItem: React.FC<{
  className?: string;
  isActive?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
}> = ({ className, isActive, onPress, children }) => (
  <TouchableOpacity
    style={StyleSheet.flatten([
      styles.item,
      isActive && styles.itemActive,
      className ? cn(className) : {},
    ])}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

interface NavigationMenuTriggerProps {
  className?: string;
  children: React.ReactNode;
}

export const NavigationMenuTrigger: React.FC<NavigationMenuTriggerProps> = ({
  className,
  children,
}) => (
  <TouchableOpacity style={StyleSheet.flatten([styles.trigger, className ? cn(className) : {}])}>
    {children}
    <ChevronDownIcon name="chevron-down" size={16} color="#666" style={styles.chevron} />
  </TouchableOpacity>
);

interface NavigationMenuContentProps {
  className?: string;
  children: React.ReactNode;
}

export const NavigationMenuContent: React.FC<NavigationMenuContentProps> = ({
  className,
  children,
}) => (
  <View style={StyleSheet.flatten([styles.content, className ? cn(className) : {}])}>
    {children}
  </View>
);

interface NavigationMenuViewportProps {
  content?: React.ReactNode;
}

export const NavigationMenuViewport: React.FC<NavigationMenuViewportProps> = ({ content }) => (
  <View style={styles.viewport}>
    {content}
  </View>
);

export const NavigationMenuLink: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => (
  <TouchableOpacity style={StyleSheet.flatten([styles.link, className ? cn(className) : {}])}>
    {children}
  </TouchableOpacity>
);

export const NavigationMenuIndicator: React.FC = () => (
  <View style={styles.indicator} />
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
  list: {
    flexDirection: 'row',
    gap: 4,
  },
  item: {
    padding: 8,
  },
  itemActive: {
    backgroundColor: '#e0e0e0',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  chevron: {
    marginLeft: 4,
  },
  content: {
    position: 'absolute',
    top: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  viewport: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 16,
  },
  link: {
    padding: 8,
    borderRadius: 4,
  },
  indicator: {
    height: 2,
    backgroundColor: '#4caf50',
    width: 20,
    transform: [{ rotate: '45deg' }],
  },
});