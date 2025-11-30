/**
 * Eventurex - Eventure Mobile UI
 *
 * A React Native design system for Eventure mobile applications.
 * Shares design tokens with @eventure/eventured for cross-platform consistency.
 *
 * @example
 * ```tsx
 * import { Button, TextInput, Text } from '@eventure/eventurex';
 *
 * export default function App() {
 *   return (
 *     <>
 *       <Text variant="h1">Welcome</Text>
 *       <TextInput label="Email" placeholder="Enter email" />
 *       <Button variant="primary" onPress={() => console.log('Pressed!')}>
 *         Press me
 *       </Button>
 *     </>
 *   );
 * }
 * ```
 */

// Components
export { Button } from './components/Button';
export type { ButtonProps, ButtonVariant, ButtonShape, ButtonSize } from './components/Button';

export { SocialButton } from './components/SocialButton';
export type { SocialButtonProps } from './components/SocialButton';

export { TextInput } from './components/TextInput';
export type { TextInputProps } from './components/TextInput';

export { Text } from './components/Text';
export type { EventureTextProps, TextVariant, TextColor } from './components/Text';

export { AuthContainer } from './components/AuthContainer';
export type { AuthContainerProps } from './components/AuthContainer';

export { AuthDivider } from './components/AuthDivider';
export type { AuthDividerProps } from './components/AuthDivider';

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
