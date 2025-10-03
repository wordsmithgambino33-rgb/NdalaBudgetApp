
import React from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, PieChartIcon, Target, TrendingUp, CreditCard } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';

type Screen = 'dashboard' | 'transactions' | 'budget' | 'reports' | 'goals';

interface BottomNavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  const { colors } = useTheme();
  const navItems = [
    { id: 'dashboard' as Screen, icon: Home, label: 'Home' },
    { id: 'transactions' as Screen, icon: CreditCard, label: 'Transactions' },
    { id: 'budget' as Screen, icon: PieChartIcon, label: 'Budget' },
    { id: 'reports' as Screen, icon: TrendingUp, label: 'Reports' },
    { id: 'goals' as Screen, icon: Target, label: 'Goals' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background, borderTopColor: colors.primary }]}>
      <View style={styles.nav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          const scale = useSharedValue(isActive ? 1.05 : 1);

          const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: withSpring(scale.value) }],
          }));

          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                scale.value = 1.05; // Animate on press
                onNavigate(item.id);
              }}
              style={styles.button}
            >
              <Animated.View style={[styles.activeBg, isActive && { backgroundColor: colors.primary }, animatedStyle]} />
              <Icon size={20} color={isActive ? colors.foreground : colors.primary} />
              <Text style={[styles.label, { color: isActive ? colors.foreground : colors.primary }]}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
  },
  activeBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
});