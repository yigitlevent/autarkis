namespace aut {

	namespace short {

		type DispSet<T> = React.Dispatch<React.SetStateAction<T>>;

		type Events = React.MouseEvent<HTMLInputElement, MouseEvent> | React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;

		type ClientState = "offline" | "signedin" | "signedout" | "presign";

		type SheetDisplayType = "new" | "edit" | "view";

		type ListChange = "add" | "remove";

		type SheetCategory = "generator" | "character" | "chronicle";

	}

	namespace props {

		interface Entrance {
			setIsLogin: (b: boolean) => void;
		}

		interface MyListRow {
			sheetData: { name: null | string; uuid: string; date: string; creator: string; ruleset: undefined | aut.ruleset.Names; category: aut.short.SheetCategory; };
		}

		interface TestWrapper {
			event: React.MouseEvent<HTMLDivElement, MouseEvent>;
			sheetDisplayType: aut.short.SheetDisplayType;
			character: aut.classes.Character;
			setTester: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
		}

		interface Box {
			children?: JSX.Element | JSX.Element[],
			width?: string;
			zIndex: number;
		}

		interface Icon {
			children?: JSX.Element;
			size: number;
			name: string;
			hover?: boolean;
			brightness?: boolean;
			float?: string;
			title?: boolean;
		}

		interface Topbox {
			children?: JSX.Element | JSX.Element[];
		}

		interface ConfirmBox {
			title: string;
			innerHTML: string | JSX.Element;
			button: string;
			callback: () => void;
			close: () => void;
		}

		interface ChronicleSheet {
			sheetDisplayType: aut.short.SheetDisplayType;
			chronicle: aut.classes.Chronicle;
			switchSheetDisplayType: (newType?: aut.short.SheetDisplayType) => void;
		}

		interface CharacterList {
			chronicleUUID: string;
			chronicleName: string;
			sheetDisplayType: aut.short.SheetDisplayType;
		}

		interface CharacterSheet {
			sheetDisplayType: aut.short.SheetDisplayType;
			character: aut.classes.Character;
			switchSheetDisplayType: (newType?: aut.short.SheetDisplayType) => void;
		}

		interface SheetBlock {
			sheetDisplayType: aut.short.SheetDisplayType;
			blockData: aut.ruleset.CharacterSheetBlock;
			ruleset: aut.ruleset.Names;
			setTester: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
			changeSheetValue: (event: aut.short.Events) => void;
		}

		interface SheetRow {
			sheetDisplayType: aut.short.SheetDisplayType;
			blockTitle: string;
			rowData: aut.ruleset.SheetRow;
			ruleset: aut.ruleset.Names;
			setTester: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
			changeSheetValue: (event: aut.short.Events) => void;
			changeSelected?: (values: Option[]) => void;
		}

	}

	namespace data {

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

	namespace theme {

		interface StyleProps extends ThemedStyledProps {
			theme: Palette;
			mainFont?: string;
			italicFont?: string;
		}

		interface Palette {
			surface: {
				background: string;
				color: string;
			};
			box: {
				background: string;
				border: string;
			};
			row: {
				background: string;
				border: string;
			};
			element: {
				background: string;
				backgroundLight: string;
				border: string;
			};
			link: {
				color: string;
			};
			success: {
				color: string;
				border: string;
			};
			warning: {
				color: string;
				border: string;
			};
			error: {
				color: string;
				border: string;
			};
			info: {
				color: string;
				border: string;
			};
			transparent: string;
		}

	}

	namespace classes {

		class Test {
			_character: aut.classes.Character;
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
			changeValue: (event: aut.short.Events) => void;
			changeSelected: (values: Option[]) => void;
			calculateProbabilities: () => aut.data.ProbabilityResult;
			roll: (offlineTest: boolean) => aut.data.TestResult;
		}

		class Generator {

		}

		class AutarkisObject {
			changeValue: (event: aut.short.Events) => void;
			placeSheetData: () => void;

			delete: () => Promise<void>;
			insert: () => Promise<void>;
			update: () => Promise<void>;
		}

		class Chronicle extends AutarkisObject {
			readonly type = "chronicle";

			data: { [key: string]: { [key: string]: Text | Switch; }; } = {};
		}

		class Character extends AutarkisObject {
			readonly type = "character";
			readonly editable: boolean;

			data: {
				[key: string]: {
					[key: string]: {
						[key: string]: Text | Switch | Dot | Checkbox | PreCheckbox | PseudoCheckbox | Textarea;
					};
				};
			} = {};

			export: (event: React.FormEvent<HTMLInputElement>) => void;
			import: (event: React.ChangeEvent<HTMLInputElement>) => void;
		}

		class PreCheckbox {
			current: boolean;
		}

		class Text {
			current: string;
		}

		class Switch {
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

		class StringArray {
			current: string[];
		}

	}

	namespace ruleset {

		type Names = "v5_modern";

		type TestFunction = (testData: aut.data.TestData) => aut.data.TestResult;
		type ProbabilityFunction = (testData: aut.data.TestData) => aut.data.ProbabilityResult;

		interface Ruleset<Character> {
			basics: aut.ruleset.Basics;
			character: Character;
			characterSheet: aut.ruleset.CharacterSheetLayout;
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

		type DefaultValue = [string] | [string, string, aut.ruleset.InputTypes] | [string, string, "pseudocheckbox", string, "unmarked" | "count" | "count/3"];

		interface TestSheetExtras {
			addTo?: string;
			isPool?: true;
			difficulty?: true;
			defaultChecked?: true;
			defaultValue?: aut.ruleset.DefaultValue;
		}

		interface Basics {
			[key: string]: string[] | { [key: string]: string; },
			pseudoCheckboxInputs: { [key: string]: string; };
			attributes: string[];
			skills: string[];
			disciplines: string[];
		}

		type CharacterSheetLayout = CharacterSheetBlock[];

		interface CharacterSheetBlock {
			title: string;
			showTitle: boolean;
			columns: ShetColumn[];
		}

		type ShetColumn = SheetRow[];

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

			dot?: {
				amount: 5 | 6 | 10 | 15;
			};

			checkbox?: {
				amount: 3 | 5 | 10 | 15;
			};

			pseudocheckbox?: {
				amount: 3 | 5 | 10 | 15;
				possibleValues: string[];
			};

			textarea?: {
				amount: 2 | 3 | 4 | 5 | 6;
			};

			select?: {
				categories: string[];
			};
		}

		type InputTypes = "text" | "number" | "dot" | "checkbox" | "precheckbox" | "postcheckbox" | "pseudocheckbox" | "textarea" | "select";

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

	}

	namespace server {

		type OutputColor = "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white";

		type TableName = "users" | "chronicles" | "characters";

		interface ResponseData {
			success: "error" | "success" | "single" | "data";
			data: aut.server.ResponseDataTypes;
		}

		type ResponseDataTypes = null | string | string[] | aut.server.Chronicle | aut.server.Chronicle[] | aut.server.Character | aut.server.Character[];

		interface Validation {
			username: string,
			errors: any[];
		}

		interface Chronicle {
			uuid: string;
			name: string;
			storyteller_name: string;
			storyteller_uuid: string;
			ruleset: aut.ruleset.Names;
			discord_enabled: boolean;
			discord_server: string;
			discord_channel: string;
			created_at: string;
			updated_at: string;
		}

		interface Character {
			uuid: string;
			name: string;
			player_name: string;
			player_uuid: string;
			data: aut.classes.Character;
			ruleset: aut.ruleset.Names;
			editable: boolean;
			chronicle_uuid: string;
			chronicle_name: string;
			created_at: string;
			updated_at: string;
		}
	}
}
