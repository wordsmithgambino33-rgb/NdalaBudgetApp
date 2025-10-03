
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'react-native-vector-icons/LucideReact';
import { cn } from './utils';
import { Button } from './Button'; // Assuming Button component exists

interface PaginationProps {
  className?: string;
  children: React.ReactNode;
}

export const Pagination: React.FC<PaginationProps> = ({ className, children }) => (
  <View
    role="navigation"
    accessibilityLabel="pagination"
    style={StyleSheet.flatten([styles.pagination, className ? cn(className) : {}])}
  >
    {children}
  </View>
);

export const PaginationContent: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => (
  <View style={StyleSheet.flatten([styles.content, className ? cn(className) : {}])}>
    {children}
  </View>
);

export const PaginationItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.item}>
    {children}
  </View>
);

interface PaginationLinkProps {
  isActive?: boolean;
  size?: 'icon' | 'default';
  className?: any;
  children: React.ReactNode;
  onPress?: () => void;
}

export const PaginationLink: React.FC<PaginationLinkProps> = ({
  isActive,
  size = 'icon',
  className,
  children,
  onPress,
}) => (
  <TouchableOpacity
    style={StyleSheet.flatten([
      styles.link,
      isActive && styles.linkActive,
      size === 'default' && styles.linkDefault,
      className ? cn(className) : {},
    ])}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

export const PaginationPrevious: React.FC<{ className?: string; onPress?: () => void }> = ({
  className,
  onPress,
}) => (
  <PaginationLink onPress={onPress} size="default" className={cn("gap-1 px-2.5", className)}>
    <ChevronLeftIcon name="chevron-left" size={16} color="#666" />
    <Text style={styles.prevText}>Previous</Text>
  </PaginationLink>
);

export const PaginationNext: React.FC<{ className?: string; onPress?: () => void }> = ({
  className,
  onPress,
}) => (
  <PaginationLink onPress={onPress} size="default" className={cn("gap-1 px-2.5", className)}>
    <Text style={styles.nextText}>Next</Text>
    <ChevronRightIcon name="chevron-right" size={16} color="#666" />
  </PaginationLink>
);

export const PaginationEllipsis: React.FC<{ className?: string }> = ({ className }) => (
  <View style={StyleSheet.flatten([styles.ellipsis, className ? cn(className) : {}])}>
    <MoreHorizontalIcon name="more-horizontal" size={16} color="#666" />
  </View>
);

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  item: {
    // Empty for li equivalent
  },
  link: {
    padding: 8,
    borderRadius: 4,
  },
  linkActive: {
    backgroundColor: '#4caf50',
    color: '#fff',
  },
  linkDefault: {
    paddingHorizontal: 10,
  },
  prevText: {
    display: 'none', // Hidden on small screens, show on larger if needed
  },
  nextText: {
    display: 'none',
  },
  ellipsis: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});