'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import dynamic from 'next/dynamic';
import { useState } from 'react';
const MyEditor = dynamic(() => import('@/components/common/MyEditor'), {
    ssr: false,
});
import axios from 'axios';

const formSchema = z.object({
    title: z.string().min(10, {
        message: 'Username must be at least 10 characters.',
    }),
    body: z.string().min(20, {
        message: 'Body must be at least 20 characters.',
    }),
    tag: z.enum([
        'pet',
        'weapon',
        'clothes',
        'quest',
        'guide',
        'download',
        'other',
    ]),
});

function PostPage() {
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            body: '',
            tag: 'other',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        axios.post('/api/posts', values).then(res => {
            setLoading(false);
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Nhập tiêu đề...'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='tag'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select a verified email to display' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value='pet'>
                                        Thú cưng
                                    </SelectItem>
                                    <SelectItem value='weapon'>
                                        Vũ khí
                                    </SelectItem>
                                    <SelectItem value='clothes'>
                                        Quần áo
                                    </SelectItem>
                                    <SelectItem value='quest'>
                                        Nhiệm vụ
                                    </SelectItem>
                                    <SelectItem value='guide'>
                                        Hướng dẫn
                                    </SelectItem>
                                    <SelectItem value='download'>
                                        Tải xuống
                                    </SelectItem>
                                    <SelectItem value='other'>Khác</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>Loại bài viết.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='body'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Body</FormLabel>
                            <FormControl>
                                <MyEditor
                                    model={field.value}
                                    onModelChange={field.onChange}
                                />
                            </FormControl>
                            <FormDescription>
                                Nôi dung bài viết.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit'>
                    {loading ? 'Loading...' : 'Submit'}
                </Button>
            </form>
        </Form>
    );
}

export default PostPage;
