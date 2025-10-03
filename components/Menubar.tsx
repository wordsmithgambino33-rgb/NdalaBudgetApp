
"use client";

import React, { useState } from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'react-native-vector-icons/LucideReact';
import { cn } from './utils';

interface MenubarProps {
  className?: string;
  children: React.ReactNode;
}

export const Menubar: React.FC<MenubarProps> = ({ className, children }) => {
  return (
    <View style={StyleSheet.flatten([styles.root, className ? cn(className) : {}])}>
      <MenubarMenu>
        {children}
      </MenubarMenu>
    </View>
  );
};

export const MenubarMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.menu}>
    {children}
  </View>
);

export const MenubarGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.group}>
    {children}
  </View>
);

export const MenubarPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.portal}>
    {children}
  </View>
);

export const MenubarRadioGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.radioGroup}>
    {children}
  </View>
);

interface MenubarTriggerProps {
  className?: string;
  children: React.ReactNode;
}

export const MenubarTrigger: React.FC<MenubarTriggerProps> = ({ className, children }) => (
  <TouchableOpacity style={StyleSheet.flatten([styles.trigger, className ? cn(className) : {}])}>
    {children}
  </TouchableOpacity>
);

interface MenubarContentProps {
  className?: string;
  align?: 'start' | 'center' | 'end';
  children: React.ReactNode;
}

export const MenubarContent: React.FC<MenubarContentProps> = ({ className, align = 'start', children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MenubarPortal>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <View style={StyleSheet.flatten([
          styles.content,
          align === 'center' && { alignSelf: 'center' },
          align === 'end' && { alignSelf: 'flex-end' },
          className ? cn(className) : {},
        ])}>
          {isOpen && children}
        </View>
      </TouchableOpacity>
    </MenubarPortal>
  );
};

interface MenubarItemProps {
  className?: string;
  inset?: boolean;
  variant?: 'default' | 'destructive';
  children: React.ReactNode;
}

export const MenubarItem: React.FC<MenubarItemProps> = ({
  className,
  inset,
  variant = 'default',
  children,
}) => (
  <TouchableOpacity style={StyleSheet.flatten([
    styles.item,
    inset && styles.itemInset,
    variant === 'destructive' && styles.itemDestructive,
    className ? cn(className) : {},
  ])}>
    {children}
  </TouchableOpacity>
);

interface MenubarCheckboxItemProps {
  className?: string;
  checked?: boolean;
  children: React.ReactNode;
}

export const MenubarCheckboxItem: React.FC<MenubarCheckboxItemProps> = ({
  className,
  checked,
  children,
}) => (
  <View style={StyleSheet.flatten([styles.checkboxItem, className ? cn(className) : {}])}>
    {checked && <CheckIcon name="check" size={16} color="#4caf50" />}
    {children}
  </View>
);

interface MenubarRadioItemProps {
  className?: string;
  children: React.ReactNode;
}

export const MenubarRadioItem: React.FC<MenubarRadioItemProps> = ({ className, children }) => (
  <View style={StyleSheet.flatten([styles.radioItem, className ? cn(className) : {}])}>
    <CircleIcon name="circle" size={8} color="#4caf50" />
    {children}
  </View>
);

export const MenubarLabel: React.FC<{ className?: string; inset?: boolean; children: React.ReactNode }> = ({
  className,
  inset,
  children,
}) => (
  <Text style={StyleSheet.flatten([
    styles.label,
    inset && styles.labelInset,
    className ? cn(className) : {},
  ])}>
    {children}
  </Text>
);

export const MenubarSeparator: React.FC<{ className?: string }> = ({ className }) => (
  <View style={StyleSheet.flatten([styles.separator, className ? cn(className) : {}])} />
);

export const MenubarShortcut: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => (
  <Text style={StyleSheet.flatten([styles.shortcut, className ? cn(className) : {}])}>
    {children}
  </Text>
);

export const MenubarSub: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.sub}>
    {children}
  </View>
);

interface MenubarSubTriggerProps {
  className?: string;
  inset?: boolean;
  children: React.ReactNode;
}

export const MenubarSubTrigger: React.FC<MenubarSubTriggerProps> = ({
  className,
  inset,
  children,
}) => (
  <TouchableOpacity style={StyleSheet.flatten([
    styles.subTrigger,
    inset && styles.subTriggerInset,
    className ? cn(className) : {},
  ])}>
    {children}
    <ChevronRightIcon name="chevron-right" size={16} color="#666" />
  </TouchableOpacity>
);

interface MenubarSubContentProps {
  className?: string;
  children: React.ReactNode;
}

export const MenubarSubContent: React.FC<MenubarSubContentProps> = ({ className, children }) => (
  <View style={StyleSheet.flatten([styles.subContent, className ? cn(className) : {}])}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  root: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 4,
    backgroundColor: '#fff',
  },
  menu: {
    flex: 1,
  },
  group: {
    flexDirection: 'row',
  },
  portal: {
    position: 'absolute',
  },
  radioGroup: {
    flexDirection: 'row',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  item: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  itemInset: {
    paddingLeft: 32,
  },
  itemDestructive: {
    color: '#f44336',
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 4,
    borderRadius: 4,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 4,
    borderRadius: 4,
  },
  label: {
    fontWeight: '500',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  labelInset: {
    paddingLeft: 32,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: -4,
    marginVertical: 4,
  },
  shortcut: {
    color: '#999',
    fontSize: 12,
    fontVariant: ['small-caps'],
  },
  sub: {
    marginLeft: 16,
  },
  subTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  subTriggerInset: {
    paddingLeft: 32,
  },
  subContent: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 4,
    marginLeft: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});