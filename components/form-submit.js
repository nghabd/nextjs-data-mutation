"use client";
import { useFormStatus } from "react-dom";

export default function FormSubmit() {
	const status = useFormStatus();
	// if (status.pending) {
	// 	return <p>Creating posts ...</p>;
	// }
	return (
		<>
			<button type="reset">Reset</button>
			<button type="submit" disabled={status.pending}>
				{status.pending ? "posting ..." : "Create post"}
			</button>
		</>
	);
}
