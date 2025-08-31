"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, cubicBezier, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Github, Package2, Rocket, Code, Globe, Zap, Sparkles, CheckCircle2, Star, Play } from "lucide-react";
import { useRef, useState, useEffect } from "react";

// Reuse your existing UI exports from the monorepo
import { Card } from "@repo/ui/components/ui.custom/card";
import { Gradient } from "@repo/ui/components/ui.custom/gradient";
import { TurborepoLogo } from "@repo/ui/components/ui.custom/turborepo-logo";
import { cn } from "@repo/ui/lib/utils";

const LINKS = [
	{
		title: "Docs",
		href: "https://turborepo.com/docs",
		description: "Find in-depth information about Turborepo features and API.",
	},
	{
		title: "Learn",
		href: "https://turborepo.com/docs/handbook",
		description: "Learn more about monorepos with our handbook.",
	},
	{
		title: "Templates",
		href: "https://turborepo.com/docs/getting-started/from-example",
		description: "Choose from over 15 examples and deploy with a single click.",
	},
	{
		title: "Deploy",
		href: "https://vercel.com/new",
		description: "Instantly deploy your Turborepo to a shareable URL with Vercel.",
	},
];

const fadeUp = {
	hidden: { opacity: 0, y: 24 },
	show: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.9,
			delay: 0.15 * i,
			ease: cubicBezier(0.25, 0.8, 0.25, 1),
		},
	}),
};

const fadeScale = {
	hidden: { opacity: 0, scale: 0.9 },
	show: (i: number) => ({
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.7,
			delay: 0.1 * i,
			ease: cubicBezier(0.25, 0.8, 0.25, 1),
		},
	}),
};

function Badge({ children }: { children: React.ReactNode }) {
	return (
		<span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70">
			{children}
		</span>
	);
}

