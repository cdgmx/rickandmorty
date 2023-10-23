import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import createApolloClient from '@/lib/apolloClient';
import { ApolloProvider } from '@apollo/client';
import { theme } from '@/styles';

function App({ Component, pageProps }: AppProps): JSX.Element {
  const apolloClient = createApolloClient();
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Head>
          <title>Rick and Morty</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
