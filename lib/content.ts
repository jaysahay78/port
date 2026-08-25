import type { IconName } from "@/components/Icons";

// ---------------------------------------------------------------------------
// Everything you'd want to edit lives in this file. Change the values below
// and the whole site updates -- no component edits needed.
// ---------------------------------------------------------------------------

export const site = {
	handle: "jay sahay",
	name: "Jay Sahay",
	tagline:
		"hey there! i'm Jay. I like to build, learn and be curious about software.",
	// Used for <meta name="description"> and the Open Graph card. Social
	// crawlers (LinkedIn in particular) want at least 100 characters.
	description:
		"Portfolio of Jay Sahay, a backend-leaning developer building Spring Boot services, REST APIs, load balancers and developer tools, with writing on Java and Go concurrency.",
	// Must be the real deployed origin: metadataBase resolves the og:image URL
	// against it, so a placeholder here silently breaks link previews.
	url: "https://jaysahayportfolio.vercel.app",
};

export const nav = [
	{ href: "/about", label: "about" },
	{ href: "/projects", label: "projects" },
	{ href: "/blog", label: "blog" },
	{ href: "/contact", label: "contact" },
];

export const about = {
	intro: [
		"Hi, I’m Jay Sahay, a software engineer who likes to build stuff.",
		"I’ve always enjoyed taking on problems that don’t have an obvious answer, getting a little too deep into how things work and turning ideas into something real. I like building, experimenting, breaking things and occasionally figuring out why I broke them.",
		"I’m still looking forward to what I want to build next and learn somethig new on the way.",
	],
	// -> "links": where to find you
	links: [
		{ label: "github", href: "https://github.com/jaysahay78", icon: "github" },
		{ label: "twitter", href: "https://x.com/jayraiya92", icon: "twitter" },
		{
			label: "linkedin",
			href: "https://www.linkedin.com/in/jaysahay/",
			icon: "linkedin",
		},
		{
			label: "substack",
			href: "https://substack.com/@voluptatibusasper467509",
			icon: "substack",
		},
		{
			label: "resume",
			href: "/resume.pdf",
			icon: "resume",
			download: "Jay-Sahay-Resume.pdf",
		},
	] satisfies {
		label: string;
		href: string;
		icon: IconName;
		download?: string;
	}[],
	// -> "education"
	education: [
		{
			degree: "B.E Electronics and Telecommunications",
			school: "Ramaiah Institute of Technology",
			year: "2026",
		},
	],
	// -> "tech": taken from the skills & technology stack in the resume
	tech: [
		{
			group: "languages",
			items: [
				"java",
				"go",
				"python",
				"sql",
				"javascript",
				"typescript",
				"html/css",
			],
		},
		{ group: "frameworks", items: ["spring", "spring boot", "react", "next.js"] },
		{ group: "databases", items: ["mysql", "mongodb (nosql)"] },
		{
			group: "developer tools",
			items: [
				"github",
				"docker",
				"redux",
				"tailwind css",
				"vs code",
				"intellij idea",
			],
		},
		{
			group: "core cs",
			items: [
				"data structures & algorithms",
				"object-oriented programming",
				"dbms",
				"os",
				"computer networks",
			],
		},
	],
};

export type Project = {
	slug: string;
	name: string;
	blurb: string;
	year: string;
	tags: string[];
	links?: { label: string; href: string }[];
	body: string[];
};

