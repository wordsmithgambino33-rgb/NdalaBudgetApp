
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { cn } from './utils';
import { useIsMobile } from './useMobile';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './Sheet';
import { Separator } from './Separator';
import { Skeleton } from './Skeleton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SIDEBAR_COOKIE_NAME = 'sidebar_state';
const SIDEBAR_WIDTH = 256;
const SIDEBAR_WIDTH_MOBILE = 288;
const SIDEBAR_WIDTH_ICON = 48;
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

type SidebarContextProps = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }
  return context;
}

interface SidebarProviderProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  style?: object;
  children: React.ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
}) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);
  const [open, setOpen] = useState(defaultOpen);

  const handleSetOpen = (value: boolean | ((value: boolean) => boolean)) => {
    const openState = typeof value === 'function' ? value(open) : value;
    if (setOpenProp) {
      setOpenProp(openState);
    } else {
      setOpen(openState);
    }
    AsyncStorage.setItem(SIDEBAR_COOKIE_NAME, openState.toString());
  };

  const toggleSidebar = () => {
    isMobile ? setOpenMobile(!openMobile) : handleSetOpen(!open);
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    // Note: React Native doesn't support window.addEventListener for keydown
    // This is a placeholder; consider using a library like react-native-keyboardevents
    return () => {};
  }, [toggleSidebar]);

  const state = open ? 'expanded' : 'collapsed';

  const contextValue: SidebarContextProps = {
    state,
    open,
    setOpen: handleSetOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      <View
        style={StyleSheet.flatten([
          styles.wrapper,
          { minHeight: '100%' },
          className ? cn(className) : {},
          style,
        ])}
      >
        {children}
      </View>
    </SidebarContext.Provider>
  );
};

interface SidebarProps {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
  className?: string;
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
}) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === 'none') {
    return (
      <View
        style={StyleSheet.flatten([
          styles.sidebar,
          side === 'left' ? styles.sidebarLeft : styles.sidebarRight,
          variant === 'inset' ? styles.sidebarInset : {},
          className ? cn(className) : {},
        ])}
      >
        {children}
      </View>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent side={side}>
          <View
            style={StyleSheet.flatten([
              styles.sidebar,
              { width: SIDEBAR_WIDTH_MOBILE },
              variant === 'inset' ? styles.sidebarInset : {},
              className ? cn(className) : {},
            ])}
          >
            {children}
          </View>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <View

      style={StyleSheet.flatten([
        styles.sidebar,
        side === 'left' ? styles.sidebarLeft : styles.sidebarRight,
        collapsible === 'icon' && state === 'collapsed' ? { width: SIDEBAR_WIDTH_ICON } : { width: SIDEBAR_WIDTH },
        variant === 'inset' ? styles.sidebarInset : {},
        className ? cn(className) : {},
      ])}
    >
      {children}
    </View>
  );
};

interface SidebarContentProps {
  className?: string;
  children: React.ReactNode;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({ className, children }) => {
  return (
    <View style={StyleSheet.flatten([styles.content, className ? (cn(className) as any) : {}])}>
      {children}
    </View>
  );
};

interface SidebarFooterProps {
  className?: string;
  children: React.ReactNode;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({ className, children }) => {
  return (
    <View style={StyleSheet.flatten([styles.footer, className ? (cn(className) as any) : {}])}>
      {children}
    </View>
  );
};

interface SidebarGroupProps {
  className?: string;
  children: React.ReactNode;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({ className, children }) => {
  return (
    <View style={StyleSheet.flatten([styles.group, className ? (cn(className) as any) : {}])}>
      {children}
    </View>
  );
};

interface SidebarGroupActionProps {
  className?: string;
  children: React.ReactNode;
}

export const SidebarGroupAction: React.FC<SidebarGroupActionProps> = ({ className, children }) => {
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([styles.groupAction, className ? (cn(className) as any) : {}])}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
};

interface SidebarGroupContentProps {
  className?: string;
  children: React.ReactNode;
}

export const SidebarGroupContent: React.FC<SidebarGroupContentProps> = ({ className, children }) => {
  return (
    <View style={StyleSheet.flatten([styles.groupContent, className ? (cn(className) as any) : {}])}>
      {children}
    </View>
  );
};

interface SidebarGroupLabelProps {
  className?: string;
  children: React.ReactNode;
}

export const SidebarGroupLabel: React.FC<SidebarGroupLabelProps> = ({ className, children }) => {
  return (
    <Text style={StyleSheet.flatten([styles.groupLabel, className ? (cn(className) as any) : {}])}>
      {children}
    </Text>
  );
};

interface SidebarHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ className, children }) => {
  return (
    <View style={StyleSheet.flatten([styles.header, className ? (cn(className) as any) : {}])}>
      {children}
    </View>
  );
};

