import { gql } from '@apollo/client';

export const AUTH_LOCAL_MUTATION = gql`
	mutation AuthLocal($email: String!, $password: String!) {
		signIn(email: $email, password: $password) 
	}
`;
