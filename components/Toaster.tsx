
import React from 'react';
import Toast, { ToastConfig } from 'react-native-toast-message';
import { StyleSheet, View, Text } from 'react-native';
import { useColorScheme } from 'react-native';

interface ToasterProps {
  position?: 'top' | 'bottom';
  style?: object;
  className?: string;
}

const toastConfig: ToastConfig = {
  success: ({ text1, text2 }) => (
    <View style={styles.successToast}>
      <Text style={styles.toastText}>{text1}</Text>
      {text2 && <Text style={styles.toastSubText}>{text2}</Text>}
    </View>
  ),
  error: ({ text1, text2 }) => (
    <View style={styles.errorToast}>
      <Text style={styles.toastText}>{text1}</Text>
      {text2 && <Text style={styles.toastSubText}>{text2}</Text>}
    </View>
  ),
  info: ({ text1, text2 }) => (
    <View style={styles.infoToast}>
      <Text style={styles.toastText}>{text1}</Text>
      {text2 && <Text style={styles.toastSubText}>{text2}</Text>}
    </View>
  ),
};

export const Toaster: React.FC<ToasterProps> = ({ position = 'bottom', style, className }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';

  return (
    <Toast
      config={toastConfig}
      position={position}
      style={StyleSheet.flatten([theme === 'dark' ? styles.darkTheme : styles.lightTheme, style])}
    />
  );
};

const styles = StyleSheet.create({
  successToast: {
    backgroundColor: '#4caf50',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#388e3c',
  },
  errorToast: {
    backgroundColor: '#f44336',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#d32f2f',
  },
  infoToast: {
    backgroundColor: '#2196f3',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#1976d2',
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toastSubText: {
    color: '#fff',
    fontSize: 14,
  },
  lightTheme: {
    backgroundColor: '#fff',
  },
  darkTheme: {
    backgroundColor: '#333',
  },
});