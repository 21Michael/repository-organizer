import { gql } from '@apollo/client';

export const SIGN_UP_MUTATION = gql`
    mutation SignUp($email: String!, $name: String!, $password: String!) {
        signUp(email: $email, name: $name, password: $password)
    }
`;
