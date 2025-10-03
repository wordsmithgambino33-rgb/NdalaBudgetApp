
import * as React from "react";
import { View, TouchableOpacity, Modal, Text, StyleSheet, Pressable } from "react-native";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react-native";

// cn
const cn = (...styles) => Object.assign({}, ...styles.map(s => styles[s] || s));

const styles = StyleSheet.create({
  content: { backgroundColor: "#fff", padding: 8, borderRadius: 8, shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 10 },
  item: { padding: 12, fontSize: 14 },
});

function ContextMenu({ children }) {
  const [visible, setVisible] = React.useState(false);
  return (
    <Pressable onLongPress={() => setVisible(true)}>{children}
      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }} onPress={() => setVisible(false)}>
          <View style={styles.content}>{/* Render items here */}</View>
        </TouchableOpacity>
      </Modal>
    </Pressable>
  );
}

function ContextMenuTrigger({ children }) { return <View>{children}</View>; } // Wrap in long press

function ContextMenuContent({ children, style }) { return <View style={cn(styles.content, style)}>{children}</View>; }

function ContextMenuItem({ onPress, children, style }) {
  return <TouchableOpacity onPress={onPress} style={cn(styles.item, style)}><Text>{children}</Text></TouchableOpacity>;
}

// Similar for others: CheckboxItem with state, RadioItem, Label, Separator, etc.
function ContextMenuCheckboxItem({ checked, onCheckedChange, children }) {
  return (
    <TouchableOpacity onPress={() => onCheckedChange(!checked)}>
      {checked && <CheckIcon />}
      {children}
    </TouchableOpacity>
  );
}

function ContextMenuRadioItem({ value, onValueChange, children }) {
  return <TouchableOpacity onPress={() => onValueChange(value)}>{children}</TouchableOpacity>;
}

function ContextMenuLabel({ children }) { return <Text style={{ fontWeight: "bold" }}>{children}</Text>; }
function ContextMenuSeparator() { return <View style={{ height: 1, backgroundColor: "#ccc" }} />; }
function ContextMenuShortcut({ children }) { return <Text style={{ fontSize: 12 }}>{children}</Text>; }
// Add Sub, Group, etc., as nested Views

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
};

// Usage: Wrap trigger in ContextMenu, add items to Content.