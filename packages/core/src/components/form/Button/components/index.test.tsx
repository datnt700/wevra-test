import { render, screen } from '@testing-library/react';
import { Button } from '.';
import styles from './Button.module.scss';
import { Icon } from '../../misc/Icon';
import { Hash } from 'lucide-react';

describe('Button', () => {
  it('renders children', () => {
    const wrapper = render(<Button>Hello</Button>);

    expect(wrapper).toMatchSnapshot();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.classList.contains(styles.primary)).eq(true);
  });

  it('renders Button with variant', () => {
    const wrapper = render(<Button variant="secondary">Hello</Button>);

    expect(wrapper).toMatchSnapshot();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.classList.contains(styles.secondary)).eq(true);
  });

  it('renders Button with shape', () => {
    const wrapper = render(
      <Button variant="secondary" shape="square">
        Hello
      </Button>
    );

    expect(wrapper).toMatchSnapshot();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.classList.contains(styles.secondary)).eq(true);
    expect(button.classList.contains(styles.square)).eq(true);
  });

  it('renders Button with loading', () => {
    const wrapper = render(<Button isLoading />);

    expect(wrapper).toMatchSnapshot();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.classList.contains(styles.isLoading)).eq(true);
  });

  it('renders Button with icon', () => {
    const wrapper = render(<Button icon={<Icon source={<Hash />} />} />);

    expect(wrapper).toMatchSnapshot();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.classList.contains(styles.iconOnly)).eq(true);
  });
});
