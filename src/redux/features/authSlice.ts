import { User } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { user: User | null; token: string | null } = {
    user: null,
    token: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setInitialAuth: (state, action) => {
            state.user = action.payload?.user;
            state.token = action.payload?.token;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        setLogout: state => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setInitialAuth, setUser, setLogout } = authSlice.actions;
export default authSlice.reducer;
