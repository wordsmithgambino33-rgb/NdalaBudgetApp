
import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { ChevronDownIcon } from "lucide-react-native"; // Assume installed

// Utility for merging styles (similar to cn)
const cn = (...styles) => Object.assign({}, ...styles.map(s => styles[s] || s));

const styles = StyleSheet.create({
  accordion: {},
  accordionItem: { borderBottomWidth: 1, borderBottomColor: "#ccc", },
  lastItem: { borderBottomWidth: 0 },
  accordionTrigger: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 16,
    fontSize: 14,
    fontWeight: "500",
  },
  icon: { width: 16, height: 16, tintColor: "#666" },
  accordionContent: { overflow: "hidden", paddingBottom: 16 },
});

function Accordion({ children, ...props }) {
  return <View style={styles.accordion} {...props}>{children}</View>;
}

function AccordionItem({ children, style, isLast, ...props }) {
  return (
    <View style={cn(styles.accordionItem, isLast && styles.lastItem, style)} {...props}>
      {children}
    </View>
  );
}

function AccordionTrigger({ children, onPress, style, isOpen, ...props }) {
  const rotation = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(rotation, { toValue: isOpen ? 1 : 0, duration: 200, useNativeDriver: true }).start();
  }, [isOpen]);

  const rotateInterpolate = rotation.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] });

  return (
    <TouchableOpacity onPress={onPress} style={cn(styles.accordionTrigger, style)} {...props}>
      <Text>{children}</Text>
      <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
        <ChevronDownIcon style={styles.icon} />
      </Animated.View>
    </TouchableOpacity>
  );
}

function AccordionContent({ children, style, isOpen, ...props }) {
  const height = React.useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = React.useState(0);

  React.useEffect(() => {
    Animated.timing(height, { toValue: isOpen ? contentHeight : 0, duration: 200, useNativeDriver: false }).start();
  }, [isOpen, contentHeight]);

  return (
    <Animated.View style={[styles.accordionContent, { height }, style]} {...props}>
      <View onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}>
        {children}
      </View>
    </Animated.View>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

// Usage example logic (added for full functionality):
// <Accordion>
//   <AccordionItem>
//     <AccordionTrigger onPress={() => setOpen(!open)} isOpen={open}>Title</AccordionTrigger>
//     <AccordionContent isOpen={open}>Content</AccordionContent>
//   </AccordionItem>
// </Accordion>