
import { StyleSheet, Appearance, Platform } from 'react-native';
import { useState, useEffect } from 'react';

// Theme configuration for light and dark modes
const themes = {
  light: {
    fontSize: 16,
    background: '#ffffff',
    foreground: '#1a1a1a',
    card: '#ffffff',
    cardForeground: '#1a1a1a',
    popover: '#ffffff',
    popoverForeground: '#1a1a1a',
    primary: '#00796B', // Malawian flag-inspired green
    primaryForeground: '#ffffff',
    secondary: '#f0fdf4',
    secondaryForeground: '#00796B',
    muted: '#f8f9fa',
    mutedForeground: '#6c757d',
    accent: '#E8F5E8',
    accentForeground: '#00796B',
    destructive: '#dc2626', // Malawian flag-inspired red
    destructiveForeground: '#ffffff',
    border: 'rgba(0, 0, 0, 0.1)',
    input: 'transparent',
    inputBackground: '#ffffff',
    switchBackground: '#e2e8f0',
    fontWeightMedium: '500',
    fontWeightNormal: '400',
    ring: '#00796B',
    chart1: '#00796B',
    chart2: '#1E88E5',
    chart3: '#FF7043',
    chart4: '#FFC107',
    chart5: '#9C27B0',
    sidebar: '#ffffff',
    sidebarForeground: '#1a1a1a',
    sidebarPrimary: '#00796B',
    sidebarPrimaryForeground: '#ffffff',
    sidebarAccent: '#f8f9fa',
    sidebarAccentForeground: '#1a1a1a',
    sidebarBorder: 'rgba(0, 0, 0, 0.1)',
    sidebarRing: '#00796B',
    radius: 10, // 0.625rem converted to pixels (assuming 1rem = 16px)
    radiusSm: 6,
    radiusMd: 8,
    radiusLg: 10,
    radiusXl: 14,
  },
  dark: {
    fontSize: 16,
    background: '#0a0a0a',
    foreground: '#fafafa',
    card: '#111111',
    cardForeground: '#fafafa',
    popover: '#111111',
    popoverForeground: '#fafafa',
    primary: '#26a69a',
    primaryForeground: '#0f0f0f',
    secondary: '#1a1a1a',
    secondaryForeground: '#fafafa',
    muted: '#1f1f1f',
    mutedForeground: '#a3a3a3',
    accent: '#1f1f1f',
    accentForeground: '#fafafa',
    destructive: '#ef4444',
    destructiveForeground: '#fafafa',
    border: 'rgba(255, 255, 255, 0.1)',
    input: 'transparent',
    inputBackground: '#1a1a1a',
    switchBackground: '#2a2a2a',
    fontWeightMedium: '500',
    fontWeightNormal: '400',
    ring: '#26a69a',
    chart1: '#26a69a',
    chart2: '#42a5f5',
    chart3: '#ff8a65',
    chart4: '#ffca28',
    chart5: '#ab47bc',
    sidebar: '#111111',
    sidebarForeground: '#fafafa',
    sidebarPrimary: '#26a69a',
    sidebarPrimaryForeground: '#0f0f0f',
    sidebarAccent: '#1f1f1f',
    sidebarAccentForeground: '#fafafa',
    sidebarBorder: 'rgba(255, 255, 255, 0.1)',
    sidebarRing: '#26a69a',
    radius: 10,
    radiusSm: 6,
    radiusMd: 8,
    radiusLg: 10,
    radiusXl: 14,
  },
};

// Hook to manage theme switching
export const useTheme = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme() || 'light');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme || 'light');
    });
    return () => subscription.remove();
  }, []);

  return { theme, setTheme, colors: themes[theme] };
};

