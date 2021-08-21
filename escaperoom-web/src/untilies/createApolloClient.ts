import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getBookings: {
          keyArgs: false,
          merge(existing = [], incoming) {
            console.log(existing, incoming)
            return [...existing, ...incoming]
          },
        },
      },
    },
  },
});

export const createApolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache
});