interface SidebarInputProps {
  className?: string;
  children: React.ReactNode;
}

export const SidebarInput: React.FC<SidebarInputProps> = ({ className, children }) => {
  return (
    <TextInput
      style={StyleSheet.flatten([styles.input, className ? (cn(className) as any) : {}])}
      placeholderTextColor="#666"
    />
  );
};

interface SidebarInsetProps {
  className?: string;
  children: React.ReactNode;
}

export const SidebarInset: React.FC<SidebarInsetProps> = ({ className, children }) => {
  return (
    <View style={StyleSheet.flatten([styles.inset, className ? (cn(className) as any) : {}])}>
      {children}
    </View>
  );
};

interface SidebarMenuProps {
  className?: string;
  children: React.ReactNode;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ className, children }) => {
  return (
    <View style={StyleSheet.flatten([styles.menu, className ? (cn(className) as any) : {}])}>
      {children}
    </View>
  );
};

interface SidebarMenuActionProps {
  className?: string;
  showOnHover?: boolean;
  children: React.ReactNode;
}

export const SidebarMenuAction: React.FC<SidebarMenuActionProps> = ({
  className,
  showOnHover,
  children,
}) => {
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([styles.menuAction, className ? (cn(className) as any) : {}])}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
};

interface SidebarMenuBadgeProps {
  className?: string;
  children: React.ReactNode;
}

export const SidebarMenuBadge: React.FC<SidebarMenuBadgeProps> = ({ className, children }) => {
  return (
    <View style={StyleSheet.flatten([styles.menuBadge, className ? (cn(className) as any) : {}])}>
      <Text style={styles.badgeText}>{children}</Text>
    </View>
  );
};

interface SidebarMenuButtonProps {
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  isActive?: boolean;
  showOnHover?: boolean;
  children: React.ReactNode;
  onPress?: () => void;
}

export const SidebarMenuButton: React.FC<SidebarMenuButtonProps> = ({
  className,
  size = 'default',
  isActive,
  showOnHover,
  children,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([
        styles.menuButton,
        size === 'sm' ? styles.menuButtonSm : size === 'lg' ? styles.menuButtonLg : {},
        isActive ? styles.menuButtonActive : {},
        className ? (cn(className) as any) : {},
      ])}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
};

interface SidebarMenuItemProps {
  className?: string;
  children: React.ReactNode;
}

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ className, children }) => {
  return (
    <View style={StyleSheet.flatten([styles.menuItem, className ? (cn(className) as any) : {}])}>
      {children}
    </View>
  );
};

interface SidebarMenuSkeletonProps {
  className?: string;
  showIcon?: boolean;
  children?: React.ReactNode;
}

export const SidebarMenuSkeleton: React.FC<SidebarMenuSkeletonProps> = ({
  className,
  showIcon,
}) => {
  const width = `${Math.floor(Math.random() * 40) + 50}%`;

  return (
    <View style={StyleSheet.flatten([styles.menuSkeleton, className ? (cn(className) as any) : {}])}>
      {showIcon && <Skeleton style={styles.skeletonIcon} />}
      <Skeleton style={[styles.skeletonText as any, { width } as any] as any} />
    </View>
  );
};

