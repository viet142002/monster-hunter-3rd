'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setLogout, setUser } from '@/redux/features';
import { UserAction } from '@/_actions';
import axios from 'axios';

export function useAuth() {
    const { user, token } = useAppSelector(state => state.auth);
    return { user, token };
}

export function useAuthAction() {
    const dispatch = useAppDispatch();
    return {
        login: (data: { email: string; password: string }) => {
            return new Promise((resolve, reject) => {
                UserAction.login(data)
                    .then((res: any) => {
                        dispatch(setUser(res));
                        resolve(res);
                    })
                    .catch(error => reject(error));
            });
        },
        logout: () => {
            return new Promise(resolve => {
                dispatch(setLogout());
                resolve(true);
            });
        },
        register: async (data: {
            full_name: string;
            email: string;
            password: string;
        }) => {
            try {
                const res = await axios.post('/api/auth/register', data);
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        update: (id: string, data: { full_name: string; password: string }) => {
            return new Promise((resolve, reject) => {
                UserAction.update(id, data)
                    .then((res: any) => {
                        dispatch(setUser(res));
                        resolve(res);
                    })
                    .catch(error => reject(error));
            });
        },
    };
}
