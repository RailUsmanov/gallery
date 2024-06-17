import {createSlice} from '@reduxjs/toolkit';

interface ThemeState {
    themeDark: boolean;
}

const initialState: ThemeState = {
    themeDark: false
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleThemeDark: (state) => {
            state.themeDark = !state.themeDark;
        }
    }
});

export const {toggleThemeDark} = themeSlice.actions;
export const themeReducer = themeSlice.reducer;

export interface RootState {
    theme: ThemeState;
}

export default themeSlice;