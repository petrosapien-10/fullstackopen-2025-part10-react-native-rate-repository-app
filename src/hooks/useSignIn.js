import { AUTHENTICATE } from "../graphql/mutations";
import { useApolloClient, useMutation } from "@apollo/client";

import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { username, password },
    });

    if (data?.authenticate.accessToken) {
      await authStorage.setAccessToken(data.authenticate.accessToken);
      await apolloClient.resetStore();
    }

    return { data };
  };

  return [signIn, result];
};

export default useSignIn;
