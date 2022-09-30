import { gql } from "apollo-server-micro";
export const GET_MOVIES = gql`
  query GetMovies {
    movies {
      id
      name
      image
      release
      director
      synopsis
    }
  }
`;
export const GET_MOVIE_ID = gql`
  query GetMovie($id: ID!) {
    movie(id: $id) {
      id
      name
      image
      release
      director
      synopsis
    }
  }
`;
// casts {
//   cast1
//   cast2
// }
// genre {
//   g1
//   g2
// }
// id: String
// name: String!
// image: String!
// release: String!
// director: String!
// genre: [Genre]
// casts: [Cast]
// synopsis: String!
export const GET_ALL_USERS = gql`
  query GetUsers {
    users {
      id
      name
      username
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      username
    }
  }
`;
export const ADD_MUTATION = gql`
  mutation AddMovie($input: AddMovieInput!) {
    addMovie(input: $input) {
      id
      name
      image
      release
      director
      synopsis
    }
  }
`;
export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
      age
      username
      nationality
    }
  }
`;
export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
export const DELETE_MOVIE_MUTATION = gql`
  mutation DeleteMovie($id: ID!) {
    deleteMovie(id: $id) {
      id
    }
  }
`;

export const GET_SEARCH = gql`
  query Search($name: String!) {
    search(name: $name) {
      name
    }
  }
`;
