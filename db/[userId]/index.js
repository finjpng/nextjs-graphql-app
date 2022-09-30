import React from "react";
import { GET_ALL_USERS, GET_USER } from "../../db/queries";
import UserDetails from "../UserDetails";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useRouter } from "next/router";
function UserId(props) {
  return <UserDetails id={props.user.id} name={props.user.name} />;
}

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});
// get static path is important for dynamic pages to tell nextjs for whic dynamic parameter values this page should be pregenerated
export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_ALL_USERS,
  });
  return {
    fallback: "blocking",
    paths: data.users.map((dt) => ({
      params: { userId: dt.id },
    })),
  };
}
export async function getStaticProps(context) {
  const userId = context.params.userId;

  const { data } = await client.query({
    query: GET_USER,
    variables: { id: context.params.userId },
  });
  return {
    props: {
      user: {
        id: data.user.id,
        name: data.user.name,
      },
    },
  };
}
export default UserId;
