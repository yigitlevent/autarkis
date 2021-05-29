namespace aut {

	namespace classes {

		class Test {
			_data: aut.GenericCharacterData;
			_ruleset: aut.ruleset.Names;

			title: string;
			type: string;
			testFunction: aut.ruleset.TestFunction;
			probabilityFunction: aut.ruleset.ProbabilityFunction;

			poolContributors: { [key: string]: { [key: string]: number; }; } = {};
			pools: { [key: string]: number; } = {};

			flags: { [key: string]: boolean; } = {};

			misc: { [key: string]: number; } = {};

			placeSheetData: () => void;
			changeValue: (event: aut.Events) => void;
			changeSelected: (values: Option[]) => void;
			calculateProbabilities: () => aut.data.ProbabilityResult;
			roll: (offlineTest: boolean) => aut.data.TestResult;
		}

		class Text {
			current: string;
		}

		class Toggle {
			current: boolean;
		}

		class Textarea {
			current: string;
		}

		class Dot {
			_amount: number;
			current: number;
			getEmpty: () => number;
		}

		class Checkbox {
			_amount: number;
			current: number;
		}

		class PseudoCheckbox {
			current: string[];
			nextValue: (index: number) => string;
			getEmpty: () => number;
		}

		class Select {
			current: string[];
		}

	}

}
