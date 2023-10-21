import { render } from '@testing-library/react';
import Home from './page';

describe('<Home />', () => {
  it('renders the main element', () => {
    const { getByRole } = render(<Home />);
    const mainElement = getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });

  it('applies the correct styles to the main element', () => {
    const { getByRole } = render(<Home />);
    const mainElement = getByRole('main');
    expect(mainElement).toHaveClass('main');
  });
});
