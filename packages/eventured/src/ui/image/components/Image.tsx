'use client';

import React, { useState, useEffect } from 'react';
import {
  ImageWrapperStyled,
  ImageStyled,
  PlaceholderStyled,
  PreviewOverlay,
  PreviewImageContainer,
  PreviewImage,
  PreviewToolbar,
  PreviewButton,
} from './Image.styles';
import { ImageProps } from '../types';

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallbackSrc,
  placeholder = <PlaceholderStyled />,
  className,
  preview = false,
  previewActions,
  ...other
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [scale, setScale] = useState(1);

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const handleImageClick = () => {
    if (preview) {
      setShowPreview(true);
    }
  };

  const handleClosePreview = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowPreview(false);
      setScale(1);
    }
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.5, 0.5));
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = alt || 'image';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleImageZoomClick = () => {
    if (scale < 3) {
      handleZoomIn();
    } else {
      setScale(1);
    }
  };

  // Handle ESC key to close preview
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showPreview) {
        setShowPreview(false);
        setScale(1);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showPreview]);

  // Prevent body scroll when preview is open
  useEffect(() => {
    if (showPreview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showPreview]);

  return (
    <>
      <ImageWrapperStyled className={className} $clickable={preview} onClick={handleImageClick}>
        {!isLoaded && placeholder}
        {!hasError && (
          <ImageStyled
            src={src}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            isVisible={isLoaded}
            //loading="lazy"
            {...other}
          />
        )}
        {hasError && fallbackSrc && (
          <ImageStyled src={fallbackSrc} alt={`Fallback for ${alt}`} isVisible {...other} />
        )}
      </ImageWrapperStyled>

      {showPreview && (
        <PreviewOverlay onClick={handleClosePreview}>
          <PreviewImageContainer>
            <PreviewImage
              src={src}
              alt={alt}
              $scale={scale}
              onClick={handleImageZoomClick}
              onContextMenu={(e) => e.preventDefault()}
            />
          </PreviewImageContainer>

          <PreviewToolbar>
            {previewActions || (
              <>
                <PreviewButton onClick={handleZoomOut} title="Zoom Out" aria-label="Zoom Out">
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
                      d="M20 12H4"
                    />
                  </svg>
                </PreviewButton>
                <PreviewButton onClick={handleZoomIn} title="Zoom In" aria-label="Zoom In">
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </PreviewButton>
                <PreviewButton onClick={handleDownload} title="Download" aria-label="Download">
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </PreviewButton>
                <PreviewButton
                  onClick={() => {
                    setShowPreview(false);
                    setScale(1);
                  }}
                  title="Close"
                  aria-label="Close"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </PreviewButton>
              </>
            )}
          </PreviewToolbar>
        </PreviewOverlay>
      )}
    </>
  );
};

Image.displayName = 'Image';
