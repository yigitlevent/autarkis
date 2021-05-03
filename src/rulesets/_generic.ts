import { Rulesets } from "./_rulesets";

export class PreCheckbox implements aut.classes.PreCheckbox {
	current = false;
}

export class Text implements aut.classes.Text {
	current = "";
}

export class Textarea implements aut.classes.Textarea {
	current = "";
}

export class Dot implements aut.classes.Dot {
	_amount: number;
	current = 0;

	constructor(amount: number) {
		this._amount = amount;
	}

	getEmpty(): number {
		return this._amount - this.current;
	}
}

export class Checkbox implements aut.classes.Checkbox {
	_amount: number;
	current = 0;

	constructor(amount: number) {
		this._amount = amount;
	}
}

export class PseudoCheckbox implements aut.classes.PseudoCheckbox {
	private _pValues: string[] = [];

	current: string[];

	constructor(size: number, possibleValues: string[], ruleset: aut.ruleset.Names) {
		this.current = Array<string>(size).fill("");

		for (const name in possibleValues) {
			this._pValues.push((Rulesets.getRuleset(ruleset)).basics.pseudoCheckboxInputs[possibleValues[name]]);
		}
	}

	nextValue(index: number): string {
		const oldIndex = this._pValues.indexOf(this.current[index]);
		if (oldIndex === this._pValues.length - 1) { this.current[index] = this._pValues[0]; }
		else { this.current[index] = this._pValues[oldIndex + 1]; }
		return this.current[index];
	}

	getEmpty(): number {
		return this.current.filter((x) => x === "").length;
	}

	getAmount(value: string): number {
		return this.current.filter((x) => x === value).length;
	}
}

export class StringArray implements aut.classes.StringArray {
	current: string[] = [];
}
