import { BackLink } from "@/components/NavLink";
import { Header } from "@/components/Header";

export default function NotFound() {
	return (
		<>
			<Header />
			<main className="page">
				<h1>404</h1>
				<p>that page doesn&apos;t exist.</p>
				<BackLink href="/" label="home" />
			</main>
		</>
	);
}