// New component for floating elements
function FloatingElements() {
	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			{[...Array(6)].map((_, i) => (
				<motion.div
					key={i}
					className="absolute rounded-full bg-white/5 backdrop-blur-md"
					style={{
						width: Math.random() * 60 + 40,
						height: Math.random() * 60 + 40,
						left: `${Math.random() * 100}%`,
						top: `${Math.random() * 100}%`,
					}}
					animate={{
						x: [0, Math.random() * 100 - 50, 0],
						y: [0, Math.random() * 100 - 50, 0],
						opacity: [0.2, 0.5, 0.2],
					}}
					transition={{
						duration: Math.random() * 15 + 15,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
			))}
		</div>
	);
}

// Enhanced particle system for background - reduced scale
function ParticleSystem() {
	const particles = Array.from({ length: 20 }, (_, i) => ({
		id: i,
		x: Math.random() * 100,
		y: Math.random() * 100,
		size: Math.random() * 4 + 2,
		duration: Math.random() * 20 + 10,
	}));

	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			{particles.map((particle) => (
				<motion.div
					key={particle.id}
					className="absolute rounded-full bg-gradient-to-r from-indigo-400/20 to-purple-400/20"
					style={{
						width: particle.size,
						height: particle.size,
						left: `${particle.x}%`,
						top: `${particle.y}%`,
					}}
					animate={{
						y: [0, -100, 0],
						opacity: [0, 1, 0],
					}}
					transition={{
						duration: particle.duration,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
			))}
		</div>
	);
}

// New component for cursor spotlight effect
function Spotlight() {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const updateMousePosition = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener("mousemove", updateMousePosition);
		return () => window.removeEventListener("mousemove", updateMousePosition);
	}, []);

	return (
		<div
			className="pointer-events-none absolute inset-0 z-0 opacity-40"
			style={{
				background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`,
			}}
		/>
	);
}

// Enhanced spotlight with ripple effect - removed scale
function EnhancedSpotlight() {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	
	useEffect(() => {
		const updateMousePosition = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};
		
		window.addEventListener("mousemove", updateMousePosition);
		return () => window.removeEventListener("mousemove", updateMousePosition);
	}, []);
	
	return (
		<>
			<div
				className="pointer-events-none absolute inset-0 z-0 opacity-30"
				style={{
					background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.1), transparent 50%)`,
				}}
			/>
			<motion.div
				className="pointer-events-none absolute z-0"
				style={{
					left: mousePosition.x - 50,
					top: mousePosition.y - 50,
					width: 100,
					height: 100,
				}}
				animate={{
					opacity: [0.2, 0.4, 0.2],
				}}
				transition={{
					duration: 2,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			>
				<div className="w-full h-full rounded-full border border-indigo-400/30" />
			</motion.div>
		</>
	);
}

export default function Page() {
	const targetRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["start start", "end start"],
	});

	const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
	const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
	const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

	const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
	const stackRef = useRef(null);
	const workflowRef = useRef(null);
	const stackInView = useInView(stackRef, { once: false, amount: 0.3 });
	const workflowInView = useInView(workflowRef, { once: false, amount: 0.3 });

	return (
		<main
			ref={targetRef}
			className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden bg-[#0a0a0a] text-white"
		>
			{/* ENHANCED BACKDROP WITH MULTIPLE LAYERS */}
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(99,102,241,0.15),transparent)]" />
				<Gradient className="absolute left-1/2 top-[-380px] h-[1100px] w-[1100px] -translate-x-1/2 opacity-[0.15]" conic />
				<ParticleSystem />
				<EnhancedSpotlight />
			</div>

			{/* HEADER WITH ADVANCED ANIMATIONS - removed scale */}
			<motion.header
				className="z-10 w-full max-w-6xl px-6 pt-8"
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.7 }}
			>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="relative grid place-items-center">
							<motion.div
								className="absolute -inset-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur"
								animate={{
									rotate: [0, 180, 360],
								}}
								transition={{
									duration: 6,
									repeat: Infinity,
									ease: "easeInOut",
								}}
							/>
							<div className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
								<motion.div
									animate={{
										rotate: 360,
									}}
									transition={{
										duration: 20,
										repeat: Infinity,
										ease: "linear",
									}}
								>
									<TurborepoLogo />
								</motion.div>
							</div>
						</div>
						<motion.div
							className="hidden text-sm text-white/60 sm:block"
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.3 }}
						>
							Next.js + Tailwind v4 + shadcn/ui + Turborepo
						</motion.div>
					</div>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4 }}
						whileHover={{
							boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
						}}
					>
						<Link
							className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70 hover:bg-white/[0.06] backdrop-blur-sm"
							href="https://github.com/vercel/turbo"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Github className="h-3.5 w-3.5" />
							View on GitHub
						</Link>
					</motion.div>
				</div>
			</motion.header>

			{/* HERO SLIDE WITH ADVANCED PARALLAX AND EFFECTS - removed scale */}
			<section className="relative z-10 w-full max-w-6xl px-6 pb-12 pt-12 md:pt-20">
				<motion.div
					className="relative grid place-items-center"
					style={{ y: smoothY, opacity, scale }}
				>
					<motion.div
						className="absolute h-[540px] w-[540px] opacity-80"
						animate={{
							rotate: 360,
						}}
						transition={{
							duration: 120,
							repeat: Infinity,
							ease: "linear",
						}}
					>
						<Image
							alt="Turborepo circles"
							src="/circles.svg"
							width={540}
							height={540}
						/>
					</motion.div>

					<motion.div
						className="absolute z-0 flex h-48 w-48 items-center justify-center"
						animate={{
							rotate: [0, 180, 360],
							opacity: [0.8, 1, 0.8],
						}}
						transition={{
							duration: 12,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					>
						<Gradient className="h-[120px] w-[120px] opacity-80" conic small />
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.9 }}
						className="relative z-10"
						whileHover={{
							rotate: [0, 10, -10, 0],
							transition: { duration: 0.6 },
						}}
					>
						<TurborepoLogo />
					</motion.div>
				</motion.div>

				<div className="relative z-10 mt-10 flex flex-col items-center text-center">
					<motion.div
						custom={0}
						variants={fadeUp}
						initial="hidden"
						animate="show"
						whileHover={{
							boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)",
						}}
					>
						<Badge>
							<Rocket className="h-3.5 w-3.5" />
							Turbo Monorepo Starter
						</Badge>
					</motion.div>
					<motion.h1
						custom={1}
						variants={fadeUp}
						initial="hidden"
						animate="show"
						className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-tight text-white sm:text-6xl"
					>
						<span className="inline-block">Ship faster with a</span>{" "}
						<motion.span
							className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300"
							animate={{
								backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
							}}
							transition={{
								duration: 5,
								repeat: Infinity,
								ease: "easeInOut",
							}}
							style={{
								backgroundSize: "200% 200%",
							}}
						>
							beautifully wired
						</motion.span>{" "}
						<span className="inline-block">monorepo</span>
					</motion.h1>
					<motion.p
						custom={2}
						variants={fadeUp}
						initial="hidden"
						animate="show"
						className="mt-4 max-w-2xl text-pretty text-base text-white/60 sm:text-lg"
					>
						Opinionated setup featuring Next.js 15, Tailwind CSS v4, shadcn/ui
						components, and Turborepo tasks that actually cache.
					</motion.p>

					<motion.div
						custom={3}
						variants={fadeUp}
						initial="hidden"
						animate="show"
						className="mt-6 flex flex-wrap items-center justify-center gap-3"
					>
						<motion.div
							whileHover={{ y: -2 }}
							whileTap={{ y: 0 }}
							className="relative"
						>
							<Link
								href="https://turborepo.com/docs"
								target="_blank"
								className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm hover:bg-white/[0.1] backdrop-blur-sm"
							>
								<Play className="h-4 w-4" />
								Get the docs{" "}
								<ArrowRight className="h-4 w-4" />
							</Link>
						</motion.div>
						<motion.div
							whileHover={{ y: -2 }}
							whileTap={{ y: 0 }}
							className="relative"
						>
							<Link
								href="https://vercel.com/new"
								target="_blank"
								className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm hover:bg-white/[0.06] backdrop-blur-sm"
							>
								<Star className="h-4 w-4" />
								Deploy now
							</Link>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* FEATURE SLIDES WITH ENHANCED ANIMATIONS - removed scale */}
			<section className="relative z-10 w-full max-w-6xl px-6 pb-8">
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					{LINKS.map(({ title, href, description }, i) => (
						<motion.div
							key={title}
							custom={i}
							variants={fadeScale}
							initial="hidden"
							animate="show"
							whileHover={{
								y: -5,
								boxShadow: "0 15px 35px -10px rgba(255, 255, 255, 0.15)",
							}}
							className="transform-gpu"
						>
							<Card href={href} title={title}>
								{description}
							</Card>
						</motion.div>
					))}
				</div>
			</section>

			{/* TECH STACK SLIDE WITH SCROLL-TRIGGERED ANIMATIONS */}
			<section ref={stackRef} className="relative z-10 w-full max-w-6xl px-6 py-14">
				<motion.div
					className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-sm"
					initial={{ opacity: 0, y: 30 }}
					animate={stackInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
					transition={{ duration: 0.6 }}
				>
					<motion.div
						className="mb-6 flex flex-wrap items-center gap-2"
						initial={{ opacity: 0, x: -20 }}
						animate={stackInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<Badge>
							<Package2 className="h-3.5 w-3.5" /> Stack
						</Badge>
					</motion.div>

					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{[
							{
								title: "Next.js 15",
								body: "App Router, Turbopack dev, static & server components.",
								href: "https://nextjs.org/",
								icon: <Globe className="h-5 w-5 text-blue-400" />,
							},
							{
								title: "Tailwind CSS v4",
								body: "Config-less by default. Theme via @theme and tiny CSS entry.",
								href: "https://tailwindcss.com/",
								icon: <Code className="h-5 w-5 text-teal-400" />,
							},
							{
								title: "shadcn/ui",
								body: "Composable headless UI with beautiful defaults.",
								href: "https://ui.shadcn.com/",
								icon: <Sparkles className="h-5 w-5 text-purple-400" />,
							},
							{
								title: "Turborepo",
								body: "Blazing task graph with remote caching and artifacts.",
								href: "https://turbo.build/repo",
								icon: <Zap className="h-5 w-5 text-amber-400" />,
							},
						].map((feature, i) => (
							<motion.div
								key={feature.title}
								variants={fadeScale}
								custom={i}
								initial="hidden"
								animate={stackInView ? "show" : "hidden"}
							>
								<EnhancedFeature
									title={feature.title}
									body={feature.body}
									href={feature.href}
									icon={feature.icon}
								/>
							</motion.div>
						))}
					</div>
				</motion.div>
			</section>

			{/* WORKFLOW SLIDE WITH ENHANCED ANIMATIONS - removed scale */}
			<section ref={workflowRef} className="relative z-10 w-full max-w-6xl px-6 pb-20">
				<motion.div
					className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-sm"
					initial={{ opacity: 0, y: 30 }}
					animate={workflowInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
					transition={{ duration: 0.6 }}
				>
					<motion.div
						className="mb-6 flex flex-wrap items-center gap-2"
						initial={{ opacity: 0, x: -20 }}
						animate={workflowInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<Badge>
							<Rocket className="h-3.5 w-3.5" /> Workflow
						</Badge>
					</motion.div>
					<ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
						{[
							{
								k: 1,
								t: "Install",
								d: "bun install (one lockfile, many packages)",
								icon: <Package2 className="h-5 w-5 text-green-400" />,
							},
							{
								k: 2,
								t: "Dev",
								d: "turbo run dev — next dev + tailwind watch",
								icon: <Code className="h-5 w-5 text-blue-400" />,
							},
							{
								k: 3,
								t: "Build",
								d: "turbo run build — cache artifacts per package",
								icon: <Zap className="h-5 w-5 text-amber-400" />,
							},
							{
								k: 4,
								t: "Deploy",
								d: "next start or Vercel serverless/edge",
								icon: <Rocket className="h-5 w-5 text-pink-400" />,
							},
						].map((s, i) => (
							<motion.li
								key={s.k}
								custom={i}
								variants={fadeUp}
								initial="hidden"
								animate={workflowInView ? "show" : "hidden"}
								whileHover={{
									y: -5,
									boxShadow: "0 15px 35px -10px rgba(255, 255, 255, 0.15)",
									backgroundColor: "rgba(255, 255, 255, 0.08)",
								}}
								className="rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300"
							>
								<div className="flex items-center gap-2 mb-2">
									<motion.div
										className="flex items-center justify-center rounded-full bg-white/10 w-6 h-6 text-xs font-medium"
										animate={{
											backgroundColor: [
												"rgba(255,255,255,0.1)",
												"rgba(99,102,241,0.2)",
												"rgba(255,255,255,0.1)",
											],
										}}
										transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
									>
										{s.k}
									</motion.div>
									<div className="text-sm text-white/50">Step</div>
									{s.icon}
								</div>
								<div className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
									{s.t}
								</div>
								<div className="text-white/60 mt-1">{s.d}</div>
								<div className="mt-3 flex justify-end">
									<motion.div
										className="text-xs text-white/40"
										animate={{
											opacity: [0.4, 0.8, 0.4],
										}}
										transition={{
											duration: 2,
											repeat: Infinity,
											delay: i * 0.5,
										}}
									>
										<CheckCircle2 className="h-4 w-4 inline-block mr-1" />
										Ready
									</motion.div>
								</div>
							</motion.li>
						))}
					</ol>
				</motion.div>
			</section>

			{/* FOOTER WITH ENHANCED ANIMATIONS */}
			<motion.footer
				className="z-10 w-full max-w-6xl px-6 pb-16"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, delay: 0.5 }}
			>
				<div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
					<p className="text-xs text-white/50">
						examples/with-tailwind — <code className="font-mono">web</code>
					</p>
					<motion.a
						className="inline-flex items-center gap-2 text-xs text-white/60 hover:text-white"
						href="https://vercel.com?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"
						target="_blank"
						rel="noopener noreferrer"
						whileHover={{
							textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
						}}
					>
						By
						<Image
							alt="Vercel Logo"
							className="dark:invert"
							height={16}
							src="/vercel.svg"
							width={72}
						/>
					</motion.a>
				</div>
			</motion.footer>
		</main>
	);
}

// Enhanced Feature component with advanced animations - removed scale
function EnhancedFeature({ title, body, href, icon }: { title: string; body: string; href: string; icon?: React.ReactNode }) {
	return (
		<Link
			href={href}
			target="_blank"
			className={cn(
				"group block rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:bg-white/[0.06] relative overflow-hidden backdrop-blur-sm"
			)}
		>
			<motion.div
				className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
				initial={{ x: -100 }}
				whileHover={{ x: 0 }}
			/>

			<div className="flex items-center gap-2 mb-1">
				<motion.div
					animate={{
						rotate: [0, 10, -10, 0],
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				>
					{icon}
				</motion.div>
				<div className="text-sm text-white/50">{title}</div>
			</div>

			<div className="text-white/80 relative z-10">{body}</div>

			<motion.div
				className="mt-3 inline-flex items-center gap-1 text-xs text-white/60 group-hover:text-white relative z-10"
				initial={{ x: 0 }}
				whileHover={{ x: 5 }}
			>
				Explore <ArrowRight className="h-3.5 w-3.5" />
			</motion.div>
		</Link>
	);
}

function Feature({ title, body, href }: { title: string; body: string; href: string }) {
	return (
		<Link
			href={href}
			target="_blank"
			className={cn(
				"group block rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.06]"
			)}
		>
			<div className="mb-1 text-sm text-white/50">{title}</div>
			<div className="text-white/80">{body}</div>
			<div className="mt-3 inline-flex items-center gap-1 text-xs text-white/60 group-hover:text-white">
				Explore <ArrowRight className="h-3.5 w-3.5" />
			</div>
		</Link>
	);
}
