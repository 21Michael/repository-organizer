import { gql } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
	query CurrentUser {
		currentUser {
			id
			user_name
		}
	}
`;

export const SIGN_OUT_MUTATION = gql`
	mutation SignOut {
		signOut
	}
`;