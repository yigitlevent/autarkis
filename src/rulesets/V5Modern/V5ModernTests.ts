import { BinomialDistribution, Roll } from "../../function/dice";
import { GetOrdinalSuffix } from "../../function/utility";

import { V5ModernBloodPotency } from "./V5ModernMisc";

const StandardTest = (testData: aut.data.TestData): aut.data.TestResult => {
	const rollResult: aut.data.TestResult = {
		character: {
			uuid: testData.character.uuid,
			name: testData.character.name,
		},
		title: testData.title,
		type: testData.type,
		test: {
			results: {},
			result: "",
			difficulty: Math.max(testData.misc.difficulty, 1)
		},
		info: []
	};

	const rolls: { [key: string]: aut.data.Roll; } = {};

	if (testData.pools.total_pool < 1) testData.pools.total_pool = 1;

	if (testData.flags.hunger) {
		rolls["normal"] = Roll(Math.max(0, testData.pools.total_pool - testData.pools.hunger));
		rolls["hunger"] = Roll(Math.min(testData.pools.total_pool, testData.pools.hunger));
	}
	else {
		rolls["normal"] = Roll(Math.max(testData.pools.total_pool));
	}

	for (const key in rolls) {
		rollResult.test.results[key] = rolls[key].results;
	}

	const totalSuccesses: number = rolls.normal.successes + ((rolls.hunger) ? rolls.hunger.successes : 0) + Math.floor(rolls.normal.tens / 2);

	if (totalSuccesses < rollResult.test.difficulty) {
		if (rolls.hunger && rolls.hunger.ones > 0) {
			rollResult.test.result = "Bestial Failure";
		}
		else {
			rollResult.test.result = "Failure";
		}
	}
	else {
		if ((rolls.hunger && rolls.normal.tens > 0 && rolls.hunger.tens > 0) || rolls.hunger.tens > 1) {
			rollResult.test.result = "Messy Critical";
		}
		else if (rolls.normal.tens > 1) {
			rollResult.test.result = "Critical";
		}
		else {
			rollResult.test.result = "Success";
		}
	}

	if (testData.flags.blood_surge) { } // TODO
	if (testData.flags.rouse_check) { } // TODO

	return rollResult;
};

const StandardProbabilities = (testData: aut.data.TestData): aut.data.ProbabilityResult => {
	const difficulty = testData.misc.difficulty;
	const dist: { [key: string]: aut.data.Distributions; } = {};
	dist["total"] = BinomialDistribution(testData.pools.total_pool);
	dist["normal"] = BinomialDistribution(Math.max(0, testData.pools.total_pool - ((testData.flags.hunger) ? testData.pools.hunger : 0)));
	dist["hunger"] = BinomialDistribution(Math.min(testData.pools.total_pool, (testData.flags.hunger) ? testData.pools.hunger : 0));

	const probabilities: { [key: string]: number; } = {
		messy_critical: 0,
		critical_success: 0,
		success: 0,
		failure: 0,
		bestial_failure: 0
	};

	if (testData.flags.hunger) {
		// TODO: There probably is a better way of combining binomial distributions
		for (let ss = 0; ss < dist.total.success.length; ss++) {
			for (let hc = 0; hc < dist.hunger.critical.length; hc++) {
				for (let nc = 0; nc < dist.normal.critical.length; nc++) {
					const probability = dist.total.success[ss] * dist.hunger.critical[hc] * dist.normal.critical[nc];

					if ((hc > 1 || (hc > 0 && nc > 0)) && (Math.floor((hc + nc) / 2) * 4) + ss >= difficulty) {
						probabilities.messy_critical += probability;
					}
					else if (nc > 1 && hc === 0 && ((Math.floor(nc / 2) * 4) >= difficulty || (Math.floor(nc / 2) * 4) + ss >= difficulty)) {
						probabilities.critical_success += probability;
					}
					else if (hc < 2 && nc < 2 && ss >= difficulty) {
						probabilities.success += probability;
					}
					else if (hc > 0 && ss < difficulty && (Math.floor(nc / 2) * 4) + ss < difficulty) {
						probabilities.bestial_failure += probability;
					}
					else if (hc === 0 && ss < difficulty && (Math.floor(nc / 2) * 4) + ss < difficulty) {
						probabilities.failure += probability;
					}
					else { console.log(`Logic Error -- ss: ${ss}, hc: ${hc}, nc: ${nc}`); }
				}
			}
		}
	}
	else {
		// TODO: There probably is a better way of combining binomial distributions
		for (let ss = 0; ss < dist.total.success.length; ss++) {
			for (let nc = 0; nc < dist.normal.critical.length; nc++) {
				const probability = dist.total.success[ss] * dist.normal.critical[nc];

				if (nc > 1 && ((Math.floor(nc / 2) * 4) >= difficulty || (Math.floor(nc / 2) * 4) + ss >= difficulty)) {
					probabilities.critical_success += probability;
				}
				else if (nc < 2 && ss >= difficulty) {
					probabilities.success += probability;
				}
				else if (ss < difficulty && (Math.floor(nc / 2) * 4) + ss < difficulty) {
					probabilities.bestial_failure += probability;
				}
				else { console.log(`Logic Error -- ss: ${ss}, nc: ${nc}`); }
			}
		}
	}

	for (const key in probabilities) { probabilities[key] = Math.round(probabilities[key] * 100000) / 1000; }
	probabilities["_sum"] = Object.values(probabilities).reduce((a, b) => a + b, 0);

	return probabilities;
};

