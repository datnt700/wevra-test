/**
 * @eventure/eventured - UI Component Library
 * Flat structure with shadcn/Radix UI-inspired organization
 */

// ========================================
// Theme & Design Tokens
// ========================================
export { theme, lightTheme, darkTheme, type EventureTheme, type ColorMode } from './theme/theme';
export {
  gamingLightTheme,
  gamingDarkTheme,
  gamingCssVars,
  getTheme,
  themes,
  type ThemeName,
} from './theme/themes';
export { breakpoints, mq, mqMax } from './theme/breakpoints';
export { GlobalStyles, globalStyles } from './theme/global';
export { cssVars, semanticColors } from './theme/tokens/colors';
export { radii, type RadiiToken } from './theme/tokens/radii';
export { typography } from './theme/tokens/typography';
export { layout } from './theme/tokens/variables';
export { fontFaces } from './theme/tokens/fonts';
export { SlickGlobalStyles } from './theme/react-slick';
export { swiperContainer, swiperSlide, swiperSlideImg, swiper } from './theme/swiper';

// ========================================
// Providers & Context
// ========================================
export * from './providers';

// ========================================
// Utilities & Helpers
// ========================================
export * from './lib';
export * from './types';
export * from './hooks';
export type { MapVenue } from './types/MapVenue';

// ========================================
// Emotion Cache
// ========================================
export { createEmotionCache, createClientCache, createServerCache } from './lib/createEmotionCache';

// ========================================
// UI Components
// ========================================

// Base Components
export { Avatar, type AvatarProps } from './ui/avatar';
export { Badge, type BadgeProps } from './ui/badge';
export { Button } from './ui/button';
export { Carousel, type CarouselProps } from './ui/carousel';
export { Code } from './ui/code';
export { Icon } from './ui/icon';
export { Image, type ImageProps } from './ui/image';
export { Spinner, type SpinnerProps } from './ui/spinner';
export { Tag, type TagProps } from './ui/tag';

// Radix UI Components
export { Accordion, type AccordionProps, type AccordionTriggerProps } from './ui/accordion';
export { Checkbox, CheckboxCard, type CheckboxProps, type CheckboxCardProps } from './ui/checkbox';
export { DropdownMenu, type DropdownMenuProps } from './ui/dropdown-menu';
export { Modal, type ModalProps } from './ui/modal';
export { Popover, type PopoverProps } from './ui/popover';
export {
  Radio,
  RadioGroup,
  RadioCard,
  type RadioProps,
  type RadioGroupProps,
  type RadioCardProps,
} from './ui/radio';
export { Tabs, type TabsProps } from './ui/tabs';
export { Tooltip, type TooltipProps } from './ui/tooltip';

// Form Components
export { Calendar, type CalendarProps } from './ui/calendar';
export { InputText, type InputProps } from './ui/input';
export { InputNumber, Stepper, type StepperProps } from './ui/input-number';
export { InputTags, type InputTagsProps } from './ui/input-tags';
export { InputSearch } from './ui/input-search';
export { Label } from './ui/label';
export { Field } from './ui/field';
export { ButtonGroup, type ButtonGroupProps } from './ui/button-group';
export { Form, type FormProps } from './ui/form';
export { TextArea, type TextAreaProps } from './ui/textarea';
export { RichTextEditor, type RichTextEditorProps } from './ui/rich-text-editor';
export { Select, type SelectProps } from './ui/select';
export { Slider, type SliderProps } from './ui/slider';
export { Combobox, type ComboboxProps } from './ui/combobox';
export { Switch } from './ui/switch';
export { FileUpload, type FileUploadProps } from './ui/file-upload';
export { ImageUpload, type ImageUploadProps } from './ui/image-upload';

// Dialog Components
export { Alert, type AlertProps } from './ui/alert';
export { Drawer, type DrawerProps } from './ui/drawer';
export { MenuBar, type MenuBarProps } from './ui/menubar';
export { Toast, ToastsContainer, type ToastProps } from './ui/toast';

// Layout Components
export { Card, type CardProps } from './ui/card';
export { Divider, type DividerProps } from './ui/divider';
export { Stack, type StackProps } from './ui/stack';
// Map components are excluded from main export due to SSR issues with browser-only dependencies
// Import them directly when needed: import { LeafletMap } from '@eventure/eventured/ui/leaflet-map'
// export { GoogleMap, type GoogleMapProps } from './ui/google-map';
// export { LeafletMap, type LeafletMapProps } from './ui/leaflet-map';
// export { MapboxMap, type MapboxMapProps } from './ui/mapbox-map';
export { LoadingScreen } from './ui/loading-screen';
export { ScrollBox } from './ui/scroll-box';
export {
  SkeletonDisplayText,
  SkeletonBodyText,
  SketetonTabs,
  SkeletonCard,
  type SkeletonBodyTextProps,
  type SkeletonCardProps,
  type SkeletonDisplayTextProps,
  type SkeletonProps,
} from './ui/skeleton';
export { ThemeWrapper, type ThemeWrapperProps } from './ui/theme-provider';

// Navigation Components
export { Breadcrumb, type BreadcrumbProps } from './ui/breadcrumb';
export { Link, type LinkProps } from './ui/link';
export { Pagination, type PaginationProps } from './ui/pagination';
export { Sidebar } from './ui/sidebar';
export { WizardStepper } from './ui/wizard-stepper';
export type { Step, WizardStepperProps } from './ui/wizard-stepper';

// State Components
export { EmptyState, type EmptyStateProps } from './ui/empty-state';
export { ErrorState, type ErrorStateProps } from './ui/error-state';
export { LoadingLogo } from './ui/loading-logo';
export { LoadingState, type LoadingStateProps } from './ui/loading-state';
export { ProgressBar, type ProgressBarProps } from './ui/progress';

// Table Components
export { DataTable } from './ui/data-table';
export { Table } from './ui/table';

// OAuth Icons
export { GoogleIcon, AppleIcon, FacebookIcon, type OAuthIconProps } from './ui/oauth-icons';
