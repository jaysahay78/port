import Image from "next/image";
import { Header } from "@/components/Header";
import { photos } from "@/lib/content";

export const metadata = { title: "photos" };

export default function Photos() {
	return (
		<>
			<Header />
			<main className="page">
				<h1>
					photos<span className="count">[{photos.length}]</span>
				</h1>
				{photos.length === 0 ? (
					<p className="entry-blurb">
						nothing here yet. drop images into <code>public/photos</code> and list
						them in <code>lib/content.ts</code>.
					</p>
				) : (
					<div className="gallery">
						{photos.map((photo) => (
							<figure key={photo.src}>
								<Image
									src={photo.src}
									alt={photo.alt}
									width={1200}
									height={800}
									sizes="(min-width: 900px) 45vw, 100vw"
								/>
								{photo.caption && <figcaption>{photo.caption}</figcaption>}
							</figure>
						))}
					</div>
				)}
			</main>
		</>
	);
}