const RouseCheck = (testData: aut.data.TestData): aut.data.TestResult => {
	const rollResult: aut.data.TestResult = {
		character: {
			uuid: testData.character.uuid,
			name: testData.character.name,
		},
		title: testData.title,
		type: testData.type,
		test: {
			results: {},
			result: "",
			difficulty: 1
		},
		info: []
	};

	const rolls: { [key: string]: aut.data.Roll; } = {};

	for (let i = 0; i < testData.pools.check_amount; i++) {
		rolls[i] = Roll(V5ModernBloodPotency[testData.character.blood_potency].rouse_check);
	}

	let successes = 0;
	let failures = 0;

	for (const key in rolls) {
		rollResult.test.results[`${key}${GetOrdinalSuffix(parseInt(key))}`] = rolls[key].results;
		if (rolls[key].successes >= 1) { successes++; }
		else { failures++; }
	}

	const result = [];
	if (successes > 0) { result.push(`${successes} Success${(successes > 1) ? "es" : ""}`); }
	if (failures > 0) { result.push(`${failures} Failure${(failures > 1) ? "s" : ""}`); }

	rollResult.test.result = result.join(", ");

	return rollResult;
};

const RouseProbabilities = (testData: aut.data.TestData): aut.data.ProbabilityResult => {
	const dist: number[] = [];
	for (let i = 0; i < testData.pools.check_amount; i++) {
		dist.push(
			BinomialDistribution(V5ModernBloodPotency[testData.character.blood_potency].rouse_check)
				.success.slice(1).reduce((a, b) => a + b)
		);
	}

	const probabilities: { [key: string]: number; } = {};

	for (const key in dist) {
		const num = parseInt(key);
		probabilities[`${num} Success${(num > 1) ? "es" : ""}`] = dist.slice(0, num + 1).reduce((a, b) => a * b);
	}

	for (const key in probabilities) { probabilities[key] = Math.round(probabilities[key] * 100000) / 1000; }

	return probabilities;
};

