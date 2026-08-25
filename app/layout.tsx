import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import { Background } from "@/components/Background";
import { site } from "@/lib/content";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin"],
});

const spaceMono = Space_Mono({
	variable: "--font-space-mono",
	subsets: ["latin"],
	weight: ["400", "700"],
});

export const metadata: Metadata = {
	title: {
		default: site.handle,
		template: `%s / ${site.handle}`,
	},
	description: site.description,
	metadataBase: new URL(site.url),
	// og:image is supplied automatically by app/opengraph-image.tsx
	openGraph: {
		type: "website",
		siteName: site.name,
		title: site.name,
		description: site.description,
		url: site.url,
		locale: "en_US",
	},
	twitter: {
		card: "summary_large_image",
		title: site.name,
		description: site.description,
	},
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			className={`${spaceGrotesk.variable} ${spaceMono.variable} h-full`}
		>
			<body className="min-h-full flex flex-col">
				<Background />
				{children}
			</body>
		</html>
	);
}
