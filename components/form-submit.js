"use client";
import { useFormStatus } from "react-dom";

export default function FormSubmit() {
	const status = useFormStatus();
	if (status.pending) {
		return <p>Creating posts ...</p>;
	}
	return (
		<>
			<button type="reset">Reset</button>
			<button type="submit">Create Post</button>
		</>
	);
}
