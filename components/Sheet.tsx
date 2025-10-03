
import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { cn } from './utils';

interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const Sheet: React.FC<SheetProps> = ({ open = false, onOpenChange, children }) => {
  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent
      onRequestClose={() => onOpenChange?.(false)}
    >
      <View style={styles.overlay}>
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<any>, { onOpenChange } as any)
            : child
        )}
      </View>
    </Modal>
  );
};

interface SheetTriggerProps {
  children: React.ReactNode;
}

export const SheetTrigger: React.FC<SheetTriggerProps> = ({ children }) => {
  return <View>{children}</View>;
};

interface SheetCloseProps {
  children: React.ReactNode;
}

export const SheetClose: React.FC<SheetCloseProps> = ({ children }) => {
  return <View>{children}</View>;
};

interface SheetPortalProps {
  children: React.ReactNode;
}

export const SheetPortal: React.FC<SheetPortalProps> = ({ children }) => {
  return <View>{children}</View>;
};

interface SheetOverlayProps {
  className?: string;
}

export const SheetOverlay: React.FC<SheetOverlayProps> = ({ className }) => {
  return (
    <View style={StyleSheet.flatten([styles.sheetOverlay, className ? cn(className) : {}])} />
  );
};

interface SheetContentProps {
  className?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

export const SheetContent: React.FC<SheetContentProps> = ({
  className,
  side = 'right',
  children,
  onOpenChange,
}) => {
  return (
    <SheetPortal>
      <SheetOverlay />
      <View
        style={StyleSheet.flatten([
          styles.sheetContent,
          side === 'right' && styles.sheetContentRight,
          side === 'left' && styles.sheetContentLeft,
          side === 'top' && styles.sheetContentTop,
          side === 'bottom' && styles.sheetContentBottom,
          className ? cn(className) : {},
        ])}
      >
        {children}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => onOpenChange?.(false)}
          activeOpacity={0.7}
        >
          <MaterialIcons name="close" size={16} color="#666" />
        </TouchableOpacity>
      </View>
    </SheetPortal>
  );
};

interface SheetHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export const SheetHeader: React.FC<SheetHeaderProps> = ({ className, children }) => {
  return (
    <View style={StyleSheet.flatten([styles.header, className ? cn(className) : {}])}>
      {children}
    </View>
  );
};

interface SheetFooterProps {
  className?: string;
  children: React.ReactNode;
}

export const SheetFooter: React.FC<SheetFooterProps> = ({ className, children }) => {
  return (
    <View style={StyleSheet.flatten([styles.footer, className ? cn(className) : {}])}>
      {children}
    </View>
  );
};

interface SheetTitleProps {
  className?: string;
  children: React.ReactNode;
}

export const SheetTitle: React.FC<SheetTitleProps> = ({ className, children }) => {
  return (
    <Text style={StyleSheet.flatten([styles.title, className ? cn(className) : {}])}>
      {children}
    </Text>
  );
};

interface SheetDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

export const SheetDescription: React.FC<SheetDescriptionProps> = ({ className, children }) => {
  return (
    <Text style={StyleSheet.flatten([styles.description, className ? cn(className) : {}])}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheetContent: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  sheetContentRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '75%',
    maxWidth: 320,
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
  },
  sheetContentLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '75%',
    maxWidth: 320,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  sheetContentTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 'auto',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sheetContentBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 'auto',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
  },
  header: {
    flexDirection: 'column',
    gap: 6,
    padding: 16,
  },
  footer: {
    marginTop: 'auto',
    flexDirection: 'column',
    gap: 8,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

// Named exports declared above; no additional re-export block.