import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '@eventure/eventured';
import { useState } from 'react';

/**
 * Calendar component - Accessible date picker built on react-day-picker
 *
 * Features:
 * - Single date, date range, and multiple date selection modes
 * - Fully keyboard accessible (arrow keys, Enter, Space, Escape)
 * - Customizable disabled dates and date ranges
 * - Support for multiple months display
 * - Internationalization with locale support
 * - Built with Emotion using theme tokens
 *
 * Best Practices:
 * - Use single mode for birth dates, appointments
 * - Use range mode for booking periods, date filters
 * - Use multiple mode for selecting non-consecutive dates
 * - Disable past dates for future bookings
 * - Disable weekends for business scheduling
 * - Show multiple months for range selection (better UX)
 * - Provide clear labels and instructions
 *
 * Keyboard Navigation:
 * - Arrow keys: Navigate between dates
 * - Enter/Space: Select focused date
 * - Page Up/Down: Navigate months
 * - Home/End: First/last day of week
 * - Escape: Close calendar (when used in popover)
 */
const meta: Meta<typeof Calendar> = {
  title: 'Core/Form/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Calendar component for date selection. Supports single date, date range, and multiple dates selection with full keyboard accessibility.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'range', 'multiple'],
      description: 'Selection mode',
      defaultValue: 'single',
    },
    showOutsideDays: {
      control: 'boolean',
      description: 'Show dates from previous/next months',
      defaultValue: true,
    },
    numberOfMonths: {
      control: { type: 'number', min: 1, max: 3 },
      description: 'Number of months to display',
      defaultValue: 1,
    },
    fixedWeeks: {
      control: 'boolean',
      description: 'Display fixed 6 weeks per month',
      defaultValue: false,
    },
    showWeekNumber: {
      control: 'boolean',
      description: 'Show week numbers',
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

/**
 * Default single date selection calendar
 */
export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();

    return (
      <div>
        <Calendar mode="single" selected={date} onSelect={setDate} />
        {date && (
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
            Selected: {date.toLocaleDateString()}
          </p>
        )}
      </div>
    );
  },
};

/**
 * Single date selection with pre-selected date
 */
export const SingleWithPreselected: Story = {
  render: () => {
    const [date, setDate] = useState<Date>(new Date(2025, 0, 15));

    return (
      <div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => newDate && setDate(newDate)}
        />
        {date && (
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
            Selected: {date.toLocaleDateString()}
          </p>
        )}
      </div>
    );
  },
};

/**
 * Date range selection - perfect for booking systems
 */
export const RangeSelection: Story = {
  render: () => {
    const [range, setRange] = useState<{ from?: Date; to?: Date }>({
      from: new Date(2025, 0, 10),
      to: new Date(2025, 0, 20),
    });

    return (
      <div>
        <Calendar
          mode="range"
          selectedRange={range}
          onSelectRange={(newRange) => newRange && setRange(newRange)}
          numberOfMonths={2}
        />
        <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
          {range?.from && <p>From: {range.from.toLocaleDateString()}</p>}
          {range?.to && <p>To: {range.to.toLocaleDateString()}</p>}
          {range?.from && range?.to && (
            <p style={{ fontWeight: 600, marginTop: '0.5rem' }}>
              {Math.ceil((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)) + 1}{' '}
              days
            </p>
          )}
        </div>
      </div>
    );
  },
};

/**
 * Multiple dates selection - select non-consecutive dates
 */
export const MultipleSelection: Story = {
  render: () => {
    const [dates, setDates] = useState<Date[]>([
      new Date(2025, 0, 5),
      new Date(2025, 0, 12),
      new Date(2025, 0, 19),
    ]);

    return (
      <div>
        <Calendar
          mode="multiple"
          selectedMultiple={dates}
          onSelectMultiple={(newDates) => newDates && setDates(newDates)}
        />
        <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
          <p style={{ fontWeight: 600 }}>Selected dates ({dates?.length || 0}):</p>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
            {dates?.map((date, index) => (
              <li key={index}>{date.toLocaleDateString()}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
};

/**
 * Disable weekends (Saturday & Sunday)
 */
export const DisableWeekends: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;

    return (
      <div>
        <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>
          Business days only (no weekends)
        </h3>
        <Calendar mode="single" selected={date} onSelect={setDate} disabled={isWeekend} />
        {date && (
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
            Selected: {date.toLocaleDateString()}
          </p>
        )}
      </div>
    );
  },
};

/**
 * Disable past dates - for future bookings
 */
export const DisablePastDates: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
      <div>
        <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>
          Future dates only
        </h3>
        <Calendar mode="single" selected={date} onSelect={setDate} fromDate={today} />
        {date && (
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
            Selected: {date.toLocaleDateString()}
          </p>
        )}
      </div>
    );
  },
};

