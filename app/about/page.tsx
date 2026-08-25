import { ExternalLink } from "@/components/NavLink";
import { Header } from "@/components/Header";
import { about } from "@/lib/content";

export const metadata = { title: "about" };

export default function About() {
	const { intro, links, education, tech } = about;

	return (
		<>
			<Header />
			<main className="page about">
				<h1>about</h1>
				{intro.map((line) => (
					<p key={line}>{line}</p>
				))}

				<h2>links</h2>
				<p className="out-links stacked">
					{links.map((link) => (
						<ExternalLink
							key={link.href + link.label}
							href={link.href}
							icon={link.icon}
							download={"download" in link ? link.download : undefined}
						>
							{link.label}
						</ExternalLink>
					))}
				</p>

				<h2>tech</h2>
				<dl className="skills tech">
					{tech.map((group) => (
						<div key={group.group} className="skill-row">
							<dt>{group.group}</dt>
							<dd>{group.items.join(", ")}</dd>
						</div>
					))}
				</dl>

				<h2>education</h2>
				<dl className="skills">
					{education.map((entry) => (
						<div key={entry.school} className="skill-row">
							<dt>{entry.year}</dt>
							<dd>
								{entry.degree}
								<span className="school">{entry.school}</span>
							</dd>
						</div>
					))}
				</dl>
			</main>
		</>
	);
}
