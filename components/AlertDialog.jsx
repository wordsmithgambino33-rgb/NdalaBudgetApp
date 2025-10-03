
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from './Button';

const AlertDialog = ({ open, onOpenChange, children, ...props }) => {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange?.(false)}
      {...props}
    >
      {children}
    </Modal>
  );
};

const AlertDialogTrigger = ({ children, ...props }) => {
  return <View {...props}>{children}</View>;
};

const AlertDialogContent = ({ style, children, ...props }) => {
  return (
    <View style={[styles.content, style]} {...props}>
      {children}
    </View>
  );
};

const AlertDialogHeader = ({ style, children, ...props }) => {
  return (
    <View style={[styles.header, style]} {...props}>
      {children}
    </View>
  );
};

const AlertDialogFooter = ({ style, children, ...props }) => {
  return (
    <View style={[styles.footer, style]} {...props}>
      {children}
    </View>
  );
};

const AlertDialogTitle = ({ style, children, ...props }) => {
  return (
    <Text style={[styles.title, style]} {...props}>
      {children}
    </Text>
  );
};

const AlertDialogDescription = ({ style, children, ...props }) => {
  return (
    <Text style={[styles.description, style]} {...props}>
      {children}
    </Text>
  );
};

const AlertDialogAction = ({ style, children, ...props }) => {
  return (
    <Button style={style} {...props}>
      {children}
    </Button>
  );
};

const AlertDialogCancel = ({ style, children, ...props }) => {
  return (
    <Button variant="outline" style={style} {...props}>
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 24,
    marginHorizontal: 16,
    alignSelf: 'center',
    width: '90%',
    maxWidth: 400,
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -50 }],
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#666666',
  },
});

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};