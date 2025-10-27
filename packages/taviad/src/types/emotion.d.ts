import '@emotion/react';
import type { TaviaTheme } from '../theme/theme';

declare module '@emotion/react' {
  export interface Theme extends TaviaTheme {}
}
