import { gql } from '@apollo/client';

export const REPOSITORIES_QUERY = gql`
	query Repositories {
		repositories {
			_id,
			name,
			description,
			stars,
			creator_name,
			created_at
		}
	}
`;

export const REMOVE_REPOSITORY_MUTATION = gql`
	mutation RemoveRepository ($id: ID!) {
		removeRepository (id: $id) {
			_id
		}
	}
`;