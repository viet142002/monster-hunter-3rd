import bcrypt from 'bcryptjs';
import { User as UserModel } from '@/models/User';
import dbConnect from '@/lib/mongodb';
import { FixFindData } from '@/helpers/server';
import { generateToken } from '@/helpers/server';

export const UserAction = {
    login: async ({ email, password }: { email: string; password: string }) => {
        await dbConnect();
        try {
            const user = FixFindData(
                await UserModel.findOne({ email, password }).exec()
            );
            if (!user) {
                throw new Error('User not found');
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                throw new Error('Invalid password');
            }
            const token = generateToken({
                _id: user._id,
                email: user.email,
                role: user.role,
            });
            return { token, user };
        } catch (error) {
            throw error;
        }
    },
    register: async ({
        full_name,
        email,
        password,
    }: {
        full_name: string;
        email: string;
        password: string;
    }) => {
        await dbConnect();
        try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const user = new UserModel({
                full_name,
                email,
                password: hashPassword,
            });
            await user.save();
            return user;
        } catch (error) {
            console.log('🚀 ~ error:', error);

            throw error;
        }
    },
    update: async (
        id: string,
        data: {
            full_name?: string;
            email?: string;
            password?: string;
            role?: string;
        }
    ) => {
        await dbConnect();
        try {
            const user = FixFindData(
                await UserModel.findByIdAndUpdate(id, data, {
                    new: true,
                })
            );
            return user;
        } catch (error) {
            throw error;
        }
    },
};
