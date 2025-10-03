
import * as React from "react";
import { View, Animated, StyleSheet, TouchableOpacity } from "react-native";

// cn
const cn = (...styles: any[]) => Object.assign({}, ...styles.map(s => (s && typeof s === 'object' ? s : {})));

function Collapsible({ open, children, ...props }) {
  return <View {...props}>{open && children}</View>; // Basic, add animation below
}

function CollapsibleTrigger({ onPress, children }: { onPress?: () => void; children?: React.ReactNode }) {
  return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;
}

function CollapsibleContent({ open, children, style }) {
  const opacity = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(opacity, { toValue: open ? 1 : 0, duration: 200, useNativeDriver: true }).start();
  }, [open]);

  return <Animated.View style={cn({ opacity }, style)}>{children}</Animated.View>;
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

// Usage: <Collapsible open={open}><CollapsibleContent open={open}>Content</CollapsibleContent></Collapsible>