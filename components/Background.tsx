/**
 * A fixed, non-interactive backdrop: a faint dot grid that drifts, under a
 * radial vignette that keeps the centre of the page readable.
 */
export function Background() {
	return <div className="backdrop" aria-hidden="true" />;
}
