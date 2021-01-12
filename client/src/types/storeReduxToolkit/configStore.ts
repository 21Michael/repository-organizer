import store from '../../storeReduxToolkit/configStore'

export type AppDispatch = typeof store.dispatch;
export interface ThunkApi {
    dispatch: AppDispatch;
    rejectWithValue: Function
}
