import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Home from './index';
import { MockedProvider } from '@apollo/client/testing';
import { GET_ALL_CHARACTERS } from '@/lib/queries';

const mocks = [
  {
    request: {
      query: GET_ALL_CHARACTERS,
      variables: { page: 1 },
    },
    result: {
      data: {
        characters: {
          info: {
            next: 2,
          },
          results: [
            {
              id: '1',
              name: 'Rick Sanchez',
              image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
              // Add other fields as needed
            },
          ],
        },
      },
    },
  },
];

describe('Home', () => {
  it('renders loading state initially', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>,
    );

    expect(getByTestId('loading-component')).toBeTruthy();
  });

  it('renders character list on successful fetch', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>,
    );

    await waitFor(() => getByText('Rick and Morty Characters'));
  });
});
