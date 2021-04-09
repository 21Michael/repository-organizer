const { gql } = require('apollo-server-express');

const schemas = gql`
  scalar Date

  type Query {
    currentUser: User
    repositories: [Repository]
    notes: [Note]
  }

  type Mutation {
    signIn(email: String!, password: String!): String
    signUp(name: String!, email: String!, password: String!): String
    signOut: String!
    removeRepository(id: ID!): Repository!
    updateRepository(data: RepositoryInput!): Repository!
    addRepository(data: RepositoryInput!): Repository!
    removeNote(note_id: ID!): Note!
    updateNote(data: NoteUpdateInput!): Note!
    addNote(data: NoteInput!): Note!
  }

  input RepositoryInput {
    _id: ID
    name: String!
    description: String!
    stars: String!
    creator_name: String!
    created_at: Date!
  }

  input NoteUpdateInput {
    note_id: ID!
    text: String!
  }

  input NoteInput {
    repository_id: ID!
    text: String!
    created_at: Date!
  }

  type User {
    id: ID!
    user_name: String!
    signed_by: String!
    email: String
    password: String
    github_id: String
    avatar_url: String
    profile_url: String 
  }

  type Repository {
    _id: ID!
    name: String!
    description: String!
    stars: Int!
    creator_name: String!
    created_at: Date!
  }

  type Note {
    _id: ID!
    repository_id: ID!
    text: String!
    created_at: Date!
    user_id: ID!
  }

`;

export default schemas;

