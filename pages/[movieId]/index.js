import React from "react";
import {
  GET_ALL_USERS,
  GET_MOVIES,
  GET_MOVIE_ID,
  GET_USER,
} from "../../db/queries";
import UserDetails from "../UserDetails";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useRouter } from "next/router";
import MovieDetail from "../movieDetail";
function MovieId(props) {
  return (
    <MovieDetail
      id={props.movie.id}
      name={props.movie.name}
      image={props.movie.image}
      release={props.movie.release}
      director={props.movie.director}
      synopsis={props.movie.synopsis}
      //   cast1={props.movie.casts.cast1}
      //   cast1={props.movie.cast1}
    />
  );
  // <UserDetails id={props.user.id} name={props.user.name} />;
}

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});
// get static path is important for dynamic pages to tell nextjs for whic dynamic parameter values this page should be pregenerated
export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_MOVIES,
  });

  //   const paths = data.map((post) => ({
  //     params: { id: post.id },
  //   }))
  return {
    fallback: false,
    paths: data.movies.map((dt) => ({
      params: { movieId: dt.id },
    })),
  };
}
export async function getStaticProps(context) {
  const movieId = context.params.movieId;

  const { data } = await client.query({
    query: GET_MOVIE_ID,
    variables: { id: context.params.movieId },
  });
  return {
    props: {
      movie: {
        id: data.movie.id,
        name: data.movie.name,
        image: data.movie.image,
        release: data.movie.release,
        director: data.movie.director,
        synopsis: data.movie.synopsis,
        // casts: {
        //   cast1: data.movie.cast1,
        // },
      },
    },
    revalidate: 1,
  };
}
export default MovieId;
