# Animations in @tavia/taviad

The `@tavia/taviad` library provides two approaches for animations:

## 1. CSS-based Animations (Emotion Keyframes)

Lightweight, performant animations using Emotion's `keyframes` API.

### Import

```typescript
import {
  animations,
  animationDurations,
  animationEasing,
  createAnimation,
  transition,
} from '@tavia/taviad/lib/animations';
```

### Available Animations

- **Fade**: `fadeIn`, `fadeOut`
- **Slide**: `slideInFromTop`, `slideInFromBottom`, `slideInFromLeft`,
  `slideInFromRight`
- **Scale**: `scaleIn`, `scaleOut`
- **Motion**: `bounce`, `pulse`, `spin`, `shake`
- **Loading**: `shimmer`

### Usage Examples

#### Direct Keyframe Usage

```typescript
import styled from '@emotion/styled';
import { animations } from '@tavia/taviad/lib/animations';

const FadeInDiv = styled.div`
  animation: ${animations.fadeIn} 0.3s ease-in-out;
`;
```

#### Using Helper Functions

```typescript
import styled from '@emotion/styled';
import { animations, createAnimation } from '@tavia/taviad/lib/animations';

const AnimatedButton = styled.button`
  ${createAnimation(animations.slideInFromBottom, 'normal', 'easeOut')}
`;
```

#### Transitions

```typescript
import styled from '@emotion/styled';
import { transition } from '@tavia/taviad/lib/animations';

const HoverButton = styled.button`
  ${transition(['background', 'transform'], 'normal', 'easeOut')}

  &:hover {
    background: blue;
    transform: scale(1.05);
  }
`;
```

### Duration & Easing Constants

```typescript
// Durations (in ms)
animationDurations.fast; // 150ms
animationDurations.normal; // 300ms
animationDurations.slow; // 500ms

// Easing functions
animationEasing.linear;
animationEasing.easeIn;
animationEasing.easeOut;
animationEasing.easeInOut;
animationEasing.bounce;
```

## 2. Framer Motion (Advanced Animations)

For complex, gesture-based, or physics-based animations, use Framer Motion.

### Installation

Framer Motion is already included as a dependency in `@tavia/taviad`.

### Usage

```typescript
import { motion } from 'framer-motion';

export const AnimatedCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    Card content
  </motion.div>
);
```

### Common Patterns

#### Hover Animations

```typescript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

#### Stagger Children

```typescript
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

<motion.ul variants={container} initial="hidden" animate="show">
  <motion.li variants={item}>Item 1</motion.li>
  <motion.li variants={item}>Item 2</motion.li>
</motion.ul>
```

## When to Use Each Approach

### Use CSS-based Animations when:

- ✅ Simple fade, slide, or scale effects
- ✅ Performance is critical (loading states, lists)
- ✅ Animation is purely decorative
- ✅ You want minimal bundle size

### Use Framer Motion when:

- ✅ Complex choreographed animations
- ✅ Gesture-based interactions (drag, swipe)
- ✅ Layout animations
- ✅ Physics-based animations
- ✅ Advanced animation sequencing

## Best Practices

1. **Prefer CSS animations for simple effects** - They're more performant
2. **Use `will-change` sparingly** - Only for animations that need it
3. **Respect reduced motion preferences**:
   ```typescript
   @media (prefers-reduced-motion: reduce) {
     * {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```
4. **Keep animations subtle** - Don't distract from content
5. **Test on low-end devices** - Ensure smooth performance

## Examples in Components

See these components for animation examples:

- `LoadingSpinner` - CSS spin animation
- `Modal` - Framer Motion entrance/exit
- `Toast` - CSS slide + fade animation
- `Skeleton` - CSS shimmer effect

## Resources

- [Emotion Keyframes](https://emotion.sh/docs/keyframes)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Web Animation Best Practices](https://web.dev/animations/)
