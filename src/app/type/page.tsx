import { PostAction } from "@/_actions";
import { CardPost, Pagination } from "@/components/common";
import { Search } from "@/components/common";
import { getListData } from "@/services/get-data";
import { Tag, Post } from "@/types";
import Link from "next/link";
import { notFound } from "next/navigation";

async function TypePage({
	searchParams,
}: {
	searchParams: { type: Tag; page: string | null; search: string | null };
}) {
	const { type, page, search } = searchParams;

	if (!type || typeof type !== "string") {
		return notFound();
	}
	const {
		data: { posts, pagination },
	} = await getListData(type, {
		search: search || "",
		page: page || "",
		limit: "4",
	});

	return (
		<>
			<h1 className='text-xl text-center'>{`Posts with tag: ${type}`}</h1>
			<Search placeholder='Tìm kiếm' />
			<div className='mt-4'>
				<ul className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 md:gap-4 justify-items-center justify-between'>
					{posts?.map((post: Post) => (
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
			</div>
			<Pagination
				total={pagination?.total || 0}
				siblingCount={0}
				pageSize={4}
				className='mt-4'
			/>
		</>
	);
}

export default TypePage;
