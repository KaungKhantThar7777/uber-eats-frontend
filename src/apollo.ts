import { ApolloClient, createHttpLink, InMemoryCache, makeVar, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";
import { HTTP_API, WS_API, LOCATSTORAGE_TOKEN } from "./constants";
import { getMainDefinition } from "@apollo/client/utilities";

const token = localStorage.getItem(LOCATSTORAGE_TOKEN);
export const isLoggedInVar = makeVar(Boolean(token));
export const authToken = makeVar(token ?? "");

const httpLink = createHttpLink({
  uri: HTTP_API,
});

const wsLink = new WebSocketLink({
  uri: WS_API,
  options: {
    reconnect: true,
    connectionParams: {
      token: authToken() ?? "",
    },
  },
});

const authLink = setContext((request, { headers }) => {
  return {
    headers: {
      ...headers,
      token: authToken() ?? "",
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);
export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              return authToken();
            },
          },
        },
      },
    },
  }),
});
