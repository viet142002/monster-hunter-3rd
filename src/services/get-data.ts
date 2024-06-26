import { PostAction } from "@/_actions";
import { Post, Tag } from "@/types";
import { ListData } from "@/types";

export const getListData = async (
	type: Tag,
	query?: { [key: string]: string }
): Promise<ListData> => {
	try {
		const data = await PostAction.getAllPost({
			tag: type,
			query: query,
		});

		return {
			data: {
				posts: data.posts || null,
				pagination: data.pagination || null,
			},
		};
	} catch (error: any) {
		return {
			data: {
				posts: null,
				pagination: null,
			},
			error: error.message,
		};
	}
};

export const getDetailData = async (id: string) => {
	try {
		const data = await PostAction.getPostById(id);
		return { data };
	} catch (error: any) {
		return { error: error.message };
	}
};
