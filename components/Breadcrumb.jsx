
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Breadcrumb = ({ children, ...props }) => {
  return (
    <View
      accessibilityRole="navigation"
      accessibilityLabel="breadcrumb"
      style={styles.breadcrumb}
      {...props}
    >
      {children}
    </View>
  );
};

const BreadcrumbList = ({ style, children, ...props }) => {
  return (
    <View
      style={[styles.breadcrumbList, style]}
      {...props}
    >
      {children}
    </View>
  );
};

const BreadcrumbItem = ({ style, children, ...props }) => {
  return (
    <View
      style={[styles.breadcrumbItem, style]}
      {...props}
    >
      {children}
    </View>
  );
};

const BreadcrumbLink = ({ style, children, ...props }) => {
  return (
    <Text
      style={[styles.breadcrumbLink, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

const BreadcrumbPage = ({ style, children, ...props }) => {
  return (
    <Text
      style={[styles.breadcrumbPage, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

const BreadcrumbSeparator = ({ children, style, ...props }) => {
  return (
    <View
      style={[styles.breadcrumbSeparator, style]}
      {...props}
    >
      {children || <Text style={styles.separator}>›</Text>}
    </View>
  );
};

const BreadcrumbEllipsis = ({ style, ...props }) => {
  return (
    <View
      style={[styles.breadcrumbEllipsis, style]}
      {...props}
    >
      <Text style={styles.ellipsis}>…</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  breadcrumb: {
    flexDirection: 'row',
  },
  breadcrumbList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
  breadcrumbItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  breadcrumbLink: {
    fontSize: 14,
    color: '#666666',
  },
  breadcrumbPage: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '400',
  },
  breadcrumbSeparator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    fontSize: 14,
    color: '#666666',
  },
  breadcrumbEllipsis: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ellipsis: {
    fontSize: 14,
    color: '#666666',
  },
});

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};