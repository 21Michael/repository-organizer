export interface Note {
    _id: string;
    id: string;
    repositoryId: string;
    text: string;
    createdAt: string;
    [key: string]: string;
}

export interface InitialState {
    notes: Note[];
    noteAddSuccess: boolean;
    noteEditSuccess: boolean;
}

