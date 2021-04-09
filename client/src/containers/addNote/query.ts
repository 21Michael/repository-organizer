import { gql } from '@apollo/client';

export const ADD_NOTE_MUTATION = gql`
	mutation AddNote ($data: NoteInput!) {
		addNote (data: $data) {
			_id
			repository_id
			text
			created_at
			user_id
		}
	}
`;