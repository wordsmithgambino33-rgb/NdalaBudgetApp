
import React from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Sun, Moon } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme, colors } = useTheme();
  const isDark = theme === 'dark';
  const rotation = useSharedValue(isDark ? 0 : 180);
  const scaleDark = useSharedValue(isDark ? 1 : 0);
  const scaleLight = useSharedValue(isDark ? 0 : 1);

  const animatedStyleDark = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }, { scale: scaleDark.value }],
  }));

  const animatedStyleLight = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }, { scale: scaleLight.value }],
  }));

  const handleToggle = () => {
    toggleTheme();
    rotation.value = withTiming(isDark ? 180 : 0, { duration: 300 });
    scaleDark.value = withTiming(isDark ? 0 : 1, { duration: 300 });
    scaleLight.value = withTiming(isDark ? 1 : 0, { duration: 300 });
  };

  return (
    <TouchableOpacity
      onPress={handleToggle}
      style={[styles.container, { backgroundColor: colors.background, borderColor: colors.primary }]}
    >
      <Animated.View style={[styles.icon, animatedStyleDark]}>
        <Moon size={20} color={colors.primary} />
      </Animated.View>
      <Animated.View style={[styles.icon, animatedStyleLight]}>
        <Sun size={20} color={colors.primary} />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  icon: {
    position: 'absolute',
  },
});