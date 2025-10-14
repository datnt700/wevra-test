import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from '@tavia/core';
import { ColumnDef } from '@tanstack/react-table';

const meta: Meta<typeof DataTable<any>> = {
  title: 'Core/Organisms/DataTable',
  component: DataTable
};
export default meta;

type Story = StoryObj<typeof DataTable<any>>;

type SampleData = {
  id: number;
  name: string;
  age: number;
  occupation: string;
};

const sampleData: SampleData[] = [
  { id: 1, name: 'John Doe', age: 28, occupation: 'Engineer' },
  { id: 2, name: 'Jane Smith', age: 34, occupation: 'Designer' },
  { id: 3, name: 'Sam Wilson', age: 25, occupation: 'Developer' },
  { id: 4, name: 'Alice Brown', age: 30, occupation: 'Manager' },
  { id: 5, name: 'Alice Brown', age: 30, occupation: 'Manager' },
  { id: 6, name: 'Alice Brown', age: 30, occupation: 'Manager' },
  { id: 6, name: 'Alice Brown', age: 30, occupation: 'Manager' }
];

const sampleColumns: ColumnDef<SampleData, any>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (info) => info.getValue()
  },
  {
    accessorKey: 'age',
    header: 'Age',
    cell: (info) => `${info.getValue()} years old`
  },
  {
    accessorKey: 'occupation',
    header: 'Occupation',
    cell: (info) => info.getValue()
  }
];

export const Basic: Story = {
  render: (args) => <DataTable {...args} />,
  args: {
    data: sampleData,
    columns: sampleColumns,
    pageSize: 3,
    empty: <div>No data available</div>
  }
};

export const Empty: Story = {
  render: (args) => <DataTable {...args} />,
  args: {
    data: [],
    columns: sampleColumns,
    empty: <div>No data available</div>
  }
};

export const WithRowClick: Story = {
  render: (args) => (
    <DataTable {...args} onRowClick={(row) => alert(`Row clicked: ${JSON.stringify(row)}`)} />
  ),
  args: {
    data: sampleData,
    columns: sampleColumns,
    pageSize: 2,
    empty: <div>No data available</div>
  }
};

export const Pagination: Story = {
  render: (args) => <DataTable {...args} />,
  args: {
    data: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Person ${i + 1}`,
      age: 20 + (i % 30),
      occupation: `Occupation ${i + 1}`
    })),
    columns: sampleColumns,
    pageSize: 5,
    empty: <div>No data available</div>
  }
};
