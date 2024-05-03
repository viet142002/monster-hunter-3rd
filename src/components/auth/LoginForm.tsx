'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuthAction } from '@/helpers/hooks';
import { useState } from 'react';

const formSchema = z.object({
    full_name: z.string().min(3, {
        message: 'Họ tên phải có ít nhất 3 ký tự',
    }),
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(6, {
        message: 'Mật khẩu phải có ít nhất 6 ký tự',
    }),
});
export function LoginForm() {
    const { login } = useAuthAction();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            full_name: '',
            email: '',
            password: '',
        },
    });
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        login(values)
            .then((res: any) => {
                console.log(res);
            })
            .catch((err: any) => {
                setLoading(false);
                setError(err.message);
            });
    };
    return (
        <Card className='max-w-[450px] min-w-[350px]'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-8'
                >
                    <CardHeader>
                        <CardTitle className='text-center'>Đăng nhập</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='full_name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Họ tên</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Họ tên'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Email đăng nhập'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mật khẩu</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Mật khẩu'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className='flex justify-center'>
                        <Button type='submit'>Đăng ký</Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}
