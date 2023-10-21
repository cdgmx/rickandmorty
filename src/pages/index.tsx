import React, { useEffect, useCallback, useState } from 'react';
import styles from './page.module.css';
import { Container, Typography } from '@mui/material';
import { useQuery, useApolloClient } from '@apollo/client';
import { CHARACTERS_QUERY } from '@/lib/queries';
import { Query } from '@/types';
import CharacterList from '@/components/CharacterList/CharacterList';
import { Inter } from 'next/font/google';
import LoadingComponent from '@/components/LoadingComponent';
import FilterComponent, { FilterConfig } from '@/components/FilterComponent';
import { useFilterStore } from '@/store';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
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
export const useInfiniteScroll = (
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
 * Validates filter parameters based on a provided configuration array.
 *
 * @param {ParsedUrlQuery} query - An object containing filter keys and values from the URL.
 * @param {FilterConfig[]} filterConfigs - An array of filter configuration objects.
 *
 * @returns {Record<string, string>} A new object containing only the valid filters.
 */
const validateFilters = (
  query: ParsedUrlQuery,
  filterConfigs: FilterConfig[],
): Record<string, string> => {
  const validFilters: Record<string, string> = {};

  for (const [key, value] of Object.entries(query)) {
    const config = filterConfigs.find(cfg => cfg.key === key);
    if (config) {
      const stringValue = Array.isArray(value) ? value[0] : value;
      if (stringValue) {
        const option = config.options.find(opt => opt.value === stringValue);
        if (option) {
          validFilters[key] = stringValue;
        }
      }
    }
  }

  return validFilters;
};

/**
 * @component Home
 * @description Home component to display a list of Rick and Morty characters.
 * Utilizes Apollo Client's `useQuery` for data fetching and pagination.
 */
const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const { filterConfigs } = useFilterStore();
  const [filters, setFilters] = useState<Record<string, string>>({});
  const client = useApolloClient();
  const router = useRouter();
  const { loading, error, data, fetchMore, refetch } = useQuery<Query>(
    CHARACTERS_QUERY,
    {
      variables: {
        page: currentPage,
        ...filters,
      },
      notifyOnNetworkStatusChange: true,
    },
  );

  const characters = data?.characters?.results ?? [];
  const handleFilter = async (newFilters: any) => {
    await client.clearStore();
    setFilters(newFilters);
    router.push({
      pathname: router.pathname,
      query: newFilters,
    });
    // This will trigger a new GraphQL request with updated variables
    refetch({ ...newFilters }); // Use refetch from useQuery
  };

  useInfiniteScroll(data, fetchMore);

  useEffect(() => {
    const initialFilters = validateFilters(router.query, filterConfigs);
    setFilters(initialFilters);

    const handleRouteChange = () => {
      // Update filters from the URL
      const newFilters = validateFilters(router.query, filterConfigs);
      setFilters(newFilters);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.query]);

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
      <FilterComponent
        filterConfigs={filterConfigs}
        onFilter={handleFilter}
        filters={filters}
      />
      <CharacterList characters={characters} />
    </Container>
  );
};

export default Home;
