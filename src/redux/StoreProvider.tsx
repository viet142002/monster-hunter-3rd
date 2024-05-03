'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';

import { ReduxProviderProps } from '@/types/ReduxProvider';

import { setInitialAuth } from '@/redux/features';

export default function StoreProvider({
    initialState,
    children,
}: ReduxProviderProps) {
    const storeRef = useRef<AppStore>();
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();
        storeRef.current.dispatch(setInitialAuth(initialState.auth));
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}
