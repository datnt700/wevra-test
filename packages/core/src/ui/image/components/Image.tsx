/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { ImageWrapperStyled, ImageStyled, PlaceholderStyled } from './Image.styles';
import { ImageProps } from '../types';

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallbackSrc,
  placeholder = <PlaceholderStyled />,
  className,
  ...other
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <ImageWrapperStyled className={className}>
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
  );
};

Image.displayName = 'Image';
