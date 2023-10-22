import { gql } from '@apollo/client';

const CHARACTER_BASICS = gql`
  fragment CharacterBasics on Character {
    id
    name
    image
  }
`;

const CHARACTER_LOCATION = gql`
  fragment CharacterLocation on Character {
    origin {
      name
      residents {
        id
      }
    }
    location {
      name
      residents {
        id
      }
    }
  }
`;

const CHARACTER_DETAILS = gql`
  fragment CharacterDetails on Character {
    ...CharacterBasics
    status
    species
    type
    gender
    ...CharacterLocation
    episode {
      id
      name
      air_date
      episode
      characters {
        id
      }
    }
  }
  ${CHARACTER_BASICS}
  ${CHARACTER_LOCATION}
`;

export const GET_ALL_CHARACTERS = gql`
  query GetAllCharacters($page: Int!) {
    characters(page: $page) {
      results {
        ...CharacterBasics
      }
      info {
        next
      }
    }
  }
  ${CHARACTER_BASICS}
`;

export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      ...CharacterDetails
    }
  }
  ${CHARACTER_DETAILS}
`;

export const CHARACTERS_QUERY = gql`
  query GetCharacters(
    $page: Int!
    $name: String
    $status: String
    $species: String
    $type: String
    $gender: String
  ) {
    characters(
      page: $page
      filter: {
        name: $name
        status: $status
        species: $species
        type: $type
        gender: $gender
      }
    ) {
      results {
        ...CharacterBasics
        gender
        species
        status
      }
      info {
        next
      }
    }
  }
  ${CHARACTER_BASICS}
`;

export const CHARACTERS_BY_IDS_QUERY = gql`
  query GetCharactersByIds($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      ...CharacterBasics
      species
      origin {
        id
      }
    }
  }
  ${CHARACTER_BASICS}
`;
