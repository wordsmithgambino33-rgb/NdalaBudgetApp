
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(Dimensions.get('window').width < MOBILE_BREAKPOINT);
    };

    updateIsMobile();
    const subscription = Dimensions.addEventListener('change', updateIsMobile);
    return () => subscription.remove();
  }, []);

  return !!isMobile;
}