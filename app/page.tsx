import { PixelBackground } from "@/components/PixelBackground";
import { Logo } from "@/components/Logo";
import { NavLink } from "@/components/NavLink";
import { nav, site } from "@/lib/content";

/** The landing page: name, mark, one line about you, and the whole nav. */
export default function Home() {
	return (
		<main className="home">
			<PixelBackground />
			<div className="home-inner">
				<div className="home-row">
					<h1>{site.handle}</h1>
					<Logo />
				</div>
				<p className="tagline">{site.tagline}</p>
				<nav className="home-nav">
					{nav.map((item) => (
						<NavLink key={item.href} href={item.href} label={item.label} />
					))}
				</nav>
			</div>
		</main>
	);
}
