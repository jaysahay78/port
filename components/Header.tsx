import Link from "next/link";
import { nav, site } from "@/lib/content";
import { NavLink } from "./NavLink";

/** Handle on the left, the full nav on the right. Shown on every page but home. */
export function Header() {
	return (
		<header>
			<Link href="/" className="handle">
				<h1>{site.handle}</h1>
			</Link>
			<nav>
				{nav.map((item) => (
					<NavLink key={item.href} href={item.href} label={item.label} />
				))}
			</nav>
		</header>
	);
}
