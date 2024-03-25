import { graphql } from "../../gql";

export const verifyUserToken = graphql( `
#graphql
    query VerifyUserToken($token: String!) {
        verifyGoogleToken(token: $token)
}`
);

export const getCurrentUserQuery = graphql(`
query GetCurrentUser {
    getCurrentUser {
      id
      profileImageURL
      email
      firstName
      lastName
    }
  }`
);