"use server";
import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(prevState, formData) {
	const title = formData.get("title");
	const image = formData.get("image");
	const content = formData.get("content");

	let errors = [];
	if (!title || title.trim().length === 0) {
		errors.push("title is required");
	}
	if (!title || content.trim().length === 0) {
		errors.push("content is required");
	}
	if (!image) {
		errors.push("image is required");
	}

	if (errors.length > 0) {
		return { errors };
	}
	let imageUrl;
	try {
		imageUrl = await uploadImage(image);
		imageUrl ? console.log(imageUrl) : null;
		imageUrl &&
			(await storePost({
				imageUrl,
				title,
				content,
				userId: 1,
			}));
	} catch (error) {
		throw new Error("faile to upload image");
	}

	revalidatePath("/", "layout");
	redirect("/feed");
}

export async function UpdateToggleLikeStatus(postId) {
	await updatePostLikeStatus(postId, 2);
	revalidatePath("/", "layout");
}
