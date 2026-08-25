import { ListLink } from "@/components/NavLink";
import { Header } from "@/components/Header";
import { posts } from "@/lib/content";

export const metadata = { title: "blog" };

const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export default function Blog() {
	return (
		<>
			<Header />
			<main className="page listing">
				<h1>
					blog<span className="count">[{posts.length}]</span>
				</h1>
				<ul className="entries">
					{sorted.map((post) => {
						const entry = (
							<span className="entry">
								<span className="entry-head">
									<span className="entry-title">{post.title}</span>
									<span className="entry-meta">{post.date}</span>
								</span>
								<span className="entry-blurb">{post.blurb}</span>
							</span>
						);

						return (
							<li key={post.slug}>
								{post.url ? (
									// Hosted elsewhere -- link straight out, same styling as the
									// internal entries so the list reads as one thing.
									<a
										className="link"
										href={post.url}
										target="_blank"
										rel="noreferrer"
									>
										{entry}
										<span className="arrow" aria-hidden="true">
											-&gt;
										</span>
									</a>
								) : (
									<ListLink href={`/blog/${post.slug}`}>{entry}</ListLink>
								)}
							</li>
						);
					})}
				</ul>
			</main>
		</>
	);
}
