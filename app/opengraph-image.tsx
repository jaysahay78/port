import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt = `${site.name} — developer portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time, so the card stays in sync with lib/content.ts.
 * Uses system fonts rather than the site's webfonts -- loading those would mean
 * shipping .ttf files just for this image.
 */
export default function Image() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					background: "#121416",
					padding: "80px",
				}}
			>
				{/* the three marks from the site's logo */}
				<div style={{ display: "flex", marginBottom: "56px" }}>
					<div
						style={{
							width: "200px",
							height: "16px",
							borderRadius: "8px",
							background: "#26bbd9",
							marginRight: "20px",
						}}
					/>
					<div
						style={{
							width: "128px",
							height: "16px",
							borderRadius: "8px",
							background: "#6363ee",
							marginRight: "20px",
						}}
					/>
					<div
						style={{
							width: "64px",
							height: "16px",
							borderRadius: "8px",
							background: "#bd63ee",
						}}
					/>
				</div>

				<div
					style={{
						display: "flex",
						fontSize: "104px",
						color: "#dae2f1",
						letterSpacing: "-0.02em",
					}}
				>
					{site.handle}
				</div>

				<div
					style={{
						display: "flex",
						marginTop: "28px",
						fontSize: "38px",
						color: "#7c879c",
						lineHeight: 1.4,
						maxWidth: "900px",
					}}
				>
					{site.tagline}
				</div>
			</div>
		),
		size,
	);
}
