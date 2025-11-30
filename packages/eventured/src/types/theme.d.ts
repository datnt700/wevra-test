import '@emotion/react';
import type { EventureTheme } from '../theme/theme';

declare module '@emotion/react' {
  export interface Theme extends EventureTheme {}
}
