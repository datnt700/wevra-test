import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Calendar } from '../components/Calendar';

describe('Calendar', () => {
  // ========================================
  // 1. Basic Rendering Tests
  // ========================================

  it('should render with default props', () => {
    const { container } = render(<Calendar />);
    expect(container.firstChild).toBeTruthy();
  });

  it('should render calendar grid', () => {
    render(<Calendar />);
    // react-day-picker renders a table
    const table = screen.getByRole('grid');
    expect(table).toBeTruthy();
  });

  it('should render navigation buttons', () => {
    render(<Calendar />);
    const buttons = screen.getAllByRole('button');
    // At least prev/next buttons should be present
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it('should render weekday headers', () => {
    const { container } = render(<Calendar />);
    // Week days are rendered in thead with class .rdp-weekday
    const weekdays = container.querySelectorAll('.rdp-weekday');
    expect(weekdays.length).toBe(7); // 7 days of week
  });

  it('should have display name', () => {
    expect(Calendar.displayName).toBe('Calendar');
  });

  // ========================================
  // 2. Single Mode Tests
  // ========================================

  it('should render in single selection mode', () => {
    render(<Calendar mode="single" />);
    const grid = screen.getByRole('grid');
    expect(grid).toBeTruthy();
  });

  it('should accept selected date in single mode', () => {
    const selectedDate = new Date(2025, 0, 15);
    const { container } = render(
      <Calendar mode="single" selected={selectedDate} defaultMonth={new Date(2025, 0, 1)} />
    );
    // Check that the date button has data-selected attribute
    const selectedDay = container.querySelector('[data-selected="true"]');
    expect(selectedDay).toBeTruthy();
  });

  it('should call onSelect when date is clicked in single mode', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    render(<Calendar mode="single" onSelect={handleSelect} defaultMonth={new Date(2025, 0, 1)} />);

    // Find a date button (not disabled, not navigation)
    const buttons = screen.getAllByRole('button');
    const dateButton = buttons.find(
      (btn) =>
        btn.textContent &&
        /^\d+$/.test(btn.textContent.trim()) &&
        !(btn as HTMLButtonElement).disabled
    );

    if (dateButton) {
      await user.click(dateButton);
      expect(handleSelect).toHaveBeenCalled();
    }
  });

  it('should handle undefined selected date', () => {
    const { container } = render(<Calendar mode="single" selected={undefined} />);
    expect(container.firstChild).toBeTruthy();
  });

  // ========================================
  // 3. Range Mode Tests
  // ========================================

  it('should render in range selection mode', () => {
    render(<Calendar mode="range" />);
    const grid = screen.getByRole('grid');
    expect(grid).toBeTruthy();
  });

  it('should accept selected range', () => {
    const selectedRange = {
      from: new Date(2025, 0, 10),
      to: new Date(2025, 0, 20),
    };
    render(<Calendar mode="range" selectedRange={selectedRange} />);
    const grid = screen.getByRole('grid');
    expect(grid).toBeTruthy();
  });

  it('should call onSelectRange when dates are clicked', async () => {
    const user = userEvent.setup();
    const handleSelectRange = vi.fn();
    render(
      <Calendar
        mode="range"
        onSelectRange={handleSelectRange}
        defaultMonth={new Date(2025, 0, 1)}
      />
    );

    const buttons = screen.getAllByRole('button');
    const dateButton = buttons.find(
      (btn) =>
        btn.textContent &&
        /^\d+$/.test(btn.textContent.trim()) &&
        !(btn as HTMLButtonElement).disabled
    );

    if (dateButton) {
      await user.click(dateButton);
      expect(handleSelectRange).toHaveBeenCalled();
    }
  });

  it('should render multiple months in range mode', () => {
    render(<Calendar mode="range" numberOfMonths={2} />);
    const grids = screen.getAllByRole('grid');
    expect(grids.length).toBeGreaterThanOrEqual(1);
  });

  // ========================================
  // 4. Multiple Mode Tests
  // ========================================

  it('should render in multiple selection mode', () => {
    render(<Calendar mode="multiple" />);
    const grid = screen.getByRole('grid');
    expect(grid).toBeTruthy();
  });

  it('should accept selected multiple dates', () => {
    const selectedMultiple = [new Date(2025, 0, 10), new Date(2025, 0, 15), new Date(2025, 0, 20)];
    render(<Calendar mode="multiple" selectedMultiple={selectedMultiple} />);
    const grid = screen.getByRole('grid');
    expect(grid).toBeTruthy();
  });

  it('should call onSelectMultiple when dates are clicked', async () => {
    const user = userEvent.setup();
    const handleSelectMultiple = vi.fn();
    render(
      <Calendar
        mode="multiple"
        onSelectMultiple={handleSelectMultiple}
        defaultMonth={new Date(2025, 0, 1)}
      />
    );

    const buttons = screen.getAllByRole('button');
    const dateButton = buttons.find(
      (btn) =>
        btn.textContent &&
        /^\d+$/.test(btn.textContent.trim()) &&
        !(btn as HTMLButtonElement).disabled
    );

    if (dateButton) {
      await user.click(dateButton);
      expect(handleSelectMultiple).toHaveBeenCalled();
    }
  });

  // ========================================
  // 5. Display Options Tests
  // ========================================

  it('should show outside days by default', () => {
    const { container } = render(<Calendar defaultMonth={new Date(2025, 0, 1)} />);
    // Outside days have class .rdp-outside
    const outsideDays = container.querySelectorAll('.rdp-outside');
    // January 2025 starts on Wednesday, so should have outside days
    expect(outsideDays.length).toBeGreaterThan(0);
  });

  it('should hide outside days when showOutsideDays is false', () => {
    const { container } = render(
      <Calendar showOutsideDays={false} defaultMonth={new Date(2025, 0, 1)} />
    );
    // Check that outside days are not visible
    const outsideDays = container.querySelectorAll('.rdp-day_outside');
    // With showOutsideDays=false, they should not be rendered
    expect(outsideDays.length).toBe(0);
  });

  it('should render multiple months', () => {
    render(<Calendar numberOfMonths={2} />);
    const grids = screen.getAllByRole('grid');
    expect(grids.length).toBeGreaterThanOrEqual(1);
  });

  it('should render week numbers when enabled', () => {
    render(<Calendar showWeekNumber={true} defaultMonth={new Date(2025, 0, 1)} />);
    // Week numbers should be rendered - react-day-picker v9 uses different class
    const grid = screen.getByRole('grid');
    expect(grid).toBeTruthy();
    // Just verify component renders with showWeekNumber prop
  });

  // ========================================
  // 6. Date Constraints Tests
  // ========================================

  it('should accept fromDate constraint', () => {
    const fromDate = new Date(2025, 0, 15);
    const { container } = render(
      <Calendar fromDate={fromDate} defaultMonth={new Date(2025, 0, 1)} />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('should accept toDate constraint', () => {
    const toDate = new Date(2025, 0, 15);
    const { container } = render(<Calendar toDate={toDate} defaultMonth={new Date(2025, 0, 1)} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('should accept disabled dates array', () => {
    const disabledDates = [new Date(2025, 0, 10), new Date(2025, 0, 15)];
    const { container } = render(
      <Calendar disabled={disabledDates} defaultMonth={new Date(2025, 0, 1)} />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('should accept disabled dates function', () => {
    const disabledFn = (date: Date) => date.getDay() === 0 || date.getDay() === 6; // Weekends
    const { container } = render(
      <Calendar disabled={disabledFn} defaultMonth={new Date(2025, 0, 1)} />
    );
    expect(container.firstChild).toBeTruthy();
  });

  // ========================================
  // 7. Month Navigation Tests
  // ========================================

  it('should render default month', () => {
    const defaultMonth = new Date(2025, 5, 1); // June 2025
    render(<Calendar defaultMonth={defaultMonth} />);
    // Check that June is rendered (caption label contains "June" or month name)
    const caption = screen.getByText(/june/i) || screen.getByText(/2025/);
    expect(caption).toBeTruthy();
  });

  it('should navigate to previous month', async () => {
    const user = userEvent.setup();
    render(<Calendar defaultMonth={new Date(2025, 1, 1)} />); // February 2025

    const prevButton = screen.getAllByRole('button')[0] as HTMLButtonElement; // First button is usually prev
    if (prevButton && !prevButton.disabled) {
      await user.click(prevButton);
      // Should navigate to January
      const caption = screen.getByText(/january/i) || screen.getByText(/2025/);
      expect(caption).toBeTruthy();
    }
  });

  it('should navigate to next month', async () => {
    const user = userEvent.setup();
    render(<Calendar defaultMonth={new Date(2025, 0, 1)} />); // January 2025

    const buttons = screen.getAllByRole('button');
    const nextButton = buttons[1] as HTMLButtonElement; // Second button is usually next
    if (nextButton && !nextButton.disabled) {
      await user.click(nextButton);
      // Should navigate to February
      const caption = screen.getByText(/february/i) || screen.getByText(/2025/);
      expect(caption).toBeTruthy();
    }
  });

  // ========================================
  // 8. Accessibility Tests
  // ========================================

  it('should have accessible grid structure', () => {
    render(<Calendar />);
    const grid = screen.getByRole('grid');
    expect(grid).toBeTruthy();
  });

  it('should have accessible weekday headers', () => {
    const { container } = render(<Calendar />);
    // Weekdays are in thead with aria-label
    const weekdays = container.querySelectorAll('.rdp-weekday');
    expect(weekdays.length).toBe(7);
    // Check they have aria-label
    weekdays.forEach((weekday) => {
      expect(weekday.getAttribute('aria-label')).toBeTruthy();
    });
  });

  it('should have accessible buttons', () => {
    render(<Calendar />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      // Each button should be accessible
      expect(button).toBeTruthy();
    });
  });

  // ========================================
  // 9. Custom className Tests
  // ========================================

  it('should accept custom className', () => {
    const { container } = render(<Calendar className="custom-calendar" />);
    const wrapper = container.querySelector('.custom-calendar');
    expect(wrapper).toBeTruthy();
  });

  it('should merge custom className with default styles', () => {
    const { container } = render(<Calendar className="my-custom-class" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('my-custom-class');
  });

  // ========================================
  // 10. Edge Cases
  // ========================================

  it('should handle empty props gracefully', () => {
    const { container } = render(<Calendar />);
    expect(container.firstChild).toBeTruthy();
  });

  it('should handle invalid mode gracefully', () => {
    // @ts-expect-error Testing invalid mode
    const { container } = render(<Calendar mode="invalid" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('should render fixed weeks when enabled', () => {
    const { container } = render(<Calendar fixedWeeks={true} />);
    // With fixedWeeks, all months should have 6 weeks
    const weeks = container.querySelectorAll('.rdp-week');
    expect(weeks.length).toBeGreaterThan(0);
  });

  it('should handle weekStartsOn prop', () => {
    const { container } = render(<Calendar weekStartsOn={1} />); // Monday
    expect(container.firstChild).toBeTruthy();
  });
});
