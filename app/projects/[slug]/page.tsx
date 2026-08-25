import { notFound } from "next/navigation";
import { BackLink, ExternalLink } from "@/components/NavLink";
import { Header } from "@/components/Header";
import { projects } from "@/lib/content";

export function generateStaticParams() {
	return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">) {
	const { slug } = await params;
	const project = projects.find((p) => p.slug === slug);
	return { title: project?.name ?? "project" };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
	const { slug } = await params;
	const project = projects.find((p) => p.slug === slug);
	if (!project) notFound();

	return (
		<>
			<Header />
			<main className="page">
				<BackLink href="/projects" label="projects" />
				<h1>{project.name}</h1>
				<p className="entry-meta">
					{project.year} &middot; {project.tags.join(", ")}
				</p>
				{project.body.map((line) => (
					<p key={line}>{line}</p>
				))}
				{project.links && project.links.length > 0 && (
					<p className="out-links">
						{project.links.map((link) => (
							<ExternalLink key={link.href} href={link.href}>
								{link.label}
							</ExternalLink>
						))}
					</p>
				)}
			</main>
		</>
	);
}
