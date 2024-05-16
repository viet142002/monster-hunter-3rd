import { CardPost } from "@/components/common";
import { getListData } from "@/services/get-data";
import { Tag, Post } from "@/types";
import axios from "axios";
import Link from "next/link";
import { notFound } from "next/navigation";

async function TypePage({
	searchParams,
}: {
	searchParams: { type: Tag; query?: { [key: string]: string } };
}) {
	const { type } = searchParams;

	if (!type || typeof type !== "string") {
		return notFound();
	}
	const { data } = await getListData(type);

	return (
		<>
			<h1 className='text-xl text-center'>{`Posts with tag: ${type}`}</h1>
			<nav className='mt-4'>
				<ul className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 md:gap-4 justify-items-center justify-between'>
					{data?.map((post: Post) => (
						<li key={post._id} className='w-full'>
							<Link
								href={`/${type}/${post._id}`}
								className='block h-full'
							>
								<CardPost post={post} />
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
}

export default TypePage;