const CripplingInjury = (testData: aut.data.TestData): aut.data.TestResult => {
	const rollResult: aut.data.TestResult = {
		character: {
			uuid: testData.character.uuid,
			name: testData.character.name,
		},
		title: testData.title,
		type: testData.type,
		test: {
			results: {},
			result: "",
			difficulty: 1
		},
		info: []
	};

	const roll = Roll(1);
	const result = roll.results[0] + testData.character.aggravated_damage;

	if (result < 7) rollResult.test.result = "Stunned: Spend 1 point of Willpower or lose a turn.";
	else if (result < 9) rollResult.test.result = "Severe head trauma: Make Physical rolls at -1; Mental rolls at -2.";
	else if (result < 11) rollResult.test.result = "Broken limb or joint: Make rolls at -3 when using the affected limb.\nBlinded: Make vision-related rolls (including combat) at -3.\nStoryteller decides which makes most sense for this combat.";
	else if (result < 12) rollResult.test.result = "Massive wound: Make all rolls at -2, add +1 to all additional damage suffered.";
	else if (result < 13) rollResult.test.result = "Crippled: Same effects as Broken, but limb is lost or mangled beyond use.";
	else rollResult.test.result = "Death for mortals or immediate torpor for vampires.";

	rollResult.test.results["normal"] = roll.results;

	return rollResult;
};

const InjuryProbabilities = (testData: aut.data.TestData): aut.data.ProbabilityResult => {
	const probabilities: { [key: string]: number; } = {
		stunned: 0,
		severe_trauma: 0,
		broken_or_blinded: 0,
		massive_wound: 0,
		crippled: 0,
		death_or_torpor: 0
	};

	const min = testData.pools.aggravated;

	for (let i = 0; i < 10; i++) {
		if (min + i < 7) probabilities.stunned += 0.1;
		else if (min + i < 9) probabilities.severe_trauma += 0.1;
		else if (min + i < 11) probabilities.broken_or_blinded += 0.1;
		else if (min + i < 12) probabilities.massive_wound += 0.1;
		else if (min + i < 13) probabilities.crippled += 0.1;
		else probabilities.death_or_torpor += 0.1;
	}

	for (const key in probabilities) { probabilities[key] = Math.round(probabilities[key] * 100000) / 1000; }

	return probabilities;
};

const FrenzyTest = (testData: aut.data.TestData): aut.data.TestResult => {
	const rollResult: aut.data.TestResult = {
		character: {
			uuid: testData.character.uuid,
			name: testData.character.name,
		},
		title: testData.title,
		type: testData.type,
		test: {
			results: {},
			result: "",
			difficulty: Math.max(testData.misc.difficulty, 1)
		},
		info: []
	};

	const roll = Roll(testData.pools.total_pool);

	const totalSuccesses: number = roll.successes + Math.floor(roll.tens / 2);

	if (totalSuccesses >= rollResult.test.difficulty) {
		if (roll.tens >= 2) { rollResult.test.result = `Critical. ${rollResult.character.name} resists the frenzy without losing a turn.`; }
		else { rollResult.test.result = `Success. ${rollResult.character.name} must spend a turn to suppress the impulse.`; }
	}
	else { rollResult.test.result = "Failure. The Beast has the control now."; }

	rollResult.test.results["normal"] = roll.results;

	return rollResult;
};

const FrenzyProbabilities = (testData: aut.data.TestData): aut.data.ProbabilityResult => {
	const dist = BinomialDistribution(testData.pools.total_pool);
	const difficulty = testData.misc.difficulty;

	const probabilities: { [key: string]: number; } = {};

	probabilities["critical"] = dist.critical.slice(Math.ceil(difficulty / 2)).reduce((a, b) => a + b);
	probabilities["success"] = dist.success.slice(difficulty).reduce((a, b) => a + b);
	probabilities["failure"] = 1 - probabilities["success"];

	for (const key in probabilities) { probabilities[key] = Math.round(probabilities[key] * 100000) / 1000; }

	return probabilities;
};

