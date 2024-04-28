import { User as UserModel } from '@/models/User';
import { connect } from '@/lib/mongodb';

export const User = {
    login: async (username: string, password: string) => {
        await connect();

        const user = await UserModel.findOne({ username, password }).exec();

        return user;
    },
    register: async (username: string, email: string, password: string) => {
        await connect();
        const user = new UserModel({
            username,
            email,
            password,
        });
        await user.save();
        return user;
    },
};
