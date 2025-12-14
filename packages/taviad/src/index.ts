// Compatibility shim: provide a small compatibility surface so older imports
// of `@tavia/taviad` continue to work with the new `@eventure/eventured`
// package without relying on `export *` (which can cause conflicts when the
// target module uses non-ES export shapes).

import * as _eventured from '@eventure/eventured';

// Basic re-exports used across the monorepo
export { GlobalStyles, getTheme } from '@eventure/eventured';
export type { EventureTheme } from '@eventure/eventured';

// Provide legacy alias types for compatibility
export type { EventureTheme as TaviaTheme } from '@eventure/eventured';

// Default / namespace export (useful for consumers importing the whole package)
export default _eventured;
// Also export emotion cache helpers for SSR hydration
export { createEmotionCache, createClientCache, createServerCache } from '@eventure/eventured';
