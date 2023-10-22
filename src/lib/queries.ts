import { gql } from '@apollo/client';

export const GET_ALL_CHARACTERS = gql`
  query GetAllCharacters($page: Int!) {
    characters(page: $page) {
      results {
        id
        name
        image
      }
      info {
        next
      }
    }
  }
`;

export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
    }
  }
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
        id
        name
        image
        gender
        species
        status
      }
      info {
        next
      }
    }
  }
`;
