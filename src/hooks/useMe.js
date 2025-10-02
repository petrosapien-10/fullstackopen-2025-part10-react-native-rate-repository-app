import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";

const useMe = (includeReviews = false) => {
  const { data, error, loading, refetch } = useQuery(ME, {
    variables: { includeReviews },
    fetchPolicy: "cache-and-network",
  });

  return {
    me: data?.me,
    error,
    loading,
    refetch,
  };
};

export default useMe;
