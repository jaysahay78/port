"use client";

import { useEffect, useRef } from "react";

/**
 * A static field of tiny terminal-ish marks scattered across the viewport.
 * Drawn once per layout (and again on resize) -- there's no animation loop and
 * no pointer tracking, so it costs nothing after the first paint.
 */

// One mark per this many square pixels of viewport.
const AREA_PER_MARK = 670;

// Shapes are drawn from this table by weight. Sizes are in CSS pixels.
const SHAPES = [
	{ kind: "dash", weight: 70 },
	{ kind: "dot", weight: 12 },
	{ kind: "tick", weight: 9 },
	{ kind: "plus", weight: 9 },
] as const;

const TOTAL_WEIGHT = SHAPES.reduce((sum, s) => sum + s.weight, 0);

// Muted blue-greys, weighted toward the dimmest so the field stays background.
const COLORS = [
	{ rgb: "79, 86, 99", weight: 46 }, // --txt-3
	{ rgb: "109, 121, 146", weight: 38 },
	{ rgb: "124, 135, 156", weight: 12 }, // --txt-2
	{ rgb: "182, 188, 201", weight: 4 },
];

const TOTAL_COLOR_WEIGHT = COLORS.reduce((sum, c) => sum + c.weight, 0);

function pickWeighted<T extends { weight: number }>(items: readonly T[], total: number): T {
	let r = Math.random() * total;
	for (const item of items) {
		r -= item.weight;
		if (r <= 0) return item;
	}
	return items[items.length - 1];
}

export function GlyphField() {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		function draw() {
			const width = window.innerWidth;
			const height = window.innerHeight;
			const dpr = window.devicePixelRatio || 1;

			canvas!.width = Math.floor(width * dpr);
			canvas!.height = Math.floor(height * dpr);
			ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx!.clearRect(0, 0, width, height);

			const count = Math.round((width * height) / AREA_PER_MARK);

			// Snap to whole device pixels. On fractional-DPR displays an unsnapped
			// 4x2 rect gets antialiased into a soft 6x4 smudge; these marks are
			// only a few pixels across, so that blur is the whole shape.
			const snap = (v: number) => Math.round(v * dpr) / dpr;

			for (let i = 0; i < count; i++) {
				const x = snap(Math.random() * width);
				const y = snap(Math.random() * height);
				const color = pickWeighted(COLORS, TOTAL_COLOR_WEIGHT);

				// Most marks sit in a narrow dim band so the field reads as texture
				// rather than content; roughly one in sixteen burns brighter to keep
				// it from looking like flat noise.
				const alpha =
					Math.random() < 0.06
						? 0.4 + Math.random() * 0.45
						: 0.18 + Math.random() * 0.16;
				ctx!.fillStyle = `rgba(${color.rgb}, ${alpha.toFixed(3)})`;

				const w = (n: number) => snap(n);

				switch (pickWeighted(SHAPES, TOTAL_WEIGHT).kind) {
					case "dash":
						ctx!.fillRect(x, y, w(4), w(2));
						break;
					case "dot":
						ctx!.fillRect(x, y, w(2), w(2));
						break;
					case "tick":
						ctx!.fillRect(x, y, w(3), w(2));
						break;
					case "plus":
						// 6x5 cross: horizontal bar through the middle, vertical stem
						ctx!.fillRect(x, y + w(2), w(6), w(1));
						ctx!.fillRect(x + w(2), y, w(2), w(5));
						break;
				}
			}
		}

		draw();

		// Only redraw when the viewport actually changes size -- mobile browsers
		// fire resize on scroll as the URL bar collapses, which would reshuffle
		// the whole field underfoot.
		let lastWidth = window.innerWidth;
		let lastHeight = window.innerHeight;
		let timer: ReturnType<typeof setTimeout>;

		function onResize() {
			if (window.innerWidth === lastWidth && window.innerHeight === lastHeight) return;
			lastWidth = window.innerWidth;
			lastHeight = window.innerHeight;
			clearTimeout(timer);
			timer = setTimeout(draw, 150);
		}

		window.addEventListener("resize", onResize);
		return () => {
			window.removeEventListener("resize", onResize);
			clearTimeout(timer);
		};
	}, []);

	return <canvas ref={ref} className="glyph-field" aria-hidden="true" />;
}
