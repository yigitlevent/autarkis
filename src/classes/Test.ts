import { Option } from "react-basic-select";

import { Dot, PseudoCheckbox } from "../rulesets/_generic";

import { CleanString } from "../function/utility";

export class Test {
	_character: aut.classes.Character;
	_ruleset: aut.ruleset.Names;

	title: string;
	type: string;
	testFunction: aut.ruleset.TestFunction;
	probabilityFunction: aut.ruleset.ProbabilityFunction;

	poolContributors: { [key: string]: { [key: string]: number; }; } = {}; // HOLDS: addTo: string
	pools: { [key: string]: number; } = {}; // HOLDS: seperatePool: true; NEVER directly modify these except in calculatePools()

	flags: { [key: string]: boolean; } = {}; // HOLDS: inputs.includes("postcheckbox")

	misc: { [key: string]: number; } = {}; // HOLDS: difficulty: true

	constructor(dataset: aut.ruleset.TestSheet, ruleset: aut.ruleset.Names, character: aut.classes.Character) {
		this._character = character;
		this._ruleset = ruleset;

		this.title = dataset.title;
		this.type = CleanString(dataset.title);
		this.testFunction = dataset.testFunction;
		this.probabilityFunction = dataset.probabilityFunction;

		const childrens = dataset.children;

		for (const key in childrens) {
			const children = childrens[key];
			const cleanTitle = CleanString(children.title);

			if (cleanTitle === "empty") continue;

			if (children.defaultValue) {
				if (children.addTo) {
					if (!(children.addTo in this.poolContributors)) { this.poolContributors[children.addTo] = {}; }
					this.poolContributors[children.addTo][cleanTitle] = this.getDefaultValue(children.defaultValue, this._character);
				}

				if (children.isPool) {
					this.pools[cleanTitle] = this.getDefaultValue(children.defaultValue, this._character);
				}

				if (children.difficulty) {
					this.misc[cleanTitle] = this.getDefaultValue(children.defaultValue, this._character);
				}
			}

			if (children.inputs.includes("postcheckbox")) {
				this.flags[cleanTitle] = (children.defaultChecked) ? true : false;
			}
		}

		this.calculatePools();
	}

	private getDefaultValue(array: aut.ruleset.DefaultValue, character: aut.classes.Character): number {
		if (array.length === 3 || array.length === 5) {
			const row = character.data[array[0]][array[1]];

			if (array.length === 3) {
				const value = row[array[2]].current as (string | number);
				if (typeof value === "string") return parseInt(value);
				return value;
			}

			if (array.length === 5) {
				if (array[4] === "unmarked") {
					const emptyDots = (row.dot as Dot).getEmpty();
					return (row.pseudocheckbox as PseudoCheckbox).getUnmarked(emptyDots);
				}

				const value = (row.pseudocheckbox as PseudoCheckbox).getAmount(array[3], this._ruleset);
				if (array[4] === "count/3") { return Math.floor(value / 3); }

				// array[4] === "count"
				return value;
			}
		}

		return parseInt(array[0]);
	}

	private calculatePools(): void {
		for (const poolKey in this.pools) {
			this.pools[poolKey] = 0;

			const poolConts = this.poolContributors[poolKey];
			for (const contKey in poolConts) {
				if ((!(contKey in this.flags) || this.flags[contKey]) && poolKey in this.pools) {
					this.pools[poolKey] += poolConts[contKey];
				}
			}
		}
	}

	placeSheetData(): void {
		this.calculatePools();

		for (const poolKey in this.poolContributors) {
			const poolConts = this.poolContributors[poolKey];
			for (const contKey in poolConts) {
				const el = document.getElementById(`roller.${contKey}.number`) as HTMLInputElement;
				if (el) el.value = poolConts[contKey].toString();
			}
		}

		const combined = { ...this.pools, ...this.misc };
		for (const poolKey in combined) {
			const el = document.getElementById(`roller.${poolKey}.number`) as HTMLInputElement;
			if (el) el.value = combined[poolKey].toString();
		}

		for (const switchKey in this.flags) {
			const el = document.getElementById(`roller.${switchKey}.postcheckbox`) as HTMLInputElement;
			if (el) el.checked = this.flags[switchKey];
		}
	}

	changeValue(event: aut.short.Events): void {
		const target = event.target as HTMLInputElement;
		const row = target.id.split(".")[1];
		const type = target.id.split(".")[2];

		if (type === "number") {
			if (row in this.misc) this.misc[row] = parseInt(target.value);
			else {
				for (const key in this.poolContributors) {
					if (row in this.poolContributors[key]) {
						this.poolContributors[key][row] = parseInt(target.value);
					}
				}
			}
		}
		else if (type === "postcheckbox" && row in this.flags) {
			this.flags[row] = target.checked;
		}
	}

	changeSelected(values: Option[]): void {
		this.poolContributors["total_pool"]["ability_pool"] = 0;

		for (const key in values) {
			const option = values[key].value.split(" ");
			const value = this._character.data[option[0]][option[1]].dot.current;
			this.poolContributors["total_pool"]["ability_pool"] += value as number;
		}
	}

	calculateProbabilities(): aut.data.ProbabilityResult {
		const testData: aut.data.TestData = {
			title: this.title,
			type: this.type,
			pools: this.pools,
			flags: this.flags,
			misc: this.misc,
			character: {
				uuid: this._character.data._primary.uuid.text.current as string,
				name: this._character.data.basics.name.text.current as string,
				blood_potency: this._character.data.the_blood.blood_potency.dot.current as number,
				aggravated_damage: (this._character.data.the_blood.health.pseudocheckbox as PseudoCheckbox).getAmount("cross", this._ruleset)
			}
		};

		return this.probabilityFunction(testData);
	}

	roll(offlineTest: boolean): aut.data.TestResult {
		const testData: aut.data.TestData = {
			title: this.title,
			type: this.type,
			pools: this.pools,
			flags: this.flags,
			misc: this.misc,
			character: {
				uuid: this._character.data._primary.uuid.text.current as string,
				name: this._character.data.basics.name.text.current as string,
				blood_potency: this._character.data.the_blood.blood_potency.dot.current as number,
				aggravated_damage: (this._character.data.the_blood.health.pseudocheckbox as PseudoCheckbox).getAmount("cross", this._ruleset)
			}
		};

		const result = this.testFunction(testData);

		if (!offlineTest) {
			// TODO: send to the bot
		}

		return result;
	}
}
