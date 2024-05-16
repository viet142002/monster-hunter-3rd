"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dynamic from "next/dynamic";
import { useState } from "react";
import Img from "next/image";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
const MyEditor = dynamic(() => import("@/components/common/MyEditor"), {
  ssr: false,
});
import axios from "axios";
import { toast } from "sonner";
import { imageUpload } from "@/helpers/clients";

const formSchema = z.object({
  title: z.string().min(10, {
    message: "Username must be at least 10 characters.",
  }),
  body: z.string().min(20, {
    message: "Body must be at least 20 characters.",
  }),
  tag: z.enum([
    "pet",
    "weapon",
    "clothes",
    "quest",
    "guide",
    "download",
    "other",
  ]),
});

function PostPage() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null | string>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
      tag: "other",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let thumbnail: string = "";
    setLoading(true);
    if (image instanceof File) {
      const res = await imageUpload([image]);
      if (res) {
        thumbnail = res[0].url;
      }
    } else if (typeof image === "string") {
      thumbnail = image;
    }

    axios
      .post("/api/posts", { ...values, thumbnail })
      .then(res => {
        setImage(null);
        form.reset();
        toast("Tạo bài thành công", {
          description:
            "Bài viết của bạn đã được tạo thành công. Tựa đề của bài viết là: " +
            res.data.post.title,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='lg:flex justify-between gap-6'>
            <div className='flex-1'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập tiêu đề...' {...field} />
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
                    <FormLabel>Loại bài đăng</FormLabel>
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
                        {/* <SelectItem value='pet'>
                                                    Thú cưng
                                                </SelectItem> */}
                        {/* <SelectItem value='weapon'>
                                                    Vũ khí
                                                </SelectItem> */}
                        {/* <SelectItem value='clothes'>
                                                    Quần áo
                                                </SelectItem> */}
                        <SelectItem value='quest'>Nhiệm vụ</SelectItem>
                        <SelectItem value='guide'>Hướng dẫn</SelectItem>
                        <SelectItem value='download'>Tải xuống</SelectItem>
                        <SelectItem value='other'>Khác</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Loại bài viết.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='w-[300px]'>
              <div className='mb-4'>
                <Input
                  placeholder='Nhập url ảnh'
                  onChange={e => {
                    console.log(e.target.value);
                    setImage(e.target.value);
                  }}
                />
              </div>
              <input
                type='file'
                onChange={handleChange}
                id='thumbnail'
                hidden
              />
              <label htmlFor='thumbnail' className='cursor-pointer'>
                {image ? (
                  typeof image === "string" ? (
                    <Img
                      src={image}
                      alt='thumbnail'
                      width={200}
                      height={250}
                      className='w-full h-auto object-cover rounded-md'
                    />
                  ) : (
                    <Img
                      src={new URL(URL.createObjectURL(image)).toString()}
                      alt='thumbnail'
                      width={200}
                      height={250}
                      className='w-[200px] h-[250px] mx-auto object-cover rounded-md'
                    />
                  )
                ) : (
                  <div className='w-[200px] h-[250px] mx-auto bg-gray-200 rounded-md'>
                    <div className='flex items-center justify-center w-full h-full text-gray-500'>
                      <span>Chọn ảnh</span>
                    </div>
                  </div>
                )}
              </label>
            </div>
          </div>

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
                <FormDescription>Nội dung bài viết.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit'>{loading ? "Loading..." : "Submit"}</Button>
        </form>
      </Form>
    </>
  );
}

export default PostPage;
