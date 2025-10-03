
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, ScrollView, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { cn } from './utils';

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ value, onValueChange, children }) => {
  return (
    <View>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, { value, onValueChange } as any)
          : child
      )}
    </View>
  );
};

interface SelectGroupProps {
  children: React.ReactNode;
}

export const SelectGroup: React.FC<SelectGroupProps> = ({ children }) => {
  return <View>{children}</View>;
};

interface SelectValueProps {
  placeholder?: string;
}

export const SelectValue: React.FC<SelectValueProps> = ({ placeholder }) => {
  return <Text style={styles.selectValue}>{placeholder}</Text>;
};

interface SelectTriggerProps {
  className?: string;
  size?: 'sm' | 'default';
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({
  className,
  size = 'default',
  children,
  value,
  onValueChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={StyleSheet.flatten([
          styles.trigger,
          size === 'sm' ? styles.triggerSm : styles.triggerDefault,
          className ? cn(className) : {},
        ])}
        onPress={() => setIsOpen(true)}
        activeOpacity={0.7}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child) && child.type === SelectValue
            ? React.cloneElement(child as React.ReactElement<any>, { placeholder: value || (child as React.ReactElement<any>).props.placeholder } as any)
            : child
        )}
        <MaterialIcons name="arrow-drop-down" size={16} color="#666" />
      </TouchableOpacity>
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsOpen(false)}
          activeOpacity={1}
        >
          <View style={styles.modalContent}>
            {React.Children.map(children, (child) =>
              React.isValidElement(child) && child.type === SelectContent
                ? React.cloneElement(child as React.ReactElement<any>, { onValueChange, setIsOpen } as any)
                : null
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

interface SelectContentProps {
  className?: string;
  position?: 'popper';
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
  setIsOpen?: (open: boolean) => void;
}

export const SelectContent: React.FC<SelectContentProps> = ({
  className,
  children,
  onValueChange,
  setIsOpen,
}) => {
  return (
    <ScrollView
      style={StyleSheet.flatten([styles.content, className ? cn(className) : {}])}
      contentContainerStyle={styles.contentContainer}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, { onValueChange, setIsOpen } as any)
          : child
      )}
    </ScrollView>
  );
};

interface SelectLabelProps {
  className?: string;
  children: React.ReactNode;
}

export const SelectLabel: React.FC<SelectLabelProps> = ({ className, children }) => {
  return (
    <Text style={StyleSheet.flatten([styles.label, className ? cn(className) : {}])}>
      {children}
    </Text>
  );
};

interface SelectItemProps {
  className?: string;
  value: string;
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
  setIsOpen?: (open: boolean) => void;
}

export const SelectItem: React.FC<SelectItemProps> = ({
  className,
  value,
  children,
  onValueChange,
  setIsOpen,
}) => {
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([styles.item, className ? cn(className) : {}])}
      onPress={() => {
        onValueChange?.(value);
        setIsOpen?.(false);
      }}
      activeOpacity={0.7}
    >
      <Text style={styles.itemText}>{children}</Text>
      <MaterialIcons name="check" size={16} color="#4caf50" style={styles.checkIcon} />
    </TouchableOpacity>
  );
};

interface SelectSeparatorProps {
  className?: string;
}

export const SelectSeparator: React.FC<SelectSeparatorProps> = ({ className }) => {
  return (
    <View style={StyleSheet.flatten([styles.separator, className ? cn(className) : {}])} />
  );
};

interface SelectScrollButtonProps {
  className?: string;
}

export const SelectScrollUpButton: React.FC<SelectScrollButtonProps> = ({ className }) => {
  return (
    <View style={StyleSheet.flatten([styles.scrollButton, className ? cn(className) : {}])}>
      <MaterialIcons name="arrow-upward" size={16} color="#666" />
    </View>
  );
};

export const SelectScrollDownButton: React.FC<SelectScrollButtonProps> = ({ className }) => {
  return (
    <View style={StyleSheet.flatten([styles.scrollButton, className ? cn(className) : {}])}>
      <MaterialIcons name="arrow-downward" size={16} color="#666" />
    </View>
  );
};

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
  },
  triggerDefault: {
    height: 36,
  },
  triggerSm: {
    height: 32,
  },
  selectValue: {
    fontSize: 14,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    maxHeight: '50%',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  contentContainer: {
    padding: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  itemText: {
    fontSize: 14,
    color: '#000',
    flex: 1,
  },
  checkIcon: {
    marginLeft: 8,
  },
  label: {
    fontSize: 12,
    color: '#666',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 8,
    marginVertical: 4,
  },
  scrollButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
  },
});

// Named exports are declared inline above; no re-export block needed.