import React, { useEffect, useCallback } from 'react';
import styles from './page.module.css';
import { Container, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_ALL_CHARACTERS } from '@/lib/queries';
import { Query } from '@/types';
import CharacterList from '@/components/CharacterList/CharacterList';
import { Inter } from 'next/font/google';
import LoadingComponent from '@/components/LoadingComponent';
const inter = Inter({ subsets: ['latin'] });

// Global Constants
const INITIAL_PAGE = 1;
const SCROLL_OFFSET = 300;

/**
 * @function handleScroll
 * @description Handle scroll event for infinite scrolling.
 * Triggers fetchMore when the user is two rows before the end.
 * @param {Query | undefined} data - The data object from the GraphQL query.
 * @param {(options?: any) => void} fetchMore - The fetchMore function from Apollo Client.
 */
const useInfiniteScroll = (
  data: Query | undefined,
  fetchMore: (options?: any) => void,
) => {
  const handleScroll = useCallback(() => {
    const windowHeight = window.innerHeight;
    const scrollTop = document.documentElement.scrollTop;
    const docHeight = document.documentElement.offsetHeight;

    if (windowHeight + scrollTop + SCROLL_OFFSET >= docHeight) {
      const nextPage = data?.characters?.info?.next;
      if (nextPage) {
        fetchMore({
          variables: { page: nextPage },
        });
      }
    }
  }, [data, fetchMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
};

/**
 * @component Home
 * @description Home component to display a list of Rick and Morty characters.
 * Utilizes Apollo Client's `useQuery` for data fetching and pagination.
 */
const Home: React.FC = () => {
  const { loading, error, data, fetchMore } = useQuery<Query>(
    GET_ALL_CHARACTERS,
    {
      variables: { page: INITIAL_PAGE },
      notifyOnNetworkStatusChange: true,
    },
  );
  const characters = data?.characters?.results ?? [];

  useInfiniteScroll(data, fetchMore);

  if (error) {
    return <p>Error loading data. Please try again later.</p>;
  }

  if (loading) {
    if (characters.length === 0) {
      return <LoadingComponent />;
    }
  }

  return (
    <Container component="main" className={`${styles.main} ${inter.className}`}>
      <Typography variant="h2" align="center" gutterBottom>
        Rick and Morty Characters
      </Typography>
      <CharacterList characters={characters} />
    </Container>
  );
};

export default Home;