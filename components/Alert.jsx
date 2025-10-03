
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const alertVariants = {
  default: {
    backgroundColor: '#ffffff',
    borderColor: '#e0e0e0',
    color: '#333333',
  },
  destructive: {
    backgroundColor: '#ffffff',
    borderColor: '#ff3333',
    color: '#ff3333',
  },
};

const Alert = ({ variant = 'default', style, children, ...props }) => {
  return (
    <View
      style={[
        styles.alert,
        alertVariants[variant],
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const AlertTitle = ({ style, children, ...props }) => {
  return (
    <Text
      style={[styles.alertTitle, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

const AlertDescription = ({ style, children, ...props }) => {
  return (
    <Text
      style={[styles.alertDescription, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  alert: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  alertDescription: {
    fontSize: 14,
    color: '#666666',
  },
});

export { Alert, AlertTitle, AlertDescription };