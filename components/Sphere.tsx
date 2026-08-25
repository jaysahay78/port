"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { emitRipple } from "@/lib/ripple-bus";

// How far the sphere leans toward the cursor, in pixels.
const MAX_LEAN = 10;
// How far the specular highlight travels across the surface, in percent.
const MAX_HIGHLIGHT_SHIFT = 14;
// Gap between the ripples the sphere gives off on its own.
const IDLE_RIPPLE_MS = 1800;

export function Sphere({ size = 120 }: { size?: number }) {
	const ref = useRef<HTMLDivElement>(null);
	const [pressed, setPressed] = useState(false);

	/** Fire a ripple from wherever the sphere currently is. */
	const rippleFromCenter = useCallback(() => {
		const el = ref.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		if (!rect.width) return;
		emitRipple(rect.left + rect.width / 2, rect.top + rect.height / 2);
	}, []);

	// Lean and light the sphere according to where the cursor is. The listener
	// is on the window because the landing page sets pointer-events: none, so
	// the sphere never sees most of the movement itself.
	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (reduced) return;

		let frame = 0;

		function onPointerMove(e: PointerEvent) {
			if (frame) return;
			frame = requestAnimationFrame(() => {
				frame = 0;
				const node = ref.current;
				if (!node) return;
				const rect = node.getBoundingClientRect();
				const cx = rect.left + rect.width / 2;
				const cy = rect.top + rect.height / 2;

				// Normalize by viewport size so the lean saturates smoothly rather
				// than snapping once the cursor leaves the sphere.
				const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)));
				const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)));

				node.style.setProperty("--lean-x", `${(dx * MAX_LEAN).toFixed(2)}px`);
				node.style.setProperty("--lean-y", `${(dy * MAX_LEAN).toFixed(2)}px`);
				node.style.setProperty("--hx", `${(32 + dx * MAX_HIGHLIGHT_SHIFT).toFixed(2)}%`);
				node.style.setProperty("--hy", `${(30 + dy * MAX_HIGHLIGHT_SHIFT).toFixed(2)}%`);
			});
		}

		window.addEventListener("pointermove", onPointerMove, { passive: true });
		return () => {
			window.removeEventListener("pointermove", onPointerMove);
			if (frame) cancelAnimationFrame(frame);
		};
	}, []);

	// A slow heartbeat of ripples so the background stays alive without input.
	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const id = setInterval(() => {
			if (!document.hidden) rippleFromCenter();
		}, IDLE_RIPPLE_MS);

		// One on mount so the first ring doesn't wait out the full interval.
		const kickoff = setTimeout(rippleFromCenter, 400);

		return () => {
			clearInterval(id);
			clearTimeout(kickoff);
		};
	}, [rippleFromCenter]);

	return (
		<div
			ref={ref}
			className={`sphere${pressed ? " is-pressed" : ""}`}
			style={{ width: size, height: size }}
			role="button"
			tabIndex={0}
			aria-label="emit a ripple"
			onPointerDown={() => {
				setPressed(true);
				rippleFromCenter();
			}}
			onPointerUp={() => setPressed(false)}
			onPointerLeave={() => setPressed(false)}
			onPointerEnter={rippleFromCenter}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					rippleFromCenter();
				}
			}}
		>
			<span className="sphere-glow" aria-hidden="true" />
			<span className="sphere-body" aria-hidden="true" />
		</div>
	);
}
