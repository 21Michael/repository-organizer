import { InitialState as InitialStateAuth } from './auth/slices'
import { InitialState as InitialStateNotes } from './notes/slices'
import { InitialState as InitialStateRepositories } from './repositories/slices'

export interface RootReducer {
  repositories: InitialStateRepositories,
  notes: InitialStateNotes,
  auth: InitialStateAuth,
}


