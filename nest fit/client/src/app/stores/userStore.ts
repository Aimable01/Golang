// stores/userStore.ts
import { create } from "zustand";
import client from "../../lib/apolloClient";
import { GET_PROFILE } from "../../graphql/queries";
import { gql } from "@apollo/client";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  profilePicture: string;
}

interface UserState {
  currentUser: User | null;
  profileUser: User | null;
  isLoading: boolean;
  fetchCurrentUser: () => Promise<void>;
  fetchProfile: (username: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  profileUser: null,
  isLoading: false,

  fetchCurrentUser: async () => {
    set({ isLoading: true });
    try {
      const { data } = await client.query({
        query: gql`
          query GetCurrentUser {
            user(username: "") {
              id
              name
              username
              email
              profilePicture
            }
          }
        `,
        fetchPolicy: "network-only",
      });
      set({ currentUser: data.user });
    } catch (error) {
      console.error("Error fetching current user:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchProfile: async (username) => {
    set({ isLoading: true });
    try {
      const { data } = await client.query({
        query: GET_PROFILE,
        variables: { username },
        fetchPolicy: "network-only",
      });
      set({ profileUser: data.user });
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
