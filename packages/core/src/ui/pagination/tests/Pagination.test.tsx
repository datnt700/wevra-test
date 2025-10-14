import { render } from '@testing-library/react';
import { Pagination } from '../';

describe('Pagination', () => {
  it('renders Pagination with 20 and 3', () => {
    const { container } = render(<Pagination numPages={20} currentPage={3} />);
    const buttonElements = container.querySelectorAll('button');
    expect(buttonElements.length).eq(9);
  });

  it('renders Pagination with 20 and 4', () => {
    const { container } = render(<Pagination numPages={20} currentPage={3} />);
    const buttonElements = container.querySelectorAll('button');
    expect(buttonElements.length).eq(9);
  });

  it('renders Pagination with 20 and currentPage > 5 and <= 16', () => {
    const { container } = render(<Pagination numPages={20} currentPage={5} />);
    const buttonElements = container.querySelectorAll('button');
    expect(buttonElements.length).eq(11);
  });

  it('renders Pagination with 20 and currentPage = 17', () => {
    const { container } = render(<Pagination numPages={20} currentPage={17} />);
    const buttonElements = container.querySelectorAll('button');
    expect(buttonElements.length).eq(9);
  });

  it('renders Pagination with 20 and currentPage 18', () => {
    const { container } = render(<Pagination numPages={20} currentPage={18} />);
    const buttonElements = container.querySelectorAll('button');
    expect(buttonElements.length).eq(9);
  });

  it('renders Pagination with 20 and currentPage 19', () => {
    const { container } = render(<Pagination numPages={20} currentPage={19} />);
    const buttonElements = container.querySelectorAll('button');
    expect(buttonElements.length).eq(9);
  });

  it('renders Pagination with 20 and currentPage 20', () => {
    const { container } = render(<Pagination numPages={20} currentPage={20} />);
    const buttonElements = container.querySelectorAll('button');
    expect(buttonElements.length).eq(9);
  });

  it('renders Pagination with 20 and currentPage > 21', () => {
    const { container } = render(<Pagination numPages={20} currentPage={21} />);
    const buttonElements = container.querySelectorAll('button');
    expect(buttonElements.length).eq(2);
  });

  it('renders Pagination with 20 and currentPage < 1', () => {
    const { container } = render(<Pagination numPages={20} currentPage={-1} />);
    const buttonElements = container.querySelectorAll('button');
    expect(buttonElements.length).eq(2);
  });
});
