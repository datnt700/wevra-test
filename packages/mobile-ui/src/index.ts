/**
 * Tavia Mobile UI
 *
 * A React Native design system for Tavia mobile applications.
 * Shares design tokens with @tavia/core for cross-platform consistency.
 *
 * @example
 * ```tsx
 * import { Button } from '@tavia/mobile-ui';
 *
 * export default function App() {
 *   return (
 *     <Button variant="primary" onPress={() => console.log('Pressed!')}>
 *       Press me
 *     </Button>
 *   );
 * }
 * ```
 */

// Components
export { Button } from './components/Button';
export type { ButtonProps, ButtonVariant, ButtonShape, ButtonSize } from './components/Button';

// Theme
export { theme, colors, spacing, radii, typography } from './theme';
export type {
  Theme,
  ColorName,
  SpacingSize,
  RadiiSize,
  FontSize,
  FontWeight,
  LineHeight,
} from './theme';
