import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:8080",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
