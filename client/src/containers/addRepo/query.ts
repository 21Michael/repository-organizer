import { gql } from '@apollo/client';

export const ADD_REPOSITORY_MUTATION = gql`
	mutation AddRepository ($data: RepositoryInput!) {
		addRepository (data: $data) {
			_id
			name
			description
			stars
			creator_name
			created_at
		}
	}
`;