import { ListLink } from "@/components/NavLink";
import { Header } from "@/components/Header";
import { projects } from "@/lib/content";

export const metadata = { title: "projects" };

export default function Projects() {
	return (
		<>
			<Header />
			<main className="page listing">
				<h1>
					projects<span className="count">[{projects.length}]</span>
				</h1>
				<ul className="entries">
					{projects.map((project) => (
						<li key={project.slug}>
							<ListLink href={`/projects/${project.slug}`}>
								<span className="entry">
									<span className="entry-head">
										<span className="entry-title">{project.name}</span>
										<span className="entry-meta">{project.year}</span>
									</span>
									<span className="entry-blurb">{project.blurb}</span>
								</span>
							</ListLink>
						</li>
					))}
				</ul>
			</main>
		</>
	);
}
