import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://loalhost:4000/graphql",
  cache: new InMemoryCache(),
});