/**
 * Date range with constraints (min/max dates)
 */
export const DateConstraints: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    const fromDate = new Date(2025, 0, 1); // Jan 1, 2025
    const toDate = new Date(2025, 11, 31); // Dec 31, 2025

    return (
      <div>
        <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Year 2025 only</h3>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          fromDate={fromDate}
          toDate={toDate}
        />
        {date && (
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
            Selected: {date.toLocaleDateString()}
          </p>
        )}
      </div>
    );
  },
};

/**
 * Disable specific dates (holidays, blackout dates)
 */
export const DisableSpecificDates: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    const holidays = [
      new Date(2025, 0, 1), // New Year
      new Date(2025, 6, 4), // Independence Day
      new Date(2025, 11, 25), // Christmas
    ];

    return (
      <div>
        <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>
          Holidays disabled (Jan 1, Jul 4, Dec 25)
        </h3>
        <Calendar mode="single" selected={date} onSelect={setDate} disabled={holidays} />
        {date && (
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
            Selected: {date.toLocaleDateString()}
          </p>
        )}
      </div>
    );
  },
};

/**
 * Show week numbers - useful for business planning
 */
export const WithWeekNumbers: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();

    return (
      <div>
        <Calendar mode="single" selected={date} onSelect={setDate} showWeekNumber={true} />
        {date && (
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
            Selected: {date.toLocaleDateString()}
          </p>
        )}
      </div>
    );
  },
};

/**
 * Hide outside days for cleaner look
 */
export const HideOutsideDays: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();

    return (
      <div>
        <Calendar mode="single" selected={date} onSelect={setDate} showOutsideDays={false} />
        {date && (
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
            Selected: {date.toLocaleDateString()}
          </p>
        )}
      </div>
    );
  },
};

/**
 * Fixed weeks - always show 6 weeks
 */
export const FixedWeeks: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();

    return (
      <div>
        <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>
          Fixed height (6 weeks always)
        </h3>
        <Calendar mode="single" selected={date} onSelect={setDate} fixedWeeks={true} />
        {date && (
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
            Selected: {date.toLocaleDateString()}
          </p>
        )}
      </div>
    );
  },
};

/**
 * Custom default month
 */
export const CustomDefaultMonth: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    const defaultMonth = new Date(2025, 5, 1); // June 2025

    return (
      <div>
        <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>
          Opens to June 2025
        </h3>
        <Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={defaultMonth} />
        {date && (
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
            Selected: {date.toLocaleDateString()}
          </p>
        )}
      </div>
    );
  },
};

/**
 * Week starts on Monday (European style)
 */
export const WeekStartsMonday: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();

    return (
      <div>
        <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>
          Week starts on Monday
        </h3>
        <Calendar mode="single" selected={date} onSelect={setDate} weekStartsOn={1} />
        {date && (
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
            Selected: {date.toLocaleDateString()}
          </p>
        )}
      </div>
    );
  },
};

/**
 * Complete booking flow example
 */
export const BookingFlow: Story = {
  render: () => {
    const [range, setRange] = useState<{ from?: Date; to?: Date }>();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;
    const isPastDate = (date: Date) => date < today;
    const isDisabled = (date: Date) => isPastDate(date) || isWeekend(date);

    const calculateNights = () => {
      if (!range?.from || !range?.to) return 0;
      return Math.ceil((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24));
    };

    const pricePerNight = 150;
    const nights = calculateNights();
    const totalPrice = nights * pricePerNight;

    return (
      <div style={{ maxWidth: '800px' }}>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.125rem', fontWeight: 600 }}>
          Hotel Booking
        </h3>
        <p style={{ marginBottom: '1.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
          Select your check-in and check-out dates (weekdays only)
        </p>

        <Calendar
          mode="range"
          selectedRange={range}
          onSelectRange={setRange}
          disabled={isDisabled}
          numberOfMonths={2}
        />

        <div
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: '#f3f4f6',
            borderRadius: '0.5rem',
          }}
        >
          <h4 style={{ marginBottom: '0.75rem', fontSize: '1rem', fontWeight: 600 }}>
            Booking Summary
          </h4>
          {range?.from && (
            <p style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
              <strong>Check-in:</strong> {range.from.toLocaleDateString()}
            </p>
          )}
          {range?.to && (
            <p style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
              <strong>Check-out:</strong> {range.to.toLocaleDateString()}
            </p>
          )}
          {nights > 0 && (
            <>
              <p style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                <strong>Nights:</strong> {nights}
              </p>
              <p style={{ fontSize: '1rem', fontWeight: 700, marginTop: '0.75rem' }}>
                Total: ${totalPrice.toLocaleString()}
              </p>
            </>
          )}
          {!range?.from && (
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Select dates to see price</p>
          )}
        </div>
      </div>
    );
  },
};
