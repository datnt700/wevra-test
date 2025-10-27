/**
 * LoadingLogo component
 * An animated logo SVG component for loading states
 * @module LoadingLogo
 */
import { Styled } from './LoadingLogo.styles';
import { IconType } from '../types';

/**
 * An animated logo component for loading states
 *
 * Features:
 * - Scalable SVG logo
 * - Customizable width and height
 * - Theme-aware fill color
 * - Optimized for loading screens
 *
 * @example
 * ```tsx
 * // Default size
 * <LoadingLogo />
 *
 * // Custom size
 * <LoadingLogo width={150} height={65} />
 *
 * // In loading screen
 * <div className="loading-container">
 *   <LoadingLogo width={120} height={52} />
 *   <p>Loading...</p>
 * </div>
 * ```
 */
export const LoadingLogo = (props: IconType) => (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    width={props.width}
    height={props.height}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 99.86 43.35"
  >
    <Styled.logoColor d="M0,13.42V24.61L15.07,13.94,30.23,24.61V13.42a4.74,4.74,0,0,0-.67-2.87,5.25,5.25,0,0,0-1.79-1.79L15.13,0,2.48,8.76A5.25,5.25,0,0,0,.69,10.55,4.81,4.81,0,0,0,0,13.42Z" />
    <Styled.logoColor d="M0,29.4V43.27H14.47V15.91L2.38,24.67A5.12,5.12,0,0,0,.67,26.46,5,5,0,0,0,0,29.33v.07Z" />
    <Styled.logoColor d="M15.79,38.1v5.16H30.24V24.62L18.15,33.37a5.21,5.21,0,0,0-1.7,1.79A5.07,5.07,0,0,0,15.81,38v.06Z" />
    <Styled.logoColor d="M46.07,38.1v5.16H31.62V24.62l12.09,8.75a5.21,5.21,0,0,1,1.7,1.79A5.07,5.07,0,0,1,46.05,38v.06Z" />
    <Styled.logoColor d="M51.85,30.69H57.6A5,5,0,0,1,61.26,32a3.88,3.88,0,0,1,1.08,2.88v0a3.9,3.9,0,0,1-2.69,3.9l3.07,4.49H59.49l-2.7-4H54.62v4H51.85Zm5.57,6.1c1.37,0,2.12-.7,2.12-1.77v0c0-1.2-.81-1.79-2.17-1.79H54.62v3.6Z" />
    <Styled.logoColor d="M64.84,30.69h9.48v2.46H67.59V35.7h5.92v2.46H67.59V40.8h6.82v2.46H64.84Z" />
    <Styled.logoColor d="M75.79,30.69h3l3.29,8.85,3.29-8.85h3L83.32,43.35H80.87Z" />
    <Styled.logoColor d="M93.26,33.24H89.44V30.69H99.86v2.55H96v10H93.26Z" />
  </svg>
);

LoadingLogo.displayName = 'LoadingLogo';