interface SidebarMenuSubProps {
  className?: string;
  children: React.ReactNode;
}

export const SidebarMenuSub: React.FC<SidebarMenuSubProps> = ({ className, children }) => {
  return (
    <View style={StyleSheet.flatten([styles.menuSub, className ? (cn(className) as any) : {}])}>
      {children}
    </View>
  );
};

interface SidebarMenuSubItemProps {
  className?: string;
  children: React.ReactNode;
}

export const SidebarMenuSubItem: React.FC<SidebarMenuSubItemProps> = ({ className, children }) => {
  return (
    <View style={StyleSheet.flatten([styles.menuSubItem, className ? (cn(className) as any) : {}])}>
      {children}
    </View>
  );
};

interface SidebarMenuSubButtonProps {
  className?: string;
  size?: 'sm' | 'md';
  isActive?: boolean;
  children: React.ReactNode;
}

export const SidebarMenuSubButton: React.FC<SidebarMenuSubButtonProps> = ({
  className,
  size = 'md',
  isActive,
  children,
}) => {
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([
        styles.menuSubButton,
        size === 'sm' ? styles.menuSubButtonSm : {},
        isActive ? styles.menuSubButtonActive : {},
        className ? (cn(className) as any) : {},
      ])}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
};

interface SidebarRailProps {
  className?: string;
}

export const SidebarRail: React.FC<SidebarRailProps> = ({ className }) => {
  return <View style={StyleSheet.flatten([styles.rail, className ? (cn(className) as any) : {}])} />;
};

interface SidebarSeparatorProps {
  className?: string;
}

export const SidebarSeparator: React.FC<SidebarSeparatorProps> = ({ className }) => {
  return <Separator className={cn('my-2', className)} />;
};

interface SidebarTriggerProps {
  className?: string;
  children: React.ReactNode;
}

export const SidebarTrigger: React.FC<SidebarTriggerProps> = ({ className, children }) => {
  const { toggleSidebar } = useSidebar();

  return (
    <TouchableOpacity
      style={StyleSheet.flatten([styles.trigger, className ? (cn(className) as any) : {}])}
      onPress={toggleSidebar}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  sidebar: {
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  sidebarLeft: {
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  sidebarRight: {
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
  },
  sidebarInset: {
    backgroundColor: '#e0e0e0',
  },
  content: {
    flex: 1,
    padding: 8,
  },
  footer: {
    padding: 16,
  },
  group: {
    paddingVertical: 8,
  },
  groupAction: {
    padding: 8,
  },
  groupContent: {
    paddingHorizontal: 8,
  },
  groupLabel: {
    fontSize: 12,
    color: '#666',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  header: {
    padding: 16,
  },
  input: {
    height: 36,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  inset: {
    flex: 1,
  },
  menu: {
    paddingVertical: 4,
  },
  menuAction: {
    position: 'absolute',
    top: 6,
    right: 4,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuBadge: {
    position: 'absolute',
    right: 4,
    top: 6,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 6,
  },
  menuButtonSm: {
    padding: 6,
  },
  menuButtonLg: {
    padding: 10,
  },
  menuButtonActive: {
    backgroundColor: '#e0e0e0',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    borderRadius: 6,
  },
  skeletonIcon: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  skeletonText: {
    height: 16,
    flex: 1,
  },
  menuSub: {
    marginLeft: 14,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    flexDirection: 'column',
    gap: 4,
    paddingVertical: 2,
  },
  menuSubItem: {
    flexDirection: 'row',
  },
  menuSubButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 6,
  },
  menuSubButtonSm: {
    padding: 6,
  },
  menuSubButtonActive: {
    backgroundColor: '#e0e0e0',
  },
    rail: {
      width: 2,
      backgroundColor: '#ccc',
    },
    trigger: {
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
    },
});

// Exports are defined inline above for each component.