const RemorseTest = (testData: aut.data.TestData): aut.data.TestResult => {
	const rollResult: aut.data.TestResult = {
		character: {
			uuid: testData.character.uuid,
			name: testData.character.name,
		},
		title: testData.title,
		type: testData.type,
		test: {
			results: {},
			result: "",
			difficulty: 1
		},
		info: []
	};

	const roll = Roll(testData.pools.total_pool);

	const totalSuccesses: number = roll.successes + Math.floor(roll.tens / 2);
	if (totalSuccesses > 0) {
		rollResult.test.result = `${rollResult.character.name} has suffered enough guilt, shame, or regret to retain their current Humanity. They remove all Stains.`;
	}
	else {
		rollResult.test.result = `The Beast has won. ${rollResult.character.name} must lose 1 point of Humanity and then remove all Stains.`;
	}

	rollResult.test.results["normal"] = roll.results;

	return rollResult;
};

const RemorseProbabilities = (testData: aut.data.TestData): aut.data.ProbabilityResult => {
	const dist = BinomialDistribution(testData.pools.total_pool);

	const probabilities: { [key: string]: number; } = {};

	probabilities["success"] = dist.success.slice(1).reduce((a, b) => a + b);
	probabilities["failure"] = 1 - probabilities["success"];

	for (const key in probabilities) { probabilities[key] = Math.round(probabilities[key] * 100000) / 1000; }

	return probabilities;
};

const Compulsion = (testData: aut.data.TestData): aut.data.TestResult => {
	const rollResult: aut.data.TestResult = {
		character: {
			uuid: testData.character.uuid,
			name: testData.character.name,
		},
		title: testData.title,
		type: testData.type,
		test: {
			results: {},
			result: "",
			difficulty: 0
		},
		info: []
	};

	const roll = Roll(1);
	const result = roll.results;

	if (result[0] < 4) rollResult.test.result = "Hunger";
	else if (result[0] < 6) rollResult.test.result = "Dominance";
	else if (result[0] < 8) rollResult.test.result = "Harm";
	else if (result[0] < 10) rollResult.test.result = "Paranoia";
	else rollResult.test.result = "Clan Compulsion"; // TODO: maybe figure this out when clan stuff are added

	rollResult.test.results["normal"] = roll.results;

	return rollResult;
};

const CompulsionProbabilities = (): aut.data.ProbabilityResult => {
	const probabilities: { [key: string]: number; } = {
		hunger: 30,
		dominance: 20,
		harm: 20,
		paranoia: 20,
		clan_compulsion: 10,
	};

	return probabilities;
};

