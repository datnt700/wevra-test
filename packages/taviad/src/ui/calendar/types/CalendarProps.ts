import { type DayPickerProps } from 'react-day-picker';

/**
 * Locale type for internationalization
 * Can be imported from date-fns/locale
 */
export type CalendarLocale = {
  code?: string;
  formatDistance?: (...args: any[]) => any;
  formatRelative?: (...args: any[]) => any;
  localize?: any;
  formatLong?: any;
  match?: any;
  options?: any;
};

/**
 * Calendar component props
 * Built on top of react-day-picker for accessibility and flexibility
 */
export interface CalendarProps extends Omit<DayPickerProps, 'mode' | 'className'> {
  /**
   * Selection mode for the calendar
   * - single: Select a single date
   * - range: Select a date range (from/to)
   * - multiple: Select multiple dates
   */
  mode?: 'single' | 'range' | 'multiple';

  /**
   * Custom className for styling
   */
  className?: string;

  /**
   * Selected date (single mode)
   */
  selected?: Date;

  /**
   * Date range (range mode)
   */
  selectedRange?: { from?: Date; to?: Date };

  /**
   * Multiple selected dates (multiple mode)
   */
  selectedMultiple?: Date[];

  /**
   * Callback when date is selected (single mode)
   */
  onSelect?: (date: Date | undefined) => void;

  /**
   * Callback when date range is selected (range mode)
   */
  onSelectRange?: (range: { from?: Date; to?: Date } | undefined) => void;

  /**
   * Callback when multiple dates are selected (multiple mode)
   */
  onSelectMultiple?: (dates: Date[] | undefined) => void;

  /**
   * Show outside days (dates from previous/next months)
   * @default true
   */
  showOutsideDays?: boolean;

  /**
   * Minimum selectable date
   */
  fromDate?: Date;

  /**
   * Maximum selectable date
   */
  toDate?: Date;

  /**
   * Disabled dates (function or array)
   */
  disabled?: Date | Date[] | ((date: Date) => boolean);

  /**
   * Number of months to display
   * @default 1
   */
  numberOfMonths?: number;

  /**
   * Fixed number of weeks to display
   * @default undefined (variable)
   */
  fixedWeeks?: boolean;

  /**
   * Default month to display
   */
  defaultMonth?: Date;

  /**
   * Show week numbers
   * @default false
   */
  showWeekNumber?: boolean;

  /**
   * Locale for date formatting
   * @default undefined (uses browser locale)
   * @example
   * import { de } from 'date-fns/locale'
   * <Calendar locale={de} />
   */
  locale?: CalendarLocale;

  /**
   * First day of week (0 = Sunday, 1 = Monday, etc.)
   * @default undefined (uses locale default)
   */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
