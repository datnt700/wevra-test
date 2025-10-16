/**
 * Typography scale with responsive variants
 * Uses CSS properties directly for Emotion compatibility
 */
export const typography = {
  // Desktop typography
  h1: {
    fontSize: '4rem', // 64px
    fontWeight: 900,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontSize: '3rem', // 48px
    fontWeight: 800,
    lineHeight: 1.25,
    letterSpacing: '-0.01em',
  },
  h3: {
    fontSize: '2.5rem', // 40px
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
  },
  h4: {
    fontSize: '2rem', // 32px
    fontWeight: 700,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: '1.5rem', // 24px
    fontWeight: 600,
    lineHeight: 1.5,
  },
  h6: {
    fontSize: '1.25rem', // 20px
    fontWeight: 600,
    lineHeight: 1.5,
  },
  body1: {
    fontSize: '1rem', // 16px
    fontWeight: 400,
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '0.875rem', // 14px
    fontWeight: 400,
    lineHeight: 1.5,
  },
  subtitle1: {
    fontSize: '1.5rem', // 24px
    fontWeight: 500,
    lineHeight: 1.4,
  },
  subtitle2: {
    fontSize: '1.125rem', // 18px
    fontWeight: 500,
    lineHeight: 1.4,
  },
  label: {
    fontSize: '1rem', // 16px
    fontWeight: 600,
    lineHeight: 1.5,
  },
  caption: {
    fontSize: '0.75rem', // 12px
    fontWeight: 400,
    lineHeight: 1.5,
  },
  overline: {
    fontSize: '0.75rem', // 12px
    fontWeight: 600,
    lineHeight: 1.5,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
  },

  // Mobile typography overrides
  mobile: {
    h1: {
      fontSize: '2.5rem', // 40px
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem', // 32px
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.75rem', // 28px
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem', // 24px
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem', // 16px
      fontWeight: 400,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: '1.25rem', // 20px
      fontWeight: 500,
      lineHeight: 1.4,
    },
    label: {
      fontSize: '0.875rem', // 14px
      fontWeight: 600,
      lineHeight: 1.5,
    },
  },

  // Legacy properties for backward compatibility (CSS strings)
  heading2: `
    text-align: center;
    font-size: 4rem;
    font-weight: 900;
    line-height: 1.2;
  `,
  heading3: `
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.3;
  `,
  heading4: `
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.4;
  `,
  subTitle: `
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.4;
  `,
  mobileHeading: `
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.25;
  `,
  mobileBody1: `
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5;
  `,
  mobileBody2: `
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
  `,
  mobileSubtitle: `
    font-size: 1.667rem;
    font-weight: 600;
    line-height: 1.4;
  `,
  mobileLabel: `
    font-size: 1.333rem;
    font-weight: 500;
    line-height: 1.5;
  `,
  mobileCaption3: `
    font-size: 0.833rem;
    font-weight: 400;
    line-height: 1.5;
  `,
} as const;
