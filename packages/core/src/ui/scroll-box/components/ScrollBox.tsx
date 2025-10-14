import React, { useState, useRef, useEffect } from 'react';
import { Styled } from './ScrollBox.styles';
import { ScrollBoxProps } from '../types';

export const ScrollBox = ({ className, children, height, maxHeight, ...other }: ScrollBoxProps) => {
  const [_hasTopShadow, setHasTopShadow] = useState(false);
  const [_hasBottomShadow, setHasBottomShadow] = useState(false);
  const scrollDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bottom =
      (scrollDivRef?.current?.scrollHeight || 0) - (scrollDivRef?.current?.scrollTop || 0) ===
      scrollDivRef?.current?.clientHeight;
    const top = scrollDivRef?.current?.scrollTop === 0;

    if (!bottom) {
      setHasBottomShadow(true);
    }

    if (!top) {
      setHasTopShadow(true);
    }
  }, [scrollDivRef]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
    const top = e.currentTarget.scrollTop === 0;

    if (!bottom) {
      setHasBottomShadow(true);
    } else {
      setHasBottomShadow(false);
    }

    if (!top) {
      setHasTopShadow(true);
    } else {
      setHasTopShadow(false);
    }
  };

  return (
    <Styled.self
      className={className}
      style={{
        height,
        maxHeight,
      }}
      ref={scrollDivRef}
      onScroll={handleScroll}
      {...other}
    >
      {children}
    </Styled.self>
  );
};
