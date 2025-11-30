import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from '@eventure/eventured';

/**
 * Carousel component - A responsive slider for images, cards, or any content.
 *
 * ## Features
 * - Smooth transitions with touch/swipe support
 * - Auto-play with pause on hover
 * - Multiple slides visible
 * - Dot indicators and arrow navigation
 * - Infinite loop or bounded scrolling
 * - Keyboard accessible (arrow keys)
 *
 * ## Usage
 * Perfect for image galleries, product showcases, testimonials, and featured content.
 */
const meta: Meta<typeof Carousel> = {
  title: 'Core/Display/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A versatile carousel/slider component for displaying images, cards, or any content with smooth navigation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    showArrows: {
      control: 'boolean',
      description: 'Show navigation arrows',
    },
    showDots: {
      control: 'boolean',
      description: 'Show dot indicators',
    },
    autoPlay: {
      control: 'boolean',
      description: 'Enable auto-play',
    },
    interval: {
      control: { type: 'number', min: 1000, max: 10000, step: 500 },
      description: 'Auto-play interval in milliseconds',
    },
    loop: {
      control: 'boolean',
      description: 'Enable infinite loop',
    },
    slidesToShow: {
      control: { type: 'number', min: 1, max: 5 },
      description: 'Number of slides to show at once',
    },
    gap: {
      control: { type: 'number', min: 0, max: 48, step: 4 },
      description: 'Gap between slides in pixels',
    },
    arrowSize: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of navigation arrows',
    },
    arrowPosition: {
      control: 'radio',
      options: ['inside', 'outside'],
      description: 'Position of navigation arrows',
    },
    swipeable: {
      control: 'boolean',
      description: 'Enable touch/swipe gestures',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample images for demonstrations
const sampleImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=500&fit=crop',
];

/**
 * Basic carousel with default settings - single slide view.
 */
export const Default: Story = {
  args: {
    children: sampleImages.map((src, index) => (
      <img
        key={index}
        src={src}
        alt={`Slide ${index + 1}`}
        style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px' }}
      />
    )),
  },
};

/**
 * Carousel with auto-play enabled - pauses on hover.
 */
export const AutoPlay: Story = {
  args: {
    autoPlay: true,
    interval: 3000,
    children: sampleImages.map((src, index) => (
      <img
        key={index}
        src={src}
        alt={`Slide ${index + 1}`}
        style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px' }}
      />
    )),
  },
};

/**
 * Multiple slides visible at once - great for product showcases.
 */
export const MultipleSlides: Story = {
  args: {
    slidesToShow: 3,
    slidesToScroll: 1,
    gap: 16,
    children: sampleImages.map((src, index) => (
      <img
        key={index}
        src={src}
        alt={`Slide ${index + 1}`}
        style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px' }}
      />
    )),
  },
};

/**
 * Carousel with cards instead of images.
 */
export const WithCards = () => (
  <Carousel slidesToShow={3} gap={20}>
    {[1, 2, 3, 4, 5, 6].map((num) => (
      <div
        key={num}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '48px 24px',
          borderRadius: '16px',
          color: 'white',
          textAlign: 'center',
          border: '3px solid rgba(0, 0, 0, 0.2)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✨</div>
        <h3 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 12px 0' }}>Card {num}</h3>
        <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>Beautiful card content here</p>
      </div>
    ))}
  </Carousel>
);

/**
 * Product showcase with outside arrows and large size.
 */
export const ProductShowcase: Story = {
  args: {
    slidesToShow: 4,
    gap: 12,
    arrowPosition: 'outside',
    arrowSize: 'lg',
    children: Array.from({ length: 8 }).map((_, index) => (
      <div
        key={index}
        style={{
          background: '#f3f4f6',
          padding: '24px',
          borderRadius: '12px',
          textAlign: 'center',
          border: '2px solid #e5e7eb',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '150px',
            background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            borderRadius: '8px',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
          }}
        >
          🎨
        </div>
        <h4 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 4px 0' }}>
          Product {index + 1}
        </h4>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>$99.00</p>
      </div>
    )),
  },
};

/**
 * Testimonials carousel with centered content.
 */
export const Testimonials = () => (
  <Carousel autoPlay interval={5000} showArrows={false}>
    {[
      {
        quote: 'This product changed my life! Absolutely amazing experience from start to finish.',
        author: 'Sarah Johnson',
        role: 'CEO, TechCorp',
      },
      {
        quote: 'Outstanding quality and exceptional service. Highly recommend to everyone!',
        author: 'Michael Chen',
        role: 'Designer, Creative Studio',
      },
      {
        quote: 'The best investment I made this year. Worth every penny and more!',
        author: 'Emily Rodriguez',
        role: 'Marketing Director',
      },
    ].map((testimonial, index) => (
      <div
        key={index}
        style={{
          background: 'white',
          padding: '64px 48px',
          borderRadius: '16px',
          textAlign: 'center',
          border: '2px solid #e5e7eb',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '24px' }}>💬</div>
        <p
          style={{
            fontSize: '20px',
            lineHeight: '1.6',
            color: '#1f2937',
            marginBottom: '24px',
            fontStyle: 'italic',
          }}
        >
          "{testimonial.quote}"
        </p>
        <div>
          <p style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 4px 0' }}>
            {testimonial.author}
          </p>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>{testimonial.role}</p>
        </div>
      </div>
    ))}
  </Carousel>
);

/**
 * Without infinite loop - stops at boundaries.
 */
export const NoLoop: Story = {
  args: {
    loop: false,
    children: sampleImages
      .slice(0, 3)
      .map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Slide ${index + 1}`}
          style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px' }}
        />
      )),
  },
};

/**
 * Minimal style - no arrows, only dots.
 */
export const MinimalDots: Story = {
  args: {
    showArrows: false,
    autoPlay: true,
    children: sampleImages.map((src, index) => (
      <img
        key={index}
        src={src}
        alt={`Slide ${index + 1}`}
        style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px' }}
      />
    )),
  },
};

/**
 * Hero banner style with large arrows inside.
 */
export const HeroBanner: Story = {
  args: {
    autoPlay: true,
    interval: 4000,
    arrowSize: 'lg',
    showDots: true,
    children: sampleImages.map((src, index) => (
      <div
        key={index}
        style={{
          position: 'relative',
          width: '100%',
          height: '500px',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <img
          src={src}
          alt={`Slide ${index + 1}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '40px',
            color: 'white',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
          }}
        >
          <h2 style={{ fontSize: '36px', fontWeight: '700', margin: '0 0 8px 0' }}>
            Amazing Destination {index + 1}
          </h2>
          <p style={{ fontSize: '18px', margin: 0 }}>Explore the world with us</p>
        </div>
      </div>
    )),
  },
};
