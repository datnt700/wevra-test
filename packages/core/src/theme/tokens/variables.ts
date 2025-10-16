/**
 * Legacy style variables for backward compatibility
 * @deprecated Use theme.radii, theme.spacing, and theme.sizing instead
 */
export const styleVars = {
  // Border radii (deprecated - use theme.radii)
  borderRadiusSmall: '4px',
  borderRadiusMedium: '6px',
  borderRadiusLarge: '12px',
  borderRadiusRound: '50%',

  // Layout dimensions (deprecated - use theme.sizing)
  sidebarWidth: '4rem', // 64px
  sidebarOpenWidth: '16rem', // 256px
  sidebarHeight: '3.75rem', // 60px
  formHeight: '50px',
  headerHeight: '4rem', // 64px
} as const;

/**
 * Modern layout constants (use these instead of styleVars)
 */
export const layout = {
  sidebar: {
    collapsed: '4rem', // 64px
    expanded: '16rem', // 256px
    height: '3.75rem', // 60px
  },
  header: {
    height: '4rem', // 64px
  },
  footer: {
    height: '4rem', // 64px
  },
  form: {
    height: {
      sm: '2rem', // 32px
      md: '2.5rem', // 40px
      lg: '3rem', // 48px
    },
  },
} as const;
