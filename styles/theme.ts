
import { StyleSheet } from 'react-native';

export const themes = {
  light: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
    },
    card: {
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 10,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    text: {
      fontFamily: 'Poppins-Regular',
      fontSize: 16,
      color: '#1a1a1a',
    },
    primaryButton: {
      backgroundColor: '#00796b', // Malawian green
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    primaryButtonText: {
      color: '#fff',
      fontFamily: 'Poppins-Medium',
      fontSize: 16,
    },
    secondaryButton: {
      backgroundColor: '#f0fdf4',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    secondaryButtonText: {
      color: '#00796b',
      fontFamily: 'Poppins-Medium',
      fontSize: 16,
    },
    input: {
      backgroundColor: '#fff',
      borderColor: '#0000001a',
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      fontFamily: 'Poppins-Regular',
      fontSize: 16,
    },
    progressBarGreen: {
      backgroundColor: '#00796b',
      height: 8,
      borderRadius: 4,
    },
    progressBarYellow: {
      backgroundColor: '#ffc107',
      height: 8,
      borderRadius: 4,
    },
    progressBarRed: {
      backgroundColor: '#dc2626', // Malawian red
      height: 8,
      borderRadius: 4,
    },
    bottomNav: {
      backgroundColor: '#fff',
      borderTopColor: '#0000001a',
      borderTopWidth: 1,
      padding: 12,
    },
    bottomNavItem: {
      alignItems: 'center',
      flex: 1,
    },
    bottomNavItemText: {
      fontFamily: 'Poppins-Regular',
      fontSize: 12,
      color: '#1a1a1a',
    },
    bottomNavItemActive: {
      color: '#00796b',
    },
  }),
  dark: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0a0a0a',
      padding: 16,
    },
    card: {
      backgroundColor: '#111',
      padding: 16,
      borderRadius: 10,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    text: {
      fontFamily: 'Poppins-Regular',
      fontSize: 16,
      color: '#fafafa',
    },
    primaryButton: {
      backgroundColor: '#26a69a',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    primaryButtonText: {
      color: '#0f0f0f',
      fontFamily: 'Poppins-Medium',
      fontSize: 16,
    },
    secondaryButton: {
      backgroundColor: '#1a1a1a',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    secondaryButtonText: {
      color: '#fafafa',
      fontFamily: 'Poppins-Medium',
      fontSize: 16,
    },
    input: {
      backgroundColor: '#1a1a1a',
      borderColor: '#ffffff1a',
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      fontFamily: 'Poppins-Regular',
      fontSize: 16,
      color: '#fafafa',
    },
    progressBarGreen: {
      backgroundColor: '#26a69a',
      height: 8,
      borderRadius: 4,
    },
    progressBarYellow: {
      backgroundColor: '#ffca28',
      height: 8,
      borderRadius: 4,
    },
    progressBarRed: {
      backgroundColor: '#ef4444',
      height: 8,
      borderRadius: 4,
    },
    bottomNav: {
      backgroundColor: '#111',
      borderTopColor: '#ffffff1a',
      borderTopWidth: 1,
      padding: 12,
    },
    bottomNavItem: {
      alignItems: 'center',
      flex: 1,
    },
    bottomNavItemText: {
      fontFamily: 'Poppins-Regular',
      fontSize: 12,
      color: '#fafafa',
    },
    bottomNavItemActive: {
      color: '#26a69a',
    },
  }),
};