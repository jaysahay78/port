export type IconName =
	| "github"
	| "twitter"
	| "linkedin"
	| "substack"
	| "resume";

const SIZE = 24;

/** Shared wrapper so every icon lines up and inherits the link's colour. */
function Frame({
	viewBox,
	size,
	children,
}: {
	viewBox: string;
	size: number;
	children: React.ReactNode;
}) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox={viewBox}
			width={size}
			height={size}
			aria-hidden="true"
			focusable="false"
			className="icon"
		>
			{children}
		</svg>
	);
}

export function Icon({ name, size = SIZE }: { name: IconName; size?: number }) {
	switch (name) {
		case "github":
			return (
				<Frame viewBox="0 0 256 256" size={size}>
					<path
						fill="currentColor"
						d="M208.31 75.68A59.78 59.78 0 0 0 202.93 28a8 8 0 0 0-6.93-4a59.75 59.75 0 0 0-48 24h-24a59.75 59.75 0 0 0-48-24a8 8 0 0 0-6.93 4a59.78 59.78 0 0 0-5.38 47.68A58.14 58.14 0 0 0 56 104v8a56.06 56.06 0 0 0 48.44 55.47A39.8 39.8 0 0 0 96 192v8H72a24 24 0 0 1-24-24a40 40 0 0 0-40-40a8 8 0 0 0 0 16a24 24 0 0 1 24 24a40 40 0 0 0 40 40h24v16a8 8 0 0 0 16 0v-40a24 24 0 0 1 48 0v40a8 8 0 0 0 16 0v-40a39.8 39.8 0 0 0-8.44-24.53A56.06 56.06 0 0 0 216 112v-8a58.14 58.14 0 0 0-7.69-28.32M200 112a40 40 0 0 1-40 40h-48a40 40 0 0 1-40-40v-8a41.74 41.74 0 0 1 6.9-22.48a8 8 0 0 0 1.1-7.69a43.8 43.8 0 0 1 .79-33.58a43.88 43.88 0 0 1 32.32 20.06a8 8 0 0 0 6.71 3.69h32.35a8 8 0 0 0 6.74-3.69a43.87 43.87 0 0 1 32.32-20.06a43.8 43.8 0 0 1 .77 33.58a8.09 8.09 0 0 0 1 7.65a41.7 41.7 0 0 1 7 22.52Z"
					/>
				</Frame>
			);
		case "twitter":
			return (
				<Frame viewBox="0 0 256 256" size={size}>
					<path
						fill="currentColor"
						d="m214.75 211.71l-62.6-98.38l61.77-67.95a8 8 0 0 0-11.84-10.76l-58.84 64.72l-40.49-63.63A8 8 0 0 0 96 32H48a8 8 0 0 0-6.75 12.3l62.6 98.37l-61.77 68a8 8 0 1 0 11.84 10.76l58.84-64.72l40.49 63.63A8 8 0 0 0 160 224h48a8 8 0 0 0 6.75-12.29M164.39 208L62.57 48h29l101.86 160Z"
					/>
				</Frame>
			);
		case "linkedin":
			// Redrawn as an outline on the 256 grid so it sits at the same weight
			// as the github/twitter glyphs instead of reading as a solid block.
			return (
				<Frame viewBox="0 0 256 256" size={size}>
					<g
						fill="none"
						stroke="currentColor"
						strokeWidth="16"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<rect x="32" y="32" width="192" height="192" rx="16" />
						<path d="M84 120v56" />
						<path d="M124 176v-56" />
						<path d="M124 148a24 24 0 0 1 48 0v28" />
					</g>
					<circle cx="84" cy="88" r="8" fill="currentColor" />
				</Frame>
			);
		case "substack":
			// Two rules over the notched panel, redrawn as strokes on the 256 grid.
			return (
				<Frame viewBox="0 0 256 256" size={size}>
					<g
						fill="none"
						stroke="currentColor"
						strokeWidth="16"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M40 48h176" />
						<path d="M40 96h176" />
						<path d="M40 144h176v80l-88-52l-88 52Z" />
					</g>
				</Frame>
			);
		case "resume":
			// Drawn to sit at the same optical weight as the 256-grid glyphs above:
			// a page with a folded corner and two text rules.
			return (
				<Frame viewBox="0 0 256 256" size={size}>
					<g
						fill="none"
						stroke="currentColor"
						strokeWidth="16"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M152 32H64a8 8 0 0 0-8 8v176a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8V80Z" />
						<path d="M152 32v48h48" />
						<path d="M96 140h64" />
						<path d="M96 176h64" />
					</g>
				</Frame>
			);
	}
}
