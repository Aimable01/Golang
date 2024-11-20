import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const httpLink = createHttpLink({
  uri: "http://localhost:8080",
});

const useAuthLink = () => {
  const authContext = useContext(AuthContext);
  return setContext((_, { headers }) => {
    const token = authContext?.token;
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
};

const client = () => {
  const authLink = useAuthLink();
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default client;
