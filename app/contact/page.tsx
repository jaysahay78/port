import { ContactForm } from "@/components/ContactForm";
import { ExternalLink } from "@/components/NavLink";
import { Header } from "@/components/Header";
import { contact } from "@/lib/content";

export const metadata = { title: "contact" };

export default function Contact() {
	return (
		<>
			<Header />
			<main className="page">
				<h1>contact</h1>
				<p>{contact.blurb}</p>
				<p className="out-links">
					<a className="external" href={`mailto:${contact.email}`}>
						{contact.email}
						<span className="arrow" aria-hidden="true">
							-&gt;
						</span>
					</a>
				</p>
				<h2>contact form</h2>
				<ContactForm />

				<h2>elsewhere</h2>
				<p className="out-links">
					{contact.links.map((link) => (
						<ExternalLink key={link.href} href={link.href} icon={link.icon}>
							{link.label}
						</ExternalLink>
					))}
				</p>
			</main>
		</>
	);
}
