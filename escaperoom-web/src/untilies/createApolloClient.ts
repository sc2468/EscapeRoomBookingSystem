import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { changeDate, getStartOfDate } from "./getDateString";

export const dateVar = makeVar<Date>(getStartOfDate(new Date()));
export const fetchTillVar = makeVar<number>(changeDate(getStartOfDate(new Date()), 3).getTime());

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getBookings: {
          keyArgs: false,
          merge(existing = [], incoming) {
            //console.log(existing, incoming)
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

