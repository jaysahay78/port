"use client";

import { useEffect, useRef } from "react";
import { setRippleEmitter } from "@/lib/ripple-bus";

/**
 * A field of tiny terminal-ish marks that ripples. The marks themselves are
 * fixed in place -- a ripple is a wave of *brightness* travelling outward
 * through them, which is what gives the effect its character.
 *
 * Measured against the reference field: ~1 mark per 670px^2, mostly 4x2
 * dashes, resting alpha clustered low with a sparse bright tail.
 */

const AREA_PER_MARK = 670;

const SHAPES = [
	{ kind: "dash", weight: 70 },
	{ kind: "dot", weight: 12 },
	{ kind: "tick", weight: 9 },
	{ kind: "plus", weight: 9 },
] as const;

const SHAPE_WEIGHT = SHAPES.reduce((n, s) => n + s.weight, 0);

// Resting colour of a mark, and the colour it approaches when a wave lights it.
const DIM = [109, 121, 146] as const;
const LIT = [198, 205, 224] as const;

// --- ripple shape ---------------------------------------------------------
const RIPPLE_SPEED = 700; // px per second the ring travels
const RIPPLE_THICKNESS = 115; // px; how broad the bright band is
const RIPPLE_LIFETIME = 3.2; // seconds before a ripple is dropped
// Tuned so the wavefront still reads once it reaches the screen edge: at 700px/s
// a ring hits 1280px at t=1.83s, where this decay leaves ~0.32 of the gain.
const RIPPLE_DECAY = 0.45;
const RIPPLE_GAIN = 0.72; // how much alpha a ring adds at full strength
const MAX_RIPPLES = 14;

// Cursor movement spawns ripples, throttled so a sweep doesn't flood the list.
const CURSOR_MIN_GAP_MS = 110;
const CURSOR_MIN_DIST = 46;

type Mark = { x: number; y: number; kind: string; base: number };
type Ripple = { x: number; y: number; born: number };

function pickShape() {
	let r = Math.random() * SHAPE_WEIGHT;
	for (const s of SHAPES) {
		r -= s.weight;
		if (r <= 0) return s.kind;
	}
	return "dash";
}

