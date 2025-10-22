import { keyframes, css } from '@emotion/react';

// Re-export css for convenience
export { css };

/**
 * Animation keyframes for common UI animations.
 * These can be used with Emotion's `animation` property.
 *
 * @example
 * ```typescript
 * import { animations } from '@tavia/core';
 *
 * const Button = styled.button`
 *   animation: ${animations.fadeIn} 0.3s ease-in-out;
 * `;
 * ```
 */
export const animations = {
  // Fade animations
  fadeIn: keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `,

  fadeOut: keyframes`
    from { opacity: 1; }
    to { opacity: 0; }
  `,

  // Slide animations
  slideInFromTop: keyframes`
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `,

  slideInFromBottom: keyframes`
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `,

  slideInFromLeft: keyframes`
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  `,

  slideInFromRight: keyframes`
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  `,

  // Scale animations
  scaleIn: keyframes`
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  `,

  scaleOut: keyframes`
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  `,

  // Bounce animations
  bounce: keyframes`
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  `,

  // Pulse animation
  pulse: keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  `,

  // Spin animation
  spin: keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `,

  // Shake animation
  shake: keyframes`
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  `,

  // Shimmer animation (for loading skeletons)
  shimmer: keyframes`
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  `,
} as const;

/**
 * Animation duration constants (in milliseconds).
 * Use these for consistent timing across components.
 */
export const animationDurations = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

/**
 * Animation easing functions.
 * Use these for consistent easing curves.
 */
export const animationEasing = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

/**
 * Helper function to create animation CSS string.
 *
 * @example
 * ```typescript
 * const Button = styled.button`
 *   ${createAnimation(animations.fadeIn, 'normal', 'easeOut')}
 * `;
 * ```
 */
export function createAnimation(
  keyframe: ReturnType<typeof keyframes>,
  duration: keyof typeof animationDurations = 'normal',
  easing: keyof typeof animationEasing = 'easeInOut',
  delay = 0
) {
  return css`
    animation: ${keyframe} ${animationDurations[duration]}ms ${animationEasing[easing]} ${delay}ms;
  `;
}

/**
 * CSS transition helper.
 *
 * @example
 * ```typescript
 * const Button = styled.button`
 *   ${transition(['background', 'transform'], 'normal', 'easeOut')}
 * `;
 * ```
 */
export function transition(
  properties: string | string[],
  duration: keyof typeof animationDurations = 'normal',
  easing: keyof typeof animationEasing = 'easeInOut'
) {
  const props = Array.isArray(properties) ? properties : [properties];
  const transitions = props
    .map((prop) => `${prop} ${animationDurations[duration]}ms ${animationEasing[easing]}`)
    .join(', ');

  return `transition: ${transitions};`;
}