export const V5Tests: aut.ruleset.TestSheets = {
	standard: {
		title: "Standard Test",
		testFunction: StandardTest,
		probabilityFunction: StandardProbabilities,
		children: [
			{
				title: "Select Abilities",
				inputs: ["select"],
				select: { categories: ["Attributes", "Skills", "Disciplines"], multi: true, search: true, placeholder: "Select Abilities", appendGroupValue: true },
			},
			{
				title: "Ability Pool",
				showTitle: true,
				isReadOnly: true,
				inputs: ["number"],
				addTo: "total_pool",
				defaultValue: ["0"]
			},
			{
				title: "Modifier",
				showTitle: true,
				inputs: ["number"],
				addTo: "total_pool",
				defaultValue: ["0"]
			},
			{
				title: "Speciality",
				showTitle: true,
				isReadOnly: true,
				inputs: ["postcheckbox", "number"],
				addTo: "total_pool",
				defaultValue: ["1"]
			},
			{
				title: "Blood Surge",
				showTitle: true,
				isReadOnly: true,
				inputs: ["postcheckbox", "number"],
				addTo: "total_pool",
				defaultValue: ["the_blood", "blood_surge", "text"]
			},
			{
				title: "Hunger",
				showTitle: true,
				isReadOnly: true,
				inputs: ["postcheckbox", "number"],
				isPool: true,
				addTo: "hunger",
				defaultChecked: true,
				defaultValue: ["the_blood", "hunger", "checkbox"]
			},
			{
				title: "Rouse Check",
				showTitle: true,
				inputs: ["postcheckbox", "number"],
				isPool: true,
				addTo: "rouse_check",
				defaultValue: ["1"]
			},
			{
				title: "Difficulty",
				showTitle: true,
				inputs: ["number"],
				difficulty: true,
				defaultValue: ["1"]
			},
			{
				title: "Total Pool",
				showTitle: true,
				isReadOnly: true,
				inputs: ["number"],
				isPool: true,
				defaultValue: ["0"]
			}
		]
	},
	rouse_check: {
		title: "Rouse Check",
		testFunction: RouseCheck,
		probabilityFunction: RouseProbabilities,
		children: [
			{
				title: "Check Amount",
				showTitle: true,
				inputs: ["number"],
				defaultValue: ["0"],
				isPool: true,
				addTo: "check_amount"
			},
			{
				title: "empty",
				isReadOnly: true,
				inputs: []
			}
		]
	},
	health: {
		title: "Crippling Injury",
		testFunction: CripplingInjury,
		probabilityFunction: InjuryProbabilities,
		children: [
			{
				title: "Dice",
				showTitle: true,
				isReadOnly: true,
				inputs: ["number"],
				defaultValue: ["1"],
				isPool: true,
				addTo: "dice"
			},
			{
				title: "Aggravated",
				showTitle: true,
				isReadOnly: true,
				inputs: ["number"],
				defaultValue: ["the_blood", "health", "pseudocheckbox", "cross", "count"],
				isPool: true,
				addTo: "aggravated"
			}
		]
	},
	willpower: {
		title: "Frenzy Test",
		testFunction: FrenzyTest,
		probabilityFunction: FrenzyProbabilities,
		children: [
			{
				title: "Willpower Pool",
				showTitle: true,
				isReadOnly: true,
				inputs: ["number"],
				addTo: "total_pool",
				defaultValue: ["the_blood", "willpower", "pseudocheckbox", "square", "unmarked"]
			},
			{
				title: "Modifier",
				showTitle: true,
				inputs: ["number"],
				addTo: "total_pool",
				defaultValue: ["0"]
			},
			{
				title: "Humanity",
				showTitle: true,
				isReadOnly: true,
				inputs: ["postcheckbox", "number"],
				addTo: "total_pool",
				defaultChecked: true,
				defaultValue: ["the_blood", "humanity", "pseudocheckbox", "empty", "count/3"]
			},
			{
				title: "empty",
				isReadOnly: true,
				inputs: []
			},
			{
				title: "Difficulty",
				showTitle: true,
				inputs: ["number"],
				difficulty: true,
				defaultValue: ["1"]
			},
			{
				title: "Total Pool",
				showTitle: true,
				isReadOnly: true,
				inputs: ["number"],
				isPool: true,
				defaultValue: ["0"]
			}
		]
	},
	humanity: {
		title: "Remorse Test",
		testFunction: RemorseTest,
		probabilityFunction: RemorseProbabilities,
		children: [
			{
				title: "Humanity Pool",
				showTitle: true,
				isReadOnly: true,
				inputs: ["number"],
				addTo: "total_pool",
				defaultValue: ["the_blood", "humanity", "pseudocheckbox", "square", "count"]
			},
			{
				title: "Modifier",
				showTitle: true,
				inputs: ["number"],
				addTo: "total_pool",
				defaultValue: ["0"]
			},
			{
				title: "Difficulty",
				showTitle: true,
				inputs: ["number"],
				difficulty: true,
				defaultValue: ["1"]
			},
			{
				title: "Total Pool",
				showTitle: true,
				isReadOnly: true,
				inputs: ["number"],
				isPool: true,
				defaultValue: ["0"]
			}
		]
	},
	compulsion: {
		title: "Compulsion",
		testFunction: Compulsion,
		probabilityFunction: CompulsionProbabilities,
		children: [
			{
				title: "Dice",
				showTitle: true,
				isReadOnly: true,
				inputs: ["number"],
				defaultValue: ["1"],
				isPool: true
			},
			{
				title: "empty",
				isReadOnly: true,
				inputs: []
			}
		]
	}
};
