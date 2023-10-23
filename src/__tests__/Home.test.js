import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Home from '@/pages/index';
import { MockedProvider } from '@apollo/client/testing';
import { CHARACTERS_QUERY } from '@/lib/queries';
import { ThemeProvider, createTheme } from '@mui/material/styles';

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '',
    query: '',
    asPath: '',
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }),
}));

const mocks = [
  {
    request: {
      query: CHARACTERS_QUERY,
      variables: {
        page: 1,
      },
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
              status: 'Alive',
              species: 'Human',
              gender: 'Male',
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
    const theme = createTheme();

    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>
      </ThemeProvider>,
    );

    expect(getByTestId('loading-component')).toBeTruthy();
  });

  test('it should display the Rick and Morty image', async () => {
    const theme = createTheme();
    const { findByAltText } = render(
      <ThemeProvider theme={theme}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>
      </ThemeProvider>,
    );

    const image = await findByAltText('RickandMorty');

    expect(image).toBeInTheDocument();
  });
});
