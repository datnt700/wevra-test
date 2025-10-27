'use client';

/**
 * Swiper styles
 * Provides reusable CSS-in-JS styles for Swiper components
 */
import { css } from '@emotion/react';

/**
 * Base swiper container styles
 */
export const swiperContainer = css`
  width: 100%;
  height: 100%;
`;

/**
 * Individual slide styles
 * Centers content both horizontally and vertically
 */
export const swiperSlide = css`
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/**
 * Image slide styles
 * Ensures images cover the entire slide area
 */
export const swiperSlideImg = css`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Legacy export for backward compatibility
export const swiper = swiperContainer;
