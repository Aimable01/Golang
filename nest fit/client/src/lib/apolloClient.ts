import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:8080/query",
  }),
  cache: new InMemoryCache(),
});

export default client;
