import { withApollo } from "next-with-apollo";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(
      ({ message, locations, path }) =>
        new Error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
    );

  if (networkError) new Error(`[Network error]: ${networkError}`);
});

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      link: from([errorLink, httpLink]),
      cache: new InMemoryCache().restore(initialState || {}),
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
