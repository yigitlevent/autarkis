export function RandomNumber(min: number, max: number): number {
	return (min - 1) + Math.ceil(Math.random() * (max - min + 1));
}

export function Roll(amount: number, threshold: number = 6, sides: 10 = 10): aut.data.Roll {
	const results: number[] = [];

	for (let i = 0; i < amount; i++) { results.push(RandomNumber(1, sides)); }

	results.sort((a, b) => { return b - a; });

	const countTens = results.reduce((n, x) => n + ((x === 10) ? 1 : 0), 0);
	const countOnes = results.reduce((n, x) => n + ((x === 1) ? 1 : 0), 0);
	const countSuccesses = results.reduce((n, x) => n + ((x >= threshold) ? 1 : 0), 0);

	return { results: results, successes: countSuccesses, tens: countTens, ones: countOnes };
}

export function BinomialDistribution(amount: number, successProbability: number = 5 / 10, criticalProbability: number = 1 / 10): aut.data.Distributions {
	const suProbability = successProbability;
	const crProbability = criticalProbability;

	const successDistributions: number[] = [];
	const criticalDistributions: number[] = [];

	successDistributions.push(Math.pow(1 - suProbability, amount));
	for (let i = 0; i < amount; i++) {
		successDistributions.push((suProbability / (1 - suProbability)) * ((amount - i) / (i + 1)) * successDistributions[i]);
	}

	criticalDistributions.push(Math.pow(1 - crProbability, amount));
	for (let i = 0; i < amount; i++) {
		criticalDistributions.push((crProbability / (1 - crProbability)) * ((amount - i) / (i + 1)) * criticalDistributions[i]);
	}

	return { success: successDistributions, critical: criticalDistributions };
}
