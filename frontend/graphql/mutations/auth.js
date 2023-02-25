import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Auth($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        displayName
        email
      }
    }
  }
`;