export const projects: Project[] = [
	{
		slug: "fish-tracker",
		name: "underwater fish detection & tracking",
		blurb: "finding, following and classifying fish in underwater video",
		year: "2026",
		tags: ["python", "yolov8", "opencv", "arduino"],
		links: [
			{
				label: "github",
				href: "https://github.com/jaysahay78/YOLOv8-Fish-Tracker",
			},
		],
		body: [
			"a pipeline that finds fish in underwater footage, follows them from frame to frame, and labels what they are. detection and tracking live in separate modules, so the yolov8 detector can be swapped or retrained without touching the tracking logic.",
			"the trained weights cover both cases: a single-class detector that only answers whether something is a fish, and a multi-class model that identifies species, built against the deepfish and fish4knowledge datasets. processed frames get stitched back into video for review, and an arduino ph sketch sits alongside for logging water conditions during capture.",
		],
	},
	{
		slug: "pokedex-in-go",
		name: "pokedex cli",
		blurb: "an interactive command-line pokedex written in go",
		year: "2026",
		tags: ["go", "cli", "pokeapi"],
		links: [
			{ label: "github", href: "https://github.com/jaysahay78/pokedex-in-go" },
			{
				label: "write-up",
				href: "https://voluptatibusasper467509.substack.com/p/building-a-pokedex-in-go-what-the",
			},
		],
		body: [
			"a small interactive pokedex that runs in the terminal, built on pokeapi. you page through location areas twenty at a time, step back and forth through the list, and explore what can be encountered in any given area.",
			"catching is a coin flip weighted by the pokemon's base experience -- the rarer it is, the more throws it takes. anything caught goes into a session pokedex you can list and inspect, and api responses are cached in memory so repeated lookups never hit the network twice. i wrote up what building it taught me that the docs hadn't.",
		],
	},
	{
		slug: "load-balancer",
		name: "load balancer",
		blurb: "an l4/l7 load balancer built from raw java sockets",
		year: "2025",
		tags: ["java", "docker", "prometheus", "grafana"],
		links: [
			{ label: "github", href: "https://github.com/jaysahay78/Load-Balancer" },
		],
		body: [
			"a custom l4/l7 load balancer written with java socket programming. round-robin, weighted round-robin, least-connections and consistent-hashing all sit behind a common interface, so the balancing strategy can be swapped without touching the rest of the server.",
			"a token bucket rate limiter handles per-client throttling. i tested throughput, latency and fairness trade-offs under simulated load, exporting prometheus metrics and reading them back through a grafana dashboard.",
		],
	},
	{
		slug: "blogging-platform",
		name: "full-stack blogging platform",
		blurb: "a spring boot backend with real-time chat and payments",
		year: "2025",
		tags: ["spring boot", "java", "mysql", "docker", "aws", "next.js"],
		links: [{ label: "github", href: "https://github.com/jaysahay78/BloggApp" }],
		body: [
			"a scalable spring boot backend built around restful apis, jwt authentication and mysql, containerised with docker and deployed on aws elastic beanstalk with rds.",
			"real-time chat runs over spring websocket, with typing indicators, read receipts and online presence tracking. the next.js frontend adds stripe payments, ai content suggestions and some 3d interface pieces built with spline.",
		],
	},
	{
		slug: "real-estate-tokenization",
		name: "real estate tokenization platform",
		blurb: "fractional property ownership on-chain, with ml price prediction",
		year: "2024",
		tags: ["solidity", "javascript", "react", "mongodb", "python"],
		links: [
			{
				label: "github",
				href: "https://github.com/jaysahay78/Real-Estate-Tokenization",
			},
		],
		body: [
			"a web3 application for fractional real estate ownership, co-developed over a month. solidity smart contracts handle secure asset management and transaction logging, with metamask authentication on the front door.",
			"python regression models predict prices and roi trends, so investors get a clearer read on a listing than the raw numbers give up on their own.",
		],
	},
];

export type Post = {
	slug: string;
	title: string;
	blurb: string;
	date: string; // YYYY-MM-DD
	/** Set for posts hosted elsewhere -- the list links straight out to them. */
	url?: string;
	/** Set for posts written here, rendered at /blog/<slug>. */
	body?: string[];
};

export const posts: Post[] = [
	{
		slug: "java-virtual-threads-vs-goroutines",
		title: "java virtual threads vs golang's goroutines: a deep dive",
		blurb:
			"how similar (or different) java's virtual threads really are to goroutines",
		date: "2026-07-28",
		url: "https://voluptatibusasper467509.substack.com/p/java-virtual-threads-vs-golangs-goroutines",
	},
	{
		slug: "the-hashmap-myth",
		title: "the hashmap myth everyone still believes",
		blurb: "why o(1) isn't the whole truth, and how java handles the rest",
		date: "2026-05-18",
		url: "https://voluptatibusasper467509.substack.com/p/the-hashmap-myth-everyone-still-believes",
	},
	{
		slug: "pokedex-in-go",
		title: "building a pokédex in go: what the code taught me that the docs didn't",
		blurb: "what syntax guides didn't cover but a cli project did",
		date: "2026-05-13",
		url: "https://voluptatibusasper467509.substack.com/p/building-a-pokedex-in-go-what-the",
	},
];

export type Photo = {
	src: string;
	alt: string;
	caption?: string;
};

// Drop images into /public/photos and reference them here.
export const photos: Photo[] = [];

export const contact = {
	blurb:
		"the best way to reach me is email. i read everything, and i reply to most of it.",
	email: "jaysahay78@gmail.com",
	links: [
		{ label: "github", href: "https://github.com/jaysahay78", icon: "github" },
		{ label: "twitter", href: "https://x.com/jayraiya92", icon: "twitter" },
		{
			label: "linkedin",
			href: "https://www.linkedin.com/in/jaysahay/",
			icon: "linkedin",
		},
		{
			label: "resume",
			href: "/resume.pdf",
			icon: "resume",
			download: "Jay-Sahay-Resume.pdf",
		},
	] satisfies {
		label: string;
		href: string;
		icon: IconName;
		download?: string;
	}[],
};
