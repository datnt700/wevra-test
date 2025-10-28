'use client';

/**
 * Calendar Component
 * A flexible, accessible date picker built on react-day-picker
 *
 * Features:
 * - Single date, date range, and multiple date selection
 * - Fully keyboard accessible (arrow keys, Enter, Space, Escape)
 * - Customizable disabled dates and date ranges
 * - Support for multiple months display
 * - Internationalization with locale support
 * - Styled with Emotion using theme tokens
 *
 * @example
 * // Single date selection
 * <Calendar
 *   mode="single"
 *   selected={date}
 *   onSelect={setDate}
 * />
 *
 * @example
 * // Date range selection
 * <Calendar
 *   mode="range"
 *   selectedRange={dateRange}
 *   onSelectRange={setDateRange}
 *   numberOfMonths={2}
 * />
 *
 * @example
 * // Multiple dates selection
 * <Calendar
 *   mode="multiple"
 *   selectedMultiple={dates}
 *   onSelectMultiple={setDates}
 * />
 */
import { DayPicker } from 'react-day-picker';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarProps } from '../types';
import { Styled } from './Calendar.styles';

export const Calendar = ({
  mode = 'single',
  selected,
  selectedRange,
  selectedMultiple,
  onSelect,
  onSelectRange,
  onSelectMultiple,
  className,
  showOutsideDays = true,
  numberOfMonths = 1,
  ...other
}: CalendarProps) => {
  // Build props based on mode
  const dayPickerProps: any = {
    mode,
    showOutsideDays,
    numberOfMonths,
    ...other,
  };

  // Single mode
  if (mode === 'single') {
    dayPickerProps.selected = selected;
    dayPickerProps.onSelect = onSelect;
  }

  // Range mode
  if (mode === 'range') {
    dayPickerProps.selected = selectedRange;
    dayPickerProps.onSelect = onSelectRange;
  }

  // Multiple mode
  if (mode === 'multiple') {
    dayPickerProps.selected = selectedMultiple;
    dayPickerProps.onSelect = onSelectMultiple;
  }

  return (
    <Styled.Wrapper className={className}>
      <DayPicker
        {...dayPickerProps}
        components={{
          IconLeft: () => <ChevronLeft size={16} />,
          IconRight: () => <ChevronRight size={16} />,
        }}
      />
    </Styled.Wrapper>
  );
};

Calendar.displayName = 'Calendar';
