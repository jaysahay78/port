import Link from "next/link";
import { Icon, type IconName } from "./Icons";

/**
 * A nav link where the leading slash folds away and an arrow swings in on hover.
 * The two glyphs are stacked; the CSS in globals.css does the choreography.
 */
export function NavLink({ href, label }: { href: string; label: string }) {
	return (
		<Link className="nav" href={href}>
			<span className="arrow" aria-hidden="true">
				-&gt;
			</span>
			<span className="slash" aria-hidden="true">
				/
			</span>
			{label}
		</Link>
	);
}

/** A link out to another site: the arrow lifts up and to the right on hover. */
export function ExternalLink({
	href,
	icon,
	download,
	children,
}: {
	href: string;
	icon?: IconName;
	/** Filename to save as. Turns the link into a download instead of a visit. */
	download?: string;
	children: React.ReactNode;
}) {
	// A download must stay in the same tab -- target="_blank" would open the
	// file in a viewer instead of saving it.
	const behaviour = download
		? { download }
		: { target: "_blank", rel: "noreferrer" };

	return (
		<a className="external" href={href} {...behaviour}>
			{icon && <Icon name={icon} />}
			{children}
			<span className="arrow" aria-hidden="true">
				-&gt;
			</span>
		</a>
	);
}

/** A list item link: the arrow slides out from behind the title on hover. */
export function ListLink({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	return (
		<Link className="link" href={href}>
			{children}
			<span className="arrow" aria-hidden="true">
				-&gt;
			</span>
		</Link>
	);
}

/** A back link: the arrow slides left on hover. */
export function BackLink({ href, label }: { href: string; label: string }) {
	return (
		<Link className="back" href={href}>
			<span className="arrow" aria-hidden="true">
				&lt;-
			</span>
			{label}
		</Link>
	);
}
