import { gql, useQuery } from "@apollo/client";
import { MeQuery } from "../api-types";

const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const useMe = () => {
  return useQuery<MeQuery>(ME_QUERY);
};
