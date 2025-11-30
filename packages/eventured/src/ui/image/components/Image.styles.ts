'use client';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const zoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const ImageWrapperStyled = styled.div<{ $clickable?: boolean }>`
  position: relative;
  display: block;
  overflow: hidden;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};

  ${({ $clickable }) =>
    $clickable &&
    `
    &:hover {
      opacity: 0.9;
    }
  `}
`;

export const ImageStyled = styled.img<{ isVisible: boolean }>`
  width: 100%;
  height: auto;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  transition: opacity 0.3s ease;
`;

export const PlaceholderStyled = styled.div`
  background-color: #f3f3f3;
  width: 100%;
  height: 100%;
`;

export const PreviewOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.2s ease;
  cursor: zoom-out;
`;

export const PreviewImageContainer = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${zoomIn} 0.3s ease;
`;

export const PreviewImage = styled.img<{ $scale: number }>`
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  transform: scale(${({ $scale }) => $scale});
  transition: transform 0.2s ease;
  cursor: ${({ $scale }) => ($scale < 3 ? 'zoom-in' : 'zoom-out')};
`;

export const PreviewToolbar = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 8px;
  z-index: 10000;
`;

export const PreviewButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const PreviewCounter = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  z-index: 10000;
`;
