import { notFound } from "next/navigation";
import { BackLink } from "@/components/NavLink";
import { Header } from "@/components/Header";
import { posts } from "@/lib/content";

/** Only posts written here get a page; the rest link out from the list. */
export function generateStaticParams() {
	return posts.filter((post) => !post.url && post.body).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
	const { slug } = await params;
	const post = posts.find((p) => p.slug === slug);
	return { title: post?.title ?? "post" };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
	const { slug } = await params;
	const post = posts.find((p) => p.slug === slug);
	if (!post) notFound();

	const body = post.body;
	if (!body) notFound();

	return (
		<>
			<Header />
			<main className="page">
				<BackLink href="/blog" label="blog" />
				<h1>{post.title}</h1>
				<p className="entry-meta">{post.date}</p>
				{body.map((line) => (
					<p key={line}>{line}</p>
				))}
			</main>
		</>
	);
}