// Stylesheet
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.light.background, // Default to light theme
    color: themes.light.foreground,
    fontFamily: 'Inter',
    ...Platform.select({
      ios: { paddingTop: 20 },
      android: { paddingTop: 0 },
    }),
  },
  text: {
    color: themes.light.foreground,
    fontFamily: 'Inter',
    fontSize: themes.light.fontSize,
    fontWeight: themes.light.fontWeightNormal,
    lineHeight: themes.light.fontSize * 1.6,
  },
  h1: {
    fontFamily: 'Poppins',
    fontSize: themes.light.fontSize * 2,
    fontWeight: '600',
    lineHeight: themes.light.fontSize * 2 * 1.4,
    color: themes.light.foreground,
  },
  h2: {
    fontFamily: 'Poppins',
    fontSize: themes.light.fontSize * 1.5,
    fontWeight: '600',
    lineHeight: themes.light.fontSize * 1.5 * 1.4,
    color: themes.light.foreground,
  },
  h3: {
    fontFamily: 'Poppins',
    fontSize: themes.light.fontSize * 1.25,
    fontWeight: '600',
    lineHeight: themes.light.fontSize * 1.25 * 1.4,
    color: themes.light.foreground,
  },
  h4: {
    fontFamily: 'Poppins',
    fontSize: themes.light.fontSize,
    fontWeight: '600',
    lineHeight: themes.light.fontSize * 1.4,
    color: themes.light.foreground,
  },
  label: {
    fontFamily: 'Inter',
    fontSize: themes.light.fontSize,
    fontWeight: themes.light.fontWeightMedium,
    lineHeight: themes.light.fontSize * 1.5,
    color: themes.light.foreground,
  },
  button: {
    fontFamily: 'Inter',
    fontSize: themes.light.fontSize,
    fontWeight: themes.light.fontWeightMedium,
    lineHeight: themes.light.fontSize * 1.5,
    backgroundColor: themes.light.primary,
    color: themes.light.primaryForeground,
    borderRadius: themes.light.radius,
    padding: 10,
    textAlign: 'center',
  },
  input: {
    fontFamily: 'Inter',
    fontSize: themes.light.fontSize,
    fontWeight: themes.light.fontWeightNormal,
    lineHeight: themes.light.fontSize * 1.5,
    backgroundColor: themes.light.inputBackground,
    borderColor: themes.light.border,
    borderWidth: 1,
    borderRadius: themes.light.radius,
    padding: 10,
  },
  card: {
    backgroundColor: themes.light.card,
    borderRadius: themes.light.radius,
    borderColor: themes.light.border,
    borderWidth: 1,
    padding: 15,
  },
  sidebar: {
    backgroundColor: themes.light.sidebar,
    borderColor: themes.light.sidebarBorder,
    borderWidth: 1,
  },
  sidebarItem: {
    backgroundColor: themes.light.sidebarAccent,
    color: themes.light.sidebarAccentForeground,
    borderRadius: themes.light.radiusSm,
    padding: 10,
  },
  chart: {
    bar1: { backgroundColor: themes.light.chart1 },
    bar2: { backgroundColor: themes.light.chart2 },
    bar3: { backgroundColor: themes.light.chart3 },
    bar4: { backgroundColor: themes.light.chart4 },
    bar5: { backgroundColor: themes.light.chart5 },
  },
});

// Dynamic styles generator for theme-aware components
export const getDynamicStyles = (theme) => ({
  container: {
    ...globalStyles.container,
    backgroundColor: themes[theme].background,
    color: themes[theme].foreground,
  },
  text: {
    ...globalStyles.text,
    color: themes[theme].foreground,
  },
  h1: {
    ...globalStyles.h1,
    color: themes[theme].foreground,
  },
  h2: {
    ...globalStyles.h2,
    color: themes[theme].foreground,
  },
  h3: {
    ...globalStyles.h3,
    color: themes[theme].foreground,
  },
  h4: {
    ...globalStyles.h4,
    color: themes[theme].foreground,
  },
  label: {
    ...globalStyles.label,
    color: themes[theme].foreground,
  },
  button: {
    ...globalStyles.button,
    backgroundColor: themes[theme].primary,
    color: themes[theme].primaryForeground,
    borderRadius: themes[theme].radius,
  },
  input: {
    ...globalStyles.input,
    backgroundColor: themes[theme].inputBackground,
    borderColor: themes[theme].border,
    borderRadius: themes[theme].radius,
  },
  card: {
    ...globalStyles.card,
    backgroundColor: themes[theme].card,
    borderColor: themes[theme].border,
    borderRadius: themes[theme].radius,
  },
  sidebar: {
    ...globalStyles.sidebar,
    backgroundColor: themes[theme].sidebar,
    borderColor: themes[theme].sidebarBorder,
  },
  sidebarItem: {
    ...globalStyles.sidebarItem,
    backgroundColor: themes[theme].sidebarAccent,
    color: themes[theme].sidebarAccentForeground,
    borderRadius: themes[theme].radiusSm,
  },
  chart: {
    bar1: { backgroundColor: themes[theme].chart1 },
    bar2: { backgroundColor: themes[theme].chart2 },
    bar3: { backgroundColor: themes[theme].chart3 },
    bar4: { backgroundColor: themes[theme].chart4 },
    bar5: { backgroundColor: themes[theme].chart5 },
  },
});

// Example usage in a component
export const ThemeProvider = ({ children }) => {
  const { theme, colors } = useTheme();
  return children({ theme, colors, styles: getDynamicStyles(theme) });
};

// Font loading (requires react-native.config.js setup for Poppins and Inter)
export const loadFonts = async () => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    // Fonts should be linked via react-native.config.js and loaded here if needed
    // Example: await Font.loadAsync({ 'Poppins': require('./assets/fonts/Poppins-Regular.ttf'), ... });
  }
};