/**
 * AuthContainer Props
 */
export interface AuthContainerProps {
  /**
   * Content to render inside the auth container
   */
  children: React.ReactNode;

  /**
   * Title text displayed at the top
   */
  title?: string;

  /**
   * Subtitle text displayed below the title
   */
  subtitle?: string;
}
