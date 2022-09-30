// import {  gql } from "apollo-server-micro";
// const {ApolloServer} = require("apollo-server")
import { ApolloServer, gql } from "apollo-server-micro";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
// import {  gql } from "@apollo/client";
import { UserList, MovieList } from "../../db/FakeData";
const _ = require("lodash");

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(id: ID!): User
    search(name: String): User!
    movies: [Movie]
    movie(id: ID!): Movie
    movieSearch(name: String!): Movie!
  }
  type Mutation {
    createUser(input: CreateUserInput!): User
    addMovie(input: AddMovieInput!): Movie
    deleteMovie(id: ID!): Movie

    # updateUsername(input: UpdateUsernameInput!) : User
    deleteUser(id: ID!): User
  }

  type User {
    id: String
    name: String!
    username: String!
    age: Int!
    nationality: String!
    friends: [User]
  }
  type Movie {
    id: String
    name: String!
    image: String!
    release: String!
    director: String!
    synopsis: String!
  }
  input AddMovieInput {
    id: String
    name: String!
    image: String!
    release: String!
    director: String!
    synopsis: String!
  }
  input CreateUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality
  }
  enum Nationality {
    CANADA
    BRAZIL
    INDIA
    GERMANY
    CHILE
    PHILIPPINES
  }
  # type Mutation {
  #     addBlogPost(title: String, author: String, text:String): BlogPost
  #     editBlogPost(id: String,title:String,author:String,text:String):BlogPost
  #     deleteBlogPost(id:String):BlogPost
  # }
`;

const resolvers = {
  Query: {
    users: () => {
      return UserList;
    },
    user: (parent, args, context) => {
      const id = args.id;
      const userId = parseInt(id);
      // console.log(id)
      const user = UserList.find((u) => u.id === userId);
      // console.log(user)
      return user;
    },
    search: (parent, { name }) => {
      return UserList.find((users) => users.name === name);
    },
    // MOVIE RESOLVERS
    movies: () => {
      return MovieList;
    },
    movie: (parent, args, context) => {
      const id = args.id;
      const movieId = parseInt(id);
      // console.log(id)
      const movie = MovieList.find((m) => m.id === movieId);
      // console.log(user)
      return movie;
    },
    movieSearch: (parent, { name }) => {
      return MovieList.find((movie) => movie.name === name);
    },
  },
  Mutation: {
    createUser: (parent, args, context) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },
    addMovie: (parent, args, context) => {
      const movie = args.input;
      const lastId = MovieList[MovieList.length - 1].id;
      movie.id = lastId + 1;
      MovieList.push(movie);
      return movie;
    },
    deleteMovie: (parent, args, context) => {
      const id = args.id;
      _.remove(MovieList, (movie) => movie.id === Number(id));
      //    UserList.filter(user => user.id !== Number(id))
      // console.log(UserList)
      return null;
    },
    deleteUser: (parent, args, context) => {
      const id = args.id;
      _.remove(UserList, (user) => user.id === Number(id));
      //    UserList.filter(user => user.id !== Number(id))
      // console.log(UserList)
      return null;
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  // plugins: [ApolloServerPluginLandingPageLocalDefaultOptions({})],
  plugins: [
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageProductionDefault({
          embed: true,
          graphRef: "plaid-gufzoj@current",
        })
      : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
// // const apolloServer = new ApolloServer({ typeDefs, resolvers });

// // const handler = apolloServer.createHandler({ path: "/api/graphql" });

// // export const config = { api: { bodyParser: false } };

// // export default handler;

// const apolloServer = new ApolloServer({ typeDefs, resolvers });
// module.exports = apolloServer.start().then(() => {
//   return apolloServer.createHandler({ path: '/api/graphql' });
// });
