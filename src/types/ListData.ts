import { IPagination } from "@/types/common";
import { Post } from "@/types/Post";

export interface IData {
	posts: Array<Post> | null;
	pagination: IPagination | null;
}

export interface ListData {
	data: IData;
	error?: string;
}