export function GlyphRipple() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		let marks: Mark[] = [];
		let ripples: Ripple[] = [];
		let width = 0;
		let height = 0;
		let dpr = 1;

		function build() {
			width = window.innerWidth;
			height = window.innerHeight;
			dpr = window.devicePixelRatio || 1;

			canvas!.width = Math.floor(width * dpr);
			canvas!.height = Math.floor(height * dpr);
			ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

			const snap = (v: number) => Math.round(v * dpr) / dpr;
			const count = Math.round((width * height) / AREA_PER_MARK);

			marks = new Array(count);
			for (let i = 0; i < count; i++) {
				marks[i] = {
					x: snap(Math.random() * width),
					y: snap(Math.random() * height),
					kind: pickShape(),
					// Resting alpha: a narrow dim band, with the occasional brighter one.
					base:
						Math.random() < 0.06
							? 0.4 + Math.random() * 0.45
							: 0.18 + Math.random() * 0.16,
				};
			}
		}

		function drawMark(m: Mark, alpha: number, lit: number) {
			// Blend toward the lighter tone as the wave takes hold.
			const r = Math.round(DIM[0] + (LIT[0] - DIM[0]) * lit);
			const g = Math.round(DIM[1] + (LIT[1] - DIM[1]) * lit);
			const b = Math.round(DIM[2] + (LIT[2] - DIM[2]) * lit);
			ctx!.fillStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`;

			const s = (n: number) => Math.round(n * dpr) / dpr;
			switch (m.kind) {
				case "dash":
					ctx!.fillRect(m.x, m.y, s(4), s(2));
					break;
				case "dot":
					ctx!.fillRect(m.x, m.y, s(2), s(2));
					break;
				case "tick":
					ctx!.fillRect(m.x, m.y, s(3), s(2));
					break;
				default:
					ctx!.fillRect(m.x, m.y + s(2), s(6), s(1));
					ctx!.fillRect(m.x + s(2), m.y, s(2), s(5));
			}
		}

		function render(nowMs: number) {
			ctx!.clearRect(0, 0, width, height);

			const now = nowMs / 1000;
			if (ripples.length) {
				ripples = ripples.filter((r) => now - r.born < RIPPLE_LIFETIME);
			}

			for (let i = 0; i < marks.length; i++) {
				const m = marks[i];
				let boost = 0;

				for (let j = 0; j < ripples.length; j++) {
					const rp = ripples[j];
					const t = now - rp.born;
					if (t <= 0) continue;
					const waveR = RIPPLE_SPEED * t;
					const d = Math.hypot(m.x - rp.x, m.y - rp.y);
					const off = (d - waveR) / RIPPLE_THICKNESS;
					if (off < -3 || off > 3) continue; // outside the band entirely
					const ring = Math.exp(-off * off);
					boost += ring * Math.exp(-RIPPLE_DECAY * t) * RIPPLE_GAIN;
				}

				if (boost <= 0.002) {
					drawMark(m, m.base, 0);
				} else {
					const lit = Math.min(1, boost / RIPPLE_GAIN);
					drawMark(m, Math.min(0.92, m.base + boost), lit);
				}
			}
		}

		function addRipple(clientX: number, clientY: number) {
			if (reduced) return;
			if (ripples.length >= MAX_RIPPLES) ripples.shift();
			ripples.push({ x: clientX, y: clientY, born: performance.now() / 1000 });
		}

		build();

		// The logo drives ripples through the shared bus.
		setRippleEmitter(addRipple);

		let raf = 0;
		if (reduced) {
			render(performance.now());
		} else {
			const loop = (t: number) => {
				render(t);
				raf = requestAnimationFrame(loop);
			};
			raf = requestAnimationFrame(loop);
		}

		// Cursor leaves a wake of ripples, throttled by time and distance.
		let lastAt = 0;
		let lastX = 0;
		let lastY = 0;
		function onPointerMove(e: PointerEvent) {
			const now = performance.now();
			if (now - lastAt < CURSOR_MIN_GAP_MS) return;
			if (Math.hypot(e.clientX - lastX, e.clientY - lastY) < CURSOR_MIN_DIST) return;
			lastAt = now;
			lastX = e.clientX;
			lastY = e.clientY;
			addRipple(e.clientX, e.clientY);
		}
		window.addEventListener("pointermove", onPointerMove, { passive: true });

		// Rebuild only on a real viewport change -- mobile fires resize on scroll
		// as the URL bar collapses, which would reshuffle the field underfoot.
		let lastW = window.innerWidth;
		let lastH = window.innerHeight;
		let lastDpr = window.devicePixelRatio || 1;
		let timer: ReturnType<typeof setTimeout>;
		function onResize() {
			const nextDpr = window.devicePixelRatio || 1;
			// DPR is part of the check: dragging the window to a monitor with a
			// different pixel ratio changes it without changing the CSS size.
			if (
				window.innerWidth === lastW &&
				window.innerHeight === lastH &&
				nextDpr === lastDpr
			) {
				return;
			}
			lastW = window.innerWidth;
			lastH = window.innerHeight;
			lastDpr = nextDpr;
			clearTimeout(timer);
			timer = setTimeout(() => {
				build();
				if (reduced) render(performance.now());
			}, 150);
		}
		window.addEventListener("resize", onResize);

		return () => {
			setRippleEmitter(null);
			window.removeEventListener("pointermove", onPointerMove);
			window.removeEventListener("resize", onResize);
			clearTimeout(timer);
			if (raf) cancelAnimationFrame(raf);
		};
	}, []);

	return <canvas ref={canvasRef} className="glyph-ripple" aria-hidden="true" />;
}
