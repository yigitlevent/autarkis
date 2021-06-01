export class Text implements aut.classes.Text {
	current = "";
}

export class Toggle implements aut.classes.Toggle {
	current = false;
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

	constructor(size: number, possibleValues: string[]) {
		this.current = Array<string>(size).fill("empty");

		for (const name in possibleValues) {
			this._pValues.push(possibleValues[name]);
		}

	}

	nextValue(index: number): string {
		const oldIndex = this._pValues.indexOf(this.current[index]);

		if (oldIndex === this._pValues.length - 1) this.current[index] = this._pValues[0];
		else this.current[index] = this._pValues[oldIndex + 1];

		return this.current[index];
	}

	getEmpty(): number {
		return this.current.filter((x) => x === "empty").length;
	}

	getUnmarked(emptyDots: number): number {
		return this.getEmpty() - emptyDots;
	}

	getAmount(value: string): number {
		return this.current.filter((x) => x === value).length;
	}
}

export class Textarea implements aut.classes.Textarea {
	current = "";
}

export class Select implements aut.classes.Select {
	current: rbs.Option[] = [];
}
