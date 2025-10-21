/**
 * Props for the CheckboxCard component.
 */
export interface CheckboxCardProps {
  /**
   * The main label or title of the checkbox card.
   */
  label?: React.ReactNode;

  /**
   * Boolean indicating if the checkbox is selected.
   */
  checked?: boolean;

  /**
   * Callback function triggered when the checkbox state changes.
   * - The parameter `checked` can be `true`, `false`, or `'indeterminate'`.
   */
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;

  /**
   * Optional description providing additional context for the checkbox item.
   */
  description?: string;
}
