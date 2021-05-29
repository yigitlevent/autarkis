namespace aut {
	
	namespace ruleset {

		type Names = "v5_modern";

		type TestFunction = (testData: aut.data.TestData) => aut.data.TestResult;
		type ProbabilityFunction = (testData: aut.data.TestData) => aut.data.ProbabilityResult;

		interface Ruleset {
			pseudoCheckboxInputs: { [key: string]: string; };
			basicLists: aut.ruleset.BasicLists;
			characterSheet: aut.ruleset.CharacterSheet;
			generatorConditions: aut.ruleset.GeneratorConditions;
			characterMisc: {
				[key: string]: any;
			};
			tests: aut.ruleset.TestSheets;
		}

		interface TestSheets { [key: string]: TestSheet; }

		interface TestSheet {
			title: string;
			testFunction: aut.ruleset.TestFunction;
			probabilityFunction: aut.ruleset.ProbabilityFunction;
			children: (aut.ruleset.SheetRow & aut.ruleset.TestSheetExtras)[];
		}

		type CharacterAdvantages = {
			[key: string]: {
				[key: string]: CharacterAdvantage;
			};
		};

		interface CharacterAdvantage {
			name: string;
			type: "merit" | "flaw";
			category?: string;
			cost: number[];
			hasDetail?: true;
			description?: string;
		}

		type PredatorTypes = {
			[key: string]: PredatorType;
		};

		interface PredatorType {
			name: string;
			description: string;
			pool: string;
			disciplines: string[];
			speciality: string[];
			humanity?: number;
			blood_potency?: number;
			advantages: PredatorTypeAdvantage[];
		}

		interface PredatorTypeAdvantage {
			type: "AND" | "OR" | "SPLIT";
			amount?: number;
			list: PredatorTypeAdvantageEntry[];
		}

		interface PredatorTypeAdvantageEntry {
			name: [string, string];
			description?: string;
			dots?: number;
		}

		type DefaultValue = [string] | [string, string, aut.ruleset.InputTypes] | [string, string, "pseudocheckbox", string, "unmarked" | "count" | "count/3"];

		interface TestSheetExtras {
			addTo?: string;
			isPool?: true;
			difficulty?: true;
			defaultChecked?: true;
			defaultValue?: aut.ruleset.DefaultValue;
		}

		interface BasicLists {
			[key: string]: string[];
			attributes: string[];
			skills: string[];
			skill_distributions: string[];
			disciplines: string[];
			predator_types: string[];
			generations: string[];
			advantages: string[];
			clans: string[];
		}

		type GeneratorConditions = GeneratorCondition[];

		interface GeneratorCondition {
			text: string;
			condition: (characterData: aut.data.GenericCharacterData) => [boolean, string];
		}

		type BloodPotency = BloodPotencyRow[];

		interface BloodPotencyRow {
			[key: string]: number | string;
			blood_surge: number;
			mend_amount: number;
			power_bonus: number;
			rouse_check: number;
			bane_severity: number;
			feeding_penalty: string;
		}

		interface Clans {
			[key: string]: {
				name: string;
				disciplines: string[];
				bane: string;
				compulsion: string;
			};
		}

		interface Disciplines {
			[key: string]: {
				name: string;
				powers?: DisciplineLevels[];
				ritual_name?: [string, string];
				rituals?: DisciplineLevels[];
			};
		}

		interface DisciplineLevels {
			[key: string]: DisciplinePower;
		}

		interface DisciplinePower {
			name: string;
			attribute: string;
			cost: string;
			description: string;
			prerequisite?: string;
		}

		type InputTypes = "text" | "number" | "dot" | "checkbox" | "precheckbox" | "postcheckbox" | "pseudocheckbox" | "textarea" | "select";

		type CharacterSheet = CharacterSheetBlock[];

		interface CharacterSheetBlock {
			title: string;
			showTitle: boolean;
			display?: boolean;
			columns: SheetColumn[];
		}

		type SheetColumn = SheetRow[];

		interface SheetRow {
			title: string;

			showTitle?: true;
			boldTitle?: true;
			isTestable?: true;
			isReadOnly?: true;
			align?: "center" | "right";

			inputs: InputTypes[];

			// text?: {};
			// number?: {};

			// precheckbox?: {};
			// postcheckbox?: {};
			pseudocheckbox?: {
				amount: 3 | 5 | 10 | 15;
				possibleValues: string[];
			};
			checkbox?: {
				amount: 3 | 5 | 10 | 15;
			};

			dot?: {
				amount: 5 | 6 | 10 | 15;
			};

			textarea?: {
				amount: 2 | 3 | 4 | 5 | 6;
			};

			select?: {
				categories: string[];
				multi?: true;
				create?: true;
				search?: true;
				placeholder?: string;
				appendGroupValue?: true;
			};
		}

	}

}
