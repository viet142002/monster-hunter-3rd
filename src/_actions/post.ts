import { FixFindData } from "@/helpers/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import { IPagination, Post as PostType, Tag } from "@/types";

interface IGetAllPost {
	tag: Tag;
	query?: { [key: string]: string };
}
interface IReturnTypes {
	error?: any;
	pagination?: IPagination;
	posts?: Array<PostType>;
}

export const PostAction = {
	getAllPost: async ({
		tag = "guide",
		query = {},
	}: IGetAllPost): Promise<IReturnTypes> => {
		try {
			let newQuery = {};
			let limit = 10;
			if (query.search) {
				newQuery = {
					title: {
						$regex: query.search.toString(),
						$options: "i",
					},
				};
			}
			if (query.limit) {
				limit = Number(query.limit);
			}

			await dbConnect();
			const posts = FixFindData(
				await Post.find({
					tag: tag,
					...newQuery,
				})
					.select("-__v -updatedAt -body")
					.sort({ createdAt: -1 })
					.limit(limit)
					.skip((Number(query.page) - 1) * limit)
			);
			const total = await Post.countDocuments({ tag: tag, ...newQuery });
			return {
				posts,
				pagination: { total, limit, page: Number(query.page) },
			};
		} catch (error) {
			return { error };
		}
	},
	getPostById: async (id: string) => {
		try {
			await dbConnect();
			const post = FixFindData(await Post.findById(id));
			return post;
		} catch (error) {
			return error;
		}
	},
	createPost: async ({ title, body, tag, thumbnail = "" }: PostType) => {
		await dbConnect();
		const post = new Post({
			title,
			body,
			tag,
			thumbnail,
			// user,
		});
		await post.save();
		return post;
	},
};
