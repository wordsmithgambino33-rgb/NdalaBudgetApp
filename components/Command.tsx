
import * as React from "react";
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { SearchIcon } from "lucide-react-native";

// cn
const cn = (...styles) => Object.assign({}, ...styles.map(s => styles[s] || s));

const styles = StyleSheet.create({
  command: { flex: 1, backgroundColor: "#fff" },
  inputWrapper: { flexDirection: "row", alignItems: "center", borderBottomWidth: 1, padding: 8 },
  input: { flex: 1, fontSize: 16 },
  list: { flex: 1 },
  item: { padding: 12, fontSize: 14 },
});

function Command({ children, ...props }) {
  return <View style={styles.command} {...props}>{children}</View>;
}

function CommandDialog({ visible, onClose, title, description, children }) {
  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <View style={{ flex: 1 }}>
        <Text>{title}</Text>
        <Text>{description}</Text>
        {children}
      </View>
    </Modal>
  );
}

function CommandInput({ value, onValueChange, style, ...props }) {
  return (
    <View style={styles.inputWrapper}>
      <SearchIcon style={{ width: 20, height: 20 }} />
      <TextInput value={value} onChangeText={onValueChange} style={cn(styles.input, style)} {...props} />
    </View>
  );
}

function CommandList({ data, renderItem, ...props }) {
  return <FlatList data={data} renderItem={renderItem} style={styles.list} {...props} />;
}

function CommandItem({ onPress, children, style }) {
  return <TouchableOpacity onPress={onPress} style={cn(styles.item, style)}><Text>{children}</Text></TouchableOpacity>;
}

// Other sub-components like CommandEmpty, CommandGroup as Views/Texts
function CommandEmpty({ children }) { return <Text>{children}</Text>; }
function CommandGroup({ children }) { return <View>{children}</View>; }
function CommandSeparator() { return <View style={{ height: 1, backgroundColor: "#ccc" }} />; }
function CommandShortcut({ children }) { return <Text style={{ fontSize: 12 }}>{children}</Text>; }

export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator };

// Usage logic: State for search, filter data in FlatList.