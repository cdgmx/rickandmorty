import './globals.css';
import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';

import createApolloClient from '@/lib/apolloClient';
import { ApolloProvider } from '@apollo/client';

function App({ Component, pageProps }: AppProps): JSX.Element {
  const apolloClient = createApolloClient();
  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>Rick and Morty</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App;
