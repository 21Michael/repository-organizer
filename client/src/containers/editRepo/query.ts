import { gql } from '@apollo/client';

export const UPDATE_REPOSITORY_MUTATION = gql`
	mutation UpdateRepository ($data: RepositoryInput!) {
		updateRepository (data: $data) {
			_id
			name
			description
			stars
			creator_name
			created_at
		}
	}
`;