'use client';

import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useState } from 'react';
import { animations, createAnimation, transition, css } from '@tavia/core';
import styles from './page.module.css';

// Emotion-based animated components
const EmotionCard = styled.div`
  padding: 2rem;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  ${createAnimation(animations.fadeIn, 'normal', 'easeOut')}
`;

const EmotionButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  background: #3b82f6;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  ${transition(['background', 'transform'], 'fast', 'easeOut')}

  &:hover {
    background: #2563eb;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const SlideInCard = styled.div<{ $delay?: number }>`
  padding: 2rem;
  border-radius: 8px;
  background: white;
  border: 2px solid #e5e7eb;
  ${(props) => css`
    animation: ${animations.slideInFromBottom} 0.5s ease-out ${props.$delay || 0}ms;
  `}
`;

const SpinnerBox = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #f3f4f6;
  border-top-color: #3b82f6;
  border-radius: 50%;
  ${css`
    animation: ${animations.spin} 1s linear infinite;
  `}
`;

const ShimmerBox = styled.div`
  width: 100%;
  height: 100px;
  background: linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%);
  background-size: 200% 100%;
  border-radius: 8px;
  ${css`
    animation: ${animations.shimmer} 1.5s infinite;
  `}
`;

const PulseBox = styled.div`
  padding: 2rem;
  background: #fbbf24;
  border-radius: 8px;
  ${css`
    animation: ${animations.pulse} 2s ease-in-out infinite;
  `}
`;

export default function AnimationsPage() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Animation Examples</h1>
        <p>Demonstrating both Emotion and Framer Motion animations</p>

        {/* Emotion Animations Section */}
        <section style={{ marginTop: '3rem' }}>
          <h2>Emotion (CSS-based) Animations</h2>

          <div style={{ display: 'grid', gap: '2rem', marginTop: '2rem' }}>
            {/* Fade In */}
            <div>
              <h3>Fade In Animation</h3>
              <EmotionCard>
                <h4>Fade In Card</h4>
                <p>This card fades in when the page loads using Emotion keyframes.</p>
              </EmotionCard>
            </div>

            {/* Hover Effects */}
            <div>
              <h3>Hover Transitions</h3>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <EmotionButton>Hover Me</EmotionButton>
                <EmotionButton>Click Me</EmotionButton>
                <EmotionButton>Try Me</EmotionButton>
              </div>
            </div>

            {/* Slide In Cards */}
            <div>
              <h3>Staggered Slide In</h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <SlideInCard $delay={0}>
                  <strong>Card 1</strong> - Slides in immediately
                </SlideInCard>
                <SlideInCard $delay={100}>
                  <strong>Card 2</strong> - Slides in after 100ms
                </SlideInCard>
                <SlideInCard $delay={200}>
                  <strong>Card 3</strong> - Slides in after 200ms
                </SlideInCard>
              </div>
            </div>

            {/* Loading States */}
            <div>
              <h3>Loading Animations</h3>
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div>
                  <p style={{ marginBottom: '0.5rem' }}>Spinner:</p>
                  <SpinnerBox />
                </div>
                <div style={{ flex: 1, minWidth: '250px' }}>
                  <p style={{ marginBottom: '0.5rem' }}>Shimmer (Skeleton):</p>
                  <ShimmerBox />
                </div>
              </div>
            </div>

            {/* Pulse */}
            <div>
              <h3>Pulse Animation</h3>
              <PulseBox>
                <strong>Pulsing Box</strong>
                <p>This box pulses to draw attention</p>
              </PulseBox>
            </div>
          </div>
        </section>

        {/* Framer Motion Section */}
        <section style={{ marginTop: '4rem' }}>
          <h2>Framer Motion (Interactive) Animations</h2>

          <div style={{ display: 'grid', gap: '2rem', marginTop: '2rem' }}>
            {/* Basic Motion */}
            <div>
              <h3>Fade & Slide In</h3>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  padding: '2rem',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                  borderRadius: '8px',
                }}
              >
                <h4>Smooth Entrance</h4>
                <p>Animated with Framer Motion initial/animate props</p>
              </motion.div>
            </div>

            {/* Hover & Tap */}
            <div>
              <h3>Interactive Gestures</h3>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    padding: '1rem 2rem',
                    border: 'none',
                    borderRadius: '8px',
                    background: '#10b981',
                    color: 'white',
                    fontSize: '1rem',
                    cursor: 'pointer',
                  }}
                >
                  Hover & Click
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95, rotate: -5 }}
                  style={{
                    padding: '1rem 2rem',
                    border: 'none',
                    borderRadius: '8px',
                    background: '#ef4444',
                    color: 'white',
                    fontSize: '1rem',
                    cursor: 'pointer',
                  }}
                >
                  Rotate On Tap
                </motion.button>
              </div>
            </div>

            {/* Counter with Animation */}
            <div>
              <h3>Animated Counter</h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCount(count + 1)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '6px',
                    background: '#3b82f6',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  Increment
                </motion.button>
                <motion.div
                  key={count}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{
                    padding: '1rem 2rem',
                    background: '#f3f4f6',
                    borderRadius: '8px',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                  }}
                >
                  {count}
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCount(0)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '6px',
                    background: '#6b7280',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  Reset
                </motion.button>
              </div>
            </div>

            {/* Toggle with Animation */}
            <div>
              <h3>Animated Visibility Toggle</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsVisible(!isVisible)}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '6px',
                  background: '#8b5cf6',
                  color: 'white',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  marginBottom: '1rem',
                }}
              >
                {isVisible ? 'Hide' : 'Show'} Box
              </motion.button>

              {isVisible && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    padding: '2rem',
                    background: '#ddd6fe',
                    borderRadius: '8px',
                    overflow: 'hidden',
                  }}
                >
                  <h4>Animated Box</h4>
                  <p>This box animates in and out smoothly!</p>
                </motion.div>
              )}
            </div>

            {/* Stagger Children */}
            <div>
              <h3>Stagger Animation</h3>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                style={{ display: 'grid', gap: '0.5rem' }}
              >
                {['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'].map((feature, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    style={{
                      padding: '1rem',
                      background: 'white',
                      border: '2px solid #e5e7eb',
                      borderRadius: '6px',
                    }}
                  >
                    ✓ {feature}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Draggable */}
            <div>
              <h3>Draggable Element</h3>
              <motion.div
                drag
                dragConstraints={{ left: 0, right: 200, top: 0, bottom: 100 }}
                dragElastic={0.2}
                whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
                style={{
                  padding: '2rem',
                  background: '#fbbf24',
                  borderRadius: '8px',
                  cursor: 'grab',
                  display: 'inline-block',
                }}
              >
                <strong>Drag Me!</strong>
                <p style={{ margin: '0.5rem 0 0 0' }}>You can drag this box around</p>
              </motion.div>
            </div>
          </div>
        </section>

        <footer style={{ marginTop: '4rem', textAlign: 'center', color: '#6b7280' }}>
          <p>
            See{' '}
            <a
              href="https://www.framer.com/motion/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#3b82f6' }}
            >
              Framer Motion docs
            </a>{' '}
            for more examples
          </p>
        </footer>
      </main>
    </div>
  );
}
