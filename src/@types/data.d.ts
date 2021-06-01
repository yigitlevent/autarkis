namespace aut {

	namespace data {

		interface GenericData {
			[key: string]: {
				[key: string]: {
					text: aut.classes.Text;
					toggle: aut.classes.Toggle;
					precheckbox: aut.classes.Toggle;
					postcheckbox: aut.classes.Toggle;
					dot: aut.classes.Dot;
					checkbox: aut.classes.Checkbox;
					pseudocheckbox: aut.classes.PseudoCheckbox;
					textarea: aut.classes.Textarea;
					select: aut.classes.Select;
				};
			};
		}

		interface GenericDataLayout {
			[key: string]: {
				[key: string]: {
					[key: string]: aut.classes.Text | aut.classes.Toggle
					| aut.classes.Dot | aut.classes.Checkbox | aut.classes.PseudoCheckbox
					| aut.classes.Textarea | aut.classes.Select;
				};
			};
		}

		interface Roll {
			results: number[];
			successes: number;
			tens: number;
			ones: number;
		}

		interface TestData {
			title: string;
			type: string;
			pools: { [key: string]: number; };
			flags: { [key: string]: boolean; };
			misc: { [key: string]: number; };
			character: {
				uuid: string;
				name: string;
				blood_potency: number;
				aggravated_damage: number;
			};
		}

		interface TestResult {
			character: {
				uuid: string;
				name: string;
			};
			title: string;
			type: string;
			test: {
				results: { [key: string]: number[]; };
				result: string;
				difficulty: number;
			};
			info: ([string] | [string, number])[];
		}

		interface Distributions {
			success: number[];
			critical: number[];
		}

		interface ProbabilityResult { [key: string]: number; }
	}

}
