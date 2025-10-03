
// Auto-generated declarations to reduce TS noise for third-party libs without types

// lucide-react-native icons
declare module 'lucide-react-native' {
  import type { ComponentType } from 'react';
  export const Sun: ComponentType<any>;
  export const Moon: ComponentType<any>;
  export const CheckIcon: ComponentType<any>;
  export const ChevronDownIcon: ComponentType<any>;
  export const Home: ComponentType<any>;
  export const PieChartIcon: ComponentType<any>;
  export const Target: ComponentType<any>;
  export const TrendingUp: ComponentType<any>;
  export const CreditCard: ComponentType<any>;
  export const SearchIcon: ComponentType<any>;
  export const CircleIcon: ComponentType<any>;
  export const ChevronRightIcon: ComponentType<any>;
  const content: any;
  export default content;
}

// react-native-reanimated
declare module 'react-native-reanimated' {
  export const useSharedValue: any;
  export const withTiming: any;
  export const useAnimatedStyle: any;
  export const withSpring: any;
  const anyReanimated: any;
  export default anyReanimated;
}

// victory-native
declare module 'victory-native' {
  export const VictoryPie: any;
  export const VictoryChart: any;
  export const VictoryTooltip: any;
  export const VictoryLegend: any;
  const content: any;
  export default content;
}

// react-native-svg
declare module 'react-native-svg' {
  const content: any;
  export default content;
}

// react-native-toast-message
declare module 'react-native-toast-message' {
  export type ToastConfig = any;
  const Toast: any;
  export default Toast;
}

// clsx utility
declare module 'clsx' {
  export type ClassValue = any;
  export function clsx(...inputs: any[]): string;
  const c: any;
  export default c;
}

// react-native-vector-icons (generic)
declare module 'react-native-vector-icons/*' {
  import type { ComponentType } from 'react';
  export const CheckIcon: ComponentType<any>;
  export const ChevronRightIcon: ComponentType<any>;
  export const ChevronDownIcon: ComponentType<any>;
  export const ChevronLeftIcon: ComponentType<any>;
  export const MoreHorizontalIcon: ComponentType<any>;
  export const MinusIcon: ComponentType<any>;
  export const CircleIcon: ComponentType<any>;
  export default any;
}

// react-native-vector-icons LucideReact specific
declare module 'react-native-vector-icons/LucideReact' {
  import type { ComponentType } from 'react';
  const LucideReact: ComponentType<any>;
  export default LucideReact;
}

// async-storage
declare module '@react-native-async-storage/async-storage' {
  const AsyncStorage: any;
  export default AsyncStorage;
}

// fallback for unknown modules
declare module '*';
