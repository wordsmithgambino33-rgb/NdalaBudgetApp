
import * as React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { CheckIcon } from "lucide-react-native";

// cn utility
const cn = (...styles) => Object.assign({}, ...styles.map(s => styles[s] || s));

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  checked: { backgroundColor: "#007aff", borderColor: "#007aff" },
  icon: { width: 16, height: 16, tintColor: "#fff" },
});

function Checkbox({ checked, onCheckedChange, style, ...props }) {
  return (
    <TouchableOpacity
      onPress={() => onCheckedChange(!checked)}
      style={cn(styles.checkbox, checked && styles.checked, style)}
      {...props}
    >
      {checked && <CheckIcon style={styles.icon} />}
    </TouchableOpacity>
  );
}

export { Checkbox };

// Usage: <Checkbox checked={checked} onCheckedChange={setChecked} />