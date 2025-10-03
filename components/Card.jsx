
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ style, children, ...props }) => {
  return (
    <View
      style={[styles.card, style]}
      {...props}
    >
      {children}
    </View>
  );
};

const CardHeader = ({ style, children, ...props }) => {
  return (
    <View
      style={[styles.cardHeader, style]}
      {...props}
    >
      {children}
    </View>
  );
};

const CardTitle = ({ style, children, ...props }) => {
  return (
    <Text
      style={[styles.cardTitle, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

const CardDescription = ({ style, children, ...props }) => {
  return (
    <Text
      style={[styles.cardDescription, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

const CardAction = ({ style, children, ...props }) => {
  return (
    <View
      style={[styles.cardAction, style]}
      {...props}
    >
      {children}
    </View>
  );
};

const CardContent = ({ style, children, ...props }) => {
  return (
    <View
      style={[styles.cardContent, style]}
      {...props}
    >
      {children}
    </View>
  );
};

const CardFooter = ({ style, children, ...props }) => {
  return (
    <View
      style={[styles.cardFooter, style]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection: 'column',
    padding: 16,
  },
  cardHeader: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666666',
  },
  cardAction: {
    alignSelf: 'flex-end',
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};