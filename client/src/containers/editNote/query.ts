import { gql } from '@apollo/client';

export const UPDATE_NOTE_MUTATION = gql`
	mutation UpdateNote ($data: NoteUpdateInput!) {
		updateNote (data: $data) {
			_id
			text
		}
	}
`;