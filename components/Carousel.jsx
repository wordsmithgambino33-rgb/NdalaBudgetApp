
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import { Button } from './Button';

const CarouselContext = React.createContext(null);

const useCarousel = () => {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }
  return context;
};

const Carousel = ({ orientation = 'horizontal', style, children, ...props }) => {
  const scrollRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollPrev = () => {
    if (scrollRef.current && canScrollPrev) {
      scrollRef.current.scrollTo({
        x: orientation === 'horizontal' ? (currentIndex - 1) * Dimensions.get('window').width : 0,
        y: orientation === 'vertical' ? (currentIndex - 1) * 300 : 0,
        animated: true,
      });
      setCurrentIndex(currentIndex - 1);
    }
  };

  const scrollNext = () => {
    if (scrollRef.current && canScrollNext) {
      scrollRef.current.scrollTo({
        x: orientation === 'horizontal' ? (currentIndex + 1) * Dimensions.get('window').width : 0,
        y: orientation === 'vertical' ? (currentIndex + 1) * 300 : 0,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <CarouselContext.Provider
      value={{
        scrollRef,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <View style={[styles.carousel, style]} {...props}>
        {children}
      </View>
    </CarouselContext.Provider>
  );
};

const CarouselContent = ({ style, children, ...props }) => {
  const { scrollRef, orientation } = useCarousel();
  return (
    <ScrollView
      ref={scrollRef}
      horizontal={orientation === 'horizontal'}
      style={styles.content}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...props}
    >
      <View
        style={[
          styles.contentInner,
          orientation === 'vertical' && styles.contentVertical,
        ]}
      >
        {children}
      </View>
    </ScrollView>
  );
};

const CarouselItem = ({ style, children, ...props }) => {
  const { orientation } = useCarousel();
  return (
    <View
      style={[
        styles.item,
        orientation === 'horizontal' && { width: Dimensions.get('window').width },
        orientation === 'vertical' && { height: 300 },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const CarouselPrevious = ({ style, ...props }) => {
  const { scrollPrev, canScrollPrev, orientation } = useCarousel();
  return (
    <Button
      variant="outline"
      size="icon"
      style={[
        styles.navButton,
        orientation === 'horizontal' ? styles.navHorizontalPrev : styles.navVerticalPrev,
        style,
      ]}
      disabled={!canScrollPrev}
      onPress={scrollPrev}
      {...props}
    >
      <Text>←</Text>
    </Button>
  );
};

const CarouselNext = ({ style, ...props }) => {
  const { scrollNext, canScrollNext, orientation } = useCarousel();
  return (
    <Button
      variant="outline"
      size="icon"
      style={[
        styles.navButton,
        orientation === 'horizontal' ? styles.navHorizontalNext : styles.navVerticalNext,
        style,
      ]}
      disabled={!canScrollNext}
      onPress={scrollNext}
      {...props}
    >
      <Text>→</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  carousel: {
    position: 'relative',
  },
  content: {
    flexGrow: 0,
  },
  contentInner: {
    flexDirection: 'row',
  },
  contentVertical: {
    flexDirection: 'column',
  },
  item: {
    flexShrink: 0,
    flexGrow: 0,
  },
  navButton: {
    position: 'absolute',
    borderRadius: 20,
  },
  navHorizontalPrev: {
    left: 10,
    top: '50%',
    transform: [{ translateY: -20 }],
  },
  navHorizontalNext: {
    right: 10,
    top: '50%',
    transform: [{ translateY: -20 }],
  },
  navVerticalPrev: {
    top: 10,
    left: '50%',
    transform: [{ translateX: -20 }],
  },
  navVerticalNext: {
    bottom: 10,
    left: '50%',
    transform: [{ translateX: -20 }],
  },
});

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };