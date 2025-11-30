'use client';

/**
 * Carousel Component
 * Image/content slider with navigation controls and auto-play
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Styled } from './Carousel.styles';
import type { CarouselProps } from '../types';

export const Carousel: React.FC<CarouselProps> = ({
  children,
  showArrows = true,
  showDots = true,
  autoPlay = false,
  interval = 3000,
  loop = true,
  slidesToShow = 1,
  slidesToScroll = 1,
  gap = 16,
  className,
  onChange,
  arrowSize = 'md',
  arrowPosition = 'inside',
  swipeable = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = React.Children.count(children);
  const maxIndex = Math.max(0, totalSlides - slidesToShow);

  const goToSlide = useCallback(
    (index: number) => {
      let newIndex = index;
      if (loop) {
        if (index < 0) newIndex = maxIndex;
        if (index > maxIndex) newIndex = 0;
      } else {
        newIndex = Math.max(0, Math.min(index, maxIndex));
      }
      setCurrentIndex(newIndex);
      onChange?.(newIndex);
    },
    [maxIndex, loop, onChange]
  );

  const goToNext = useCallback(() => {
    goToSlide(currentIndex + slidesToScroll);
  }, [currentIndex, slidesToScroll, goToSlide]);

  const goToPrev = useCallback(() => {
    goToSlide(currentIndex - slidesToScroll);
  }, [currentIndex, slidesToScroll, goToSlide]);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && !isPaused) {
      autoPlayRef.current = setInterval(() => {
        goToNext();
      }, interval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, isPaused, interval, goToNext]);

  // Touch/swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!swipeable || !e.targetTouches[0]) return;
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!swipeable || !e.targetTouches[0]) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!swipeable || touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrev();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const canGoPrev = loop || currentIndex > 0;
  const canGoNext = loop || currentIndex < maxIndex;

  return (
    <Styled.Container
      className={className}
      $arrowPosition={arrowPosition}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Styled.Viewport
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Styled.Track $currentIndex={currentIndex} $gap={gap} $slidesToShow={slidesToShow}>
          {React.Children.map(children, (child, index) => (
            <Styled.Slide key={index} $slidesToShow={slidesToShow} $gap={gap}>
              {child}
            </Styled.Slide>
          ))}
        </Styled.Track>
      </Styled.Viewport>

      {showArrows && (
        <>
          <Styled.Arrow
            $position="left"
            $arrowPosition={arrowPosition}
            $size={arrowSize}
            onClick={goToPrev}
            disabled={!canGoPrev}
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Styled.Arrow>
          <Styled.Arrow
            $position="right"
            $arrowPosition={arrowPosition}
            $size={arrowSize}
            onClick={goToNext}
            disabled={!canGoNext}
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Styled.Arrow>
        </>
      )}

      {showDots && (
        <Styled.DotsContainer>
          {Array.from({ length: Math.ceil(totalSlides / slidesToShow) }).map((_, index) => (
            <Styled.Dot
              key={index}
              $active={index === currentIndex}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </Styled.DotsContainer>
      )}
    </Styled.Container>
  );
};

Carousel.displayName = 'Carousel';
