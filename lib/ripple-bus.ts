/**
 * A tiny module-level channel so the sphere (which lives inside the page
 * content) can drive ripples in the PixelBlast canvas (which lives in the fixed
 * background layer) without threading a ref through the server-rendered page.
 */

type Emitter = (clientX: number, clientY: number) => void;

let emitter: Emitter | null = null;

export function setRippleEmitter(fn: Emitter | null) {
	emitter = fn;
}

export function emitRipple(clientX: number, clientY: number) {
	emitter?.(clientX, clientY);
}
