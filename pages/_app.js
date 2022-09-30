import "../styles/globals.css";
// import {ApolloProvider} from 'apollo-server-micro'
import { InMemoryCache, ApolloClient, ApolloProvider } from "@apollo/client";
import Layout from "../layout/Layout";
function MyApp({ Component, pageProps }) {
  const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
