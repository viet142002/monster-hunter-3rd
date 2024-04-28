import { User as UserModel } from '@/models/User';
import dbConnect from '@/lib/mongodb';

export const User = {
    login: async (username: string, password: string) => {
        await dbConnect();

        const user = await UserModel.findOne({ username, password }).exec();

        return user;
    },
    register: async (username: string, email: string, password: string) => {
        await dbConnect();
        const user = new UserModel({
            username,
            email,
            password,
        });
        await user.save();
        return user;
    },
};
