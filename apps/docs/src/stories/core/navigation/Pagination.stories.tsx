import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '@tavia/core';
import { useState } from 'react';

/**
 * Pagination component for navigating through pages of content.
 *
 * Features:
 * - Smart ellipsis for large page ranges (shows max 5 pages)
 * - Previous/Next navigation with icons
 * - Keyboard navigation support
 * - Active page highlighting
 * - Disabled states for first/last pages
 * - ARIA labels for accessibility
 */
const meta: Meta<typeof Pagination> = {
  title: 'Core/Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: 'number',
      description: 'Current active page number (1-indexed)',
    },
    numPages: {
      control: 'number',
      description: 'Total number of pages',
    },
    onPageChange: {
      action: 'page changed',
      description: 'Callback when page changes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

/**
 * Basic pagination with 10 pages.
 * Click any page number to navigate.
 */
export const Basic: Story = {
  args: {
    currentPage: 1,
    numPages: 10,
  },
};

/**
 * Few pages (1-5) - no ellipsis shown.
 * All pages are visible at once.
 */
export const FewPages: Story = {
  args: {
    currentPage: 2,
    numPages: 5,
  },
};

/**
 * First page - Previous button is disabled.
 */
export const FirstPage: Story = {
  args: {
    currentPage: 1,
    numPages: 20,
  },
};

/**
 * Last page - Next button is disabled.
 */
export const LastPage: Story = {
  args: {
    currentPage: 20,
    numPages: 20,
  },
};

/**
 * Middle page with ellipsis on both sides.
 * Shows smart truncation for large page ranges.
 */
export const MiddlePage: Story = {
  args: {
    currentPage: 50,
    numPages: 100,
  },
};

/**
 * Near start (page 3) - ellipsis on right only.
 */
export const NearStart: Story = {
  args: {
    currentPage: 3,
    numPages: 50,
  },
};

/**
 * Near end (page 48) - ellipsis on left only.
 */
export const NearEnd: Story = {
  args: {
    currentPage: 48,
    numPages: 50,
  },
};

/**
 * Many pages (100) - demonstrates ellipsis behavior.
 */
export const ManyPages: Story = {
  args: {
    currentPage: 15,
    numPages: 100,
  },
};

/**
 * Single page - minimal pagination display.
 * Both navigation buttons are disabled.
 */
export const SinglePage: Story = {
  args: {
    currentPage: 1,
    numPages: 1,
  },
};

/**
 * Controlled pagination with state management.
 * Demonstrates full navigation functionality.
 */
export const Controlled: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
      <div>
        <Pagination
          {...args}
          currentPage={currentPage}
          numPages={20}
          onPageChange={setCurrentPage}
        />
        <p style={{ marginTop: '1rem', textAlign: 'center', color: '#666' }}>
          Current page: {currentPage} of 20
        </p>
      </div>
    );
  },
};

/**
 * Data table pagination example.
 * Shows pagination with items per page info.
 */
export const DataTablePagination: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = 247;
    const numPages = Math.ceil(totalItems / itemsPerPage);

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
      <div style={{ width: '600px' }}>
        <div
          style={{
            marginBottom: '1rem',
            padding: '1rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
          }}
        >
          <h4 style={{ margin: '0 0 0.5rem 0' }}>User List</h4>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
            Showing {startItem}-{endItem} of {totalItems} users
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
            Page {currentPage} of {numPages}
          </p>
          <Pagination
            {...args}
            currentPage={currentPage}
            numPages={numPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    );
  },
};

/**
 * Blog pagination example.
 * Shows pagination with post navigation.
 */
export const BlogPagination: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;
    const totalPosts = 142;
    const numPages = Math.ceil(totalPosts / postsPerPage);

    return (
      <div style={{ width: '800px' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ margin: '0 0 1rem 0' }}>Blog Posts</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  padding: '1rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                }}
              >
                <h3 style={{ margin: '0 0 0.5rem 0' }}>
                  Blog Post {(currentPage - 1) * postsPerPage + i}
                </h3>
                <p style={{ margin: 0, color: '#666', fontSize: '0.875rem' }}>
                  Sample blog post content...
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '1rem',
            borderTop: '1px solid #e5e7eb',
          }}
        >
          <Pagination
            {...args}
            currentPage={currentPage}
            numPages={numPages}
            onPageChange={setCurrentPage}
          />
        </div>

        <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.875rem', color: '#666' }}>
          Showing posts {(currentPage - 1) * postsPerPage + 1}-
          {Math.min(currentPage * postsPerPage, totalPosts)} of {totalPosts}
        </p>
      </div>
    );
  },
};

/**
 * Search results pagination.
 * Shows pagination with search result count.
 */
export const SearchResultsPagination: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 20;
    const totalResults = 438;
    const numPages = Math.ceil(totalResults / resultsPerPage);

    return (
      <div style={{ width: '700px' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Search Results</h3>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
            About {totalResults} results (0.42 seconds)
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              style={{
                marginBottom: '1.5rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid #e5e7eb',
              }}
            >
              <h4 style={{ margin: '0 0 0.25rem 0', color: '#3b82f6' }}>
                Result {(currentPage - 1) * resultsPerPage + i}
              </h4>
              <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', color: '#10b981' }}>
                https://example.com/page/{(currentPage - 1) * resultsPerPage + i}
              </p>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
                Sample search result description...
              </p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            {...args}
            currentPage={currentPage}
            numPages={numPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    );
  },
};

/**
 * Edge case: Very large number of pages (1000+).
 * Demonstrates ellipsis with massive page counts.
 */
export const VeryManyPages: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(500);
    const numPages = 1000;

    return (
      <div>
        <Pagination
          {...args}
          currentPage={currentPage}
          numPages={numPages}
          onPageChange={setCurrentPage}
        />
        <p style={{ marginTop: '1rem', textAlign: 'center', color: '#666' }}>
          Page {currentPage} of {numPages.toLocaleString()}
        </p>
      </div>
    );
  },
};

/**
 * Showcase of all pagination states.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Few Pages (5)</h3>
        <Pagination currentPage={2} numPages={5} />
      </div>

      <div style={{ textAlign: 'center' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>First Page</h3>
        <Pagination currentPage={1} numPages={20} />
      </div>

      <div style={{ textAlign: 'center' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Middle Page</h3>
        <Pagination currentPage={10} numPages={20} />
      </div>

      <div style={{ textAlign: 'center' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Last Page</h3>
        <Pagination currentPage={20} numPages={20} />
      </div>

      <div style={{ textAlign: 'center' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Many Pages (100)</h3>
        <Pagination currentPage={50} numPages={100} />
      </div>

      <div style={{ textAlign: 'center' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Single Page</h3>
        <Pagination currentPage={1} numPages={1} />
      </div>
    </div>
  ),
};
