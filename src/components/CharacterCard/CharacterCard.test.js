import React from 'react';
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from '@testing-library/react';
import CharacterCard from './CharacterCard';

describe('CharacterCard', () => {
  const mockProps = {
    image: 'test-image.jpg',
    title: 'Test Title',
    secondaryText: 'Test Secondary',
    description: 'Test Description',
  };

  it('should render card elements', () => {
    render(<CharacterCard {...mockProps} />);

    expect(screen.getByTestId('card-container')).toBeInTheDocument();
    expect(screen.getByTestId('card-action-area')).toBeInTheDocument();
    expect(screen.getByTestId('card-media')).toBeInTheDocument();
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
    expect(screen.getByTestId('card-title')).toBeInTheDocument();
    expect(screen.getByTestId('card-secondary-text')).toBeInTheDocument();
    expect(screen.getByTestId('card-description')).toBeInTheDocument();
  });

  it('should open dialog on image click', () => {
    render(<CharacterCard {...mockProps} />);

    fireEvent.click(screen.getByTestId('card-media'));

    expect(screen.getByTestId('card-dialog')).toBeInTheDocument();
  });

  it('should close dialog on close button click', async () => {
    render(<CharacterCard {...mockProps} />);

    fireEvent.click(screen.getByTestId('card-media'));
    await act(async () => {
      fireEvent.click(screen.getByTestId('dialog-close-button'));
    });

    await waitFor(() => {
      expect(screen.queryByTestId('card-dialog')).not.toBeInTheDocument();
    });
  });
});
