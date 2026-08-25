"use client";

import { useEffect, useRef } from "react";
import PixelBlast, { type PixelBlastHandle } from "@/components/PixelBlast";
import { setRippleEmitter } from "@/lib/ripple-bus";

/**
 * The fixed background layer. Registers its ripple emitter on the shared bus so
 * the sphere can originate ripples from its own position.
 */
export function PixelBackground() {
	const ref = useRef<PixelBlastHandle>(null);

	useEffect(() => {
		setRippleEmitter((x, y) => ref.current?.rippleAt(x, y));
		return () => setRippleEmitter(null);
	}, []);

	return (
		<div className="pixel-bg">
			<PixelBlast
				ref={ref}
				variant="diamond"
				pixelSize={2}
				color="#B497CF"
				patternScale={3.5}
				patternDensity={0.9}
				enableRipples
				rippleSpeed={1}
				rippleThickness={0.06}
				rippleIntensityScale={9}
				speed={0.5}
				transparent
				edgeFade={0.2}
			/>
		</div>
	);
}
