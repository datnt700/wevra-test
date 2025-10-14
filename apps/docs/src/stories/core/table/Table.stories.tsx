import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Table } from '@tavia/core';

const meta: Meta<typeof Table<any, keyof any>> = {
  title: 'Core/Table/Table',
  component: Table,
};
export default meta;

type Story = StoryObj<typeof Table<any, keyof any>>;

const sampleData = [
  { id: 1, name: 'John Doe', age: 28, occupation: 'Engineer' },
  { id: 2, name: 'Jane Smith', age: 34, occupation: 'Designer' },
  { id: 3, name: 'Sam Wilson', age: 25, occupation: 'Developer' },
];

const sampleColumns = [
  {
    key: 'name',
    header: 'Name',
    sortable: true,
  },
  {
    key: 'age',
    header: 'Age',
    sortable: true,
    render: (data: any) => <span>{data.age} years old</span>,
  },
  {
    key: 'occupation',
    header: 'Occupation',
  },
];

export const Basic: Story = {
  render: (args) => (
    <Table
      {...args}
      columns={sampleColumns}
      data={sampleData}
      empty={<div>No data available</div>}
    />
  ),
  args: {
    selectable: true,
    searchable: true,
    pagination: true,
  },
};

export const Loading: Story = {
  render: (args) => (
    <Table
      {...args}
      columns={sampleColumns}
      data={[]}
      isLoading={true}
      loading={<div>Loading...</div>}
    />
  ),
  args: {
    selectable: false,
    searchable: false,
    pagination: false,
  },
};

export const Error: Story = {
  render: (args) => (
    <Table
      {...args}
      columns={sampleColumns}
      data={[]}
      isError={true}
      error={<div>Error loading data</div>}
    />
  ),
  args: {
    selectable: false,
    searchable: false,
    pagination: false,
  },
};

export const Empty: Story = {
  render: (args) => (
    <Table {...args} columns={sampleColumns} data={[]} empty={<div>No data available</div>} />
  ),
  args: {
    selectable: false,
    searchable: false,
    pagination: false,
  },
};
