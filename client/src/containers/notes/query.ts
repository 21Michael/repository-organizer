import { gql } from '@apollo/client';

export const NOTES_QUERY = gql`
	query Notes {
		notes {
			_id
			user_id
			repository_id
			text
			created_at
		} 
	}
`;

export const REMOVE_NOTE_MUTATION = gql`
	mutation RemoveNote ($note_id: ID!) {
		removeNote (note_id: $note_id) {
			_id
		}
	}
`;