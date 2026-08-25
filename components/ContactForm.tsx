"use client";

import { useState } from "react";
import { contact } from "@/lib/content";

/**
 * The site is statically hosted with no backend, so submitting hands the message
 * to the visitor's mail client pre-addressed and pre-filled. Swap `onSubmit` for
 * a POST once there's an endpoint to send to.
 */
export function ContactForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const subject = name ? `hello from ${name}` : "hello from your site";
		const signature = [name, email].filter(Boolean).join("\n");
		const body = signature ? `${message}\n\n--\n${signature}` : message;

		window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
			subject,
		)}&body=${encodeURIComponent(body)}`;
	}

	return (
		<form className="contact-form" onSubmit={onSubmit}>
			<div className="field-row">
				<input
					type="text"
					name="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="name"
					aria-label="name"
					autoComplete="name"
				/>
				<input
					type="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="email (if you want a reply)"
					aria-label="email (if you want a reply)"
					autoComplete="email"
				/>
			</div>
			<textarea
				name="message"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				placeholder="your message..."
				aria-label="your message"
				rows={6}
				required
			/>
			<button type="submit">
				submit
				<span className="arrow" aria-hidden="true">
					&rarr;
				</span>
			</button>
		</form>
	);
}
