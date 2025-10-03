
import * as React from "react";
import { View, Animated, StyleSheet } from "react-native";

// cn
const cn = (...styles) => Object.assign({}, ...styles.map(s => styles[s] || s));

function Collapsible({ open, children, ...props }) {
  return <View {...props}>{open && children}</View>; // Basic, add animation below
}

function CollapsibleTrigger({ onPress, children }) {
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