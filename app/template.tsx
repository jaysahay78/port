"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/content";

// Section order drives the swipe direction: moving further down the nav slides
// in from the right, moving back up slides in from the left.
const ORDER = ["/", ...nav.map((item) => item.href)];

type Direction = "none" | "forward" | "back";

function rank(pathname: string) {
	// Detail pages (/projects/foo) rank with their section.
	const index = ORDER.findIndex(
		(href) => href !== "/" && pathname.startsWith(href),
	);
	return index === -1 ? 0 : index;
}

// Client-only state, written from an effect so it never runs on the server.
// Module scope is what lets it survive the remount navigation triggers here.
let previous: string | null = null;
let hasMounted = false;

function initialDirection(pathname: string): Direction {
	// The server render and the hydrating client render must agree, and the
	// server has no idea where the visitor came from -- so the first paint is
	// always undirected. Only later client-side navigations get a swipe.
	if (!hasMounted || previous === null || previous === pathname) return "none";
	return rank(pathname) >= rank(previous) ? "forward" : "back";
}

export default function Template({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	// Frozen for the life of this mount, so a re-render can't flip the
	// direction mid-animation.
	const [direction] = useState<Direction>(() => initialDirection(pathname));

	useEffect(() => {
		hasMounted = true;
		previous = pathname;
	}, [pathname]);

	return <div className={`swipe swipe-${direction}`}>{children}</div>;
}
