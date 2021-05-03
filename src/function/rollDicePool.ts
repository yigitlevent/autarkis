export function RollDicePool(amount: number, diceTarget: number = 6, diceSides: 10 = 10): aut.data.Roll {
	const results: number[] = [];

	for (let i = 0; i < amount; i++) {
		results.push(RandomNumber(1, diceSides));
	}

	results.sort((a, b) => { return b - a; });

	const countTens = results.reduce((n, x) => n + ((x === 10) ? 1 : 0), 0);
	const countOnes = results.reduce((n, x) => n + ((x === 1) ? 1 : 0), 0);
	const countSuccesses = results.reduce((n, x) => n + ((x >= diceTarget) ? 1 : 0), 0);

	return { results: results, successes: countSuccesses, tens: countTens, ones: countOnes };
}

function RandomNumber(min: number, max: number): number {
	return (min - 1) + Math.ceil(Math.random() * (max - min + 1));
}
