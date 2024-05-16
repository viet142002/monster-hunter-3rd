import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ImageUrl } from "@/constants";
import { formatDateFrom } from "@/helpers/server";

import { Post } from "@/types";
import Image from "next/image";

export function CardPost({ post }: { post: Post }) {
	return (
		<Card className='max-w-[300px] flex flex-col h-full !bg-[#0000002b]'>
			<CardContent>
				<CardHeader>
					<h2>{post?.user || "Quốc Việt"}</h2>
				</CardHeader>
				<figure className='aspect-[3/4] w-full overflow-hidden'>
					<Image
						src={post?.thumbnail || ImageUrl.thumbnail}
						alt={post.title}
						width={250}
						height={300}
						className='w-full h-full !object-cover overflow-hidden'
					/>
				</figure>
				<CardTitle className='pt-4'>{post.title}</CardTitle>
			</CardContent>

			<CardFooter>
				<span>{formatDateFrom(post.createdAt)}</span>
			</CardFooter>
		</Card>
	);
}
