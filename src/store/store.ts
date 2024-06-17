import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query/react';
import {paintingsApi} from '../DAL/paintingsApi';
import {authorsApi} from '../DAL/authorsApi';
import {locationsApi} from '../DAL/locationsApi';
import {themeReducer} from "./themeSlice";

export const store = configureStore({
    reducer: {
        [paintingsApi.reducerPath]: paintingsApi.reducer,
        [authorsApi.reducerPath]: authorsApi.reducer,
        [locationsApi.reducerPath]: locationsApi.reducer,
        theme: themeReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(paintingsApi.middleware, authorsApi.middleware, locationsApi.middleware),
});
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch