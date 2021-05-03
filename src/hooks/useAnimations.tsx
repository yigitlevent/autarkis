import useWebAnimations from "@wellyshen/use-web-animations";

export function useAnimations(): { spin: any, fadeIn: any, fadeOut: any; } {
	const spin = useWebAnimations<HTMLDivElement>({
		keyframes: {
			transform: "rotate(360deg)",
		},
		animationOptions: {
			delay: 0,
			duration: 800,
			iterations: Infinity,
			direction: "normal",
			easing: "linear",
			fill: "forwards"
		}
	});

	const fadein = useWebAnimations<HTMLDivElement>({
		keyframes: [
			{ opacity: 0 },
			{ opacity: 1 }
		],
		animationOptions: {
			delay: 0,
			duration: 100,
			iterations: 1,
			direction: "normal",
			easing: "ease-in-out",
			fill: "forwards"
		}
	});

	const fadeout = useWebAnimations<HTMLDivElement>({
		keyframes: [
			{ opacity: 1 },
			{ opacity: 0 }
		],
		animationOptions: {
			delay: 0,
			duration: 100,
			iterations: 1,
			direction: "normal",
			easing: "ease-in-out",
			fill: "forwards"
		}
	});

	return { spin: spin, fadeIn: fadein, fadeOut: fadeout };
}
