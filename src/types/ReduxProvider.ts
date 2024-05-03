import { User } from '@/types';
import { StringOrUndefinedOrNullType } from '@/types';

export interface ReduxProviderProps {
    initialState: initialState;
    children: React.ReactNode;
}

interface initialState {
    auth: {
        user: User | null | undefined;
        token: StringOrUndefinedOrNullType;
    };
}
