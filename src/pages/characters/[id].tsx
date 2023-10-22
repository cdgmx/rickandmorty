import { useQuery } from '@apollo/client';
import { GetServerSideProps } from 'next';
import { Character, Query } from '@/types';
import { GET_CHARACTER, CHARACTERS_BY_IDS_QUERY } from '@/lib/queries';
import createApolloClient from '@/lib/apolloClient';
import { Container, Grid, Typography } from '@mui/material';
import CharacterDetailed from '@/components/CharacterDetailed/CharacterDetailed';
import Layout from './layout';
import MovingCharacterCard from '@/components/MovingCharacterCard';
import { recommendCharacters } from '@/utility';
import RecommendedCharacters, {
  RecommendedCharactersSkeleton,
} from '@/components/RecommendedCharacters';

const MAX_RECOMMENDED_CHARACTERS = 10;

export const getServerSideProps: GetServerSideProps = async context => {
  const client = createApolloClient();
  const id = context.params?.id;

  if (typeof id !== 'string') {
    return {
      notFound: true,
    };
  }

  const { data } = await client.query<Query>({
    query: GET_CHARACTER,
    variables: { id },
  });

  return {
    props: {
      character: data.character,
    },
  };
};

interface CharacterPageProps {
  character: Character;
}

const CharacterPage: React.FC<CharacterPageProps> = ({ character }) => {
  const combinedCharacterIds = [
    ...(character.location?.residents || []).map(resident => resident.id),
    ...(character.origin?.residents || []).map(resident => resident.id),
  ];

  const { loading, data } = useQuery<Query>(CHARACTERS_BY_IDS_QUERY, {
    variables: { ids: combinedCharacterIds },
  });

  const recommendedChars = recommendCharacters(
    data?.charactersByIds || [],
    character,
  ).slice(0, MAX_RECOMMENDED_CHARACTERS);

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ paddingTop: '50px' }}>
        <Grid container spacing={3}>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={12} md={8}>
              <CharacterDetailed character={character} />
            </Grid>
            <Grid item xs={12} md={4}>
              <MovingCharacterCard image={character.image} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {loading ? (
              <RecommendedCharactersSkeleton />
            ) : (
              <RecommendedCharacters characters={recommendedChars} />
            )}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default CharacterPage;
