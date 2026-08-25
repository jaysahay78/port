"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { emitRipple } from "@/lib/ripple-bus";

/**
 * Three nested lines that sweep out on load and re-draw themselves on hover.
 * Each line rotates a different multiple of a half turn, so they separate and
 * recombine as the animation runs. Clicking it sends a ripple through the
 * background from its centre.
 */
export function Logo({ size = 120 }: { size?: number }) {
	const ref = useRef<SVGSVGElement>(null);
	const [spin, setSpin] = useState(0);

	/** Fire a background ripple from wherever the logo currently is. */
	const rippleFromCenter = useCallback(() => {
		const el = ref.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		if (!rect.width) return;
		emitRipple(rect.left + rect.width / 2, rect.top + rect.height / 2);
	}, []);

	// One ripple when the page is first landed on. After this the background
	// only reacts to the logo being clicked.
	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		// Slight delay so the canvas has sized itself and the ring starts from
		// the logo's settled position rather than its pre-layout one.
		const kickoff = setTimeout(rippleFromCenter, 400);
		return () => clearTimeout(kickoff);
	}, [rippleFromCenter]);

	const lines = [
		{ turns: 180, r: 110, color: "var(--blue)" },
		{ turns: 420, r: 74, color: "var(--purple)" },
		{ turns: 660, r: 38, color: "var(--pink)" },
	];

	return (
		<svg
			ref={ref}
			viewBox="0 0 300 300"
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			role="img"
			aria-label="animated logo"
			style={{ cursor: "pointer", overflow: "visible" }}
			onMouseEnter={() => setSpin((n) => n + 1)}
			onPointerDown={rippleFromCenter}
		>
			{lines.map((line, i) => (
				<line
					// remounting on hover restarts the draw animation from zero
					key={`${i}-${spin}`}
					x1={150 - line.r}
					y1={150}
					x2={150 + line.r}
					y2={150}
					stroke={line.color}
					strokeWidth={14}
					strokeLinecap="round"
					style={{
						transformOrigin: "150px 150px",
						animation: `logo-sweep-${line.turns} 2.4s cubic-bezier(0.55, 0.06, 0.36, 1) forwards`,
					}}
				/>
			))}
			<style>{`
				@keyframes logo-sweep-180 {
					0% { transform: rotate(0deg) scaleX(0); }
					25% { transform: rotate(0deg) scaleX(1); }
					100% { transform: rotate(180deg) scaleX(1); }
				}
				@keyframes logo-sweep-420 {
					0% { transform: rotate(0deg) scaleX(0); }
					25% { transform: rotate(0deg) scaleX(1); }
					100% { transform: rotate(420deg) scaleX(1); }
				}
				@keyframes logo-sweep-660 {
					0% { transform: rotate(0deg) scaleX(0); }
					25% { transform: rotate(0deg) scaleX(1); }
					100% { transform: rotate(660deg) scaleX(1); }
				}
			`}</style>
		</svg>
	);
}
