namespace aut {

	namespace short {

		type DispSet<T> = React.Dispatch<React.SetStateAction<T>>;

		type Events = React.MouseEvent<HTMLInputElement, MouseEvent> | React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;

		type ClientState = "offline" | "signedin" | "signedout" | "presign";

		type SheetDisplayType = "new" | "edit" | "view";

		type ListChange = "add" | "remove";

		type SheetCategory = "generator" | "character" | "chronicle";

		interface GenericCharacterData {
			[key: string]: {
				[key: string]: {
					text: aut.classes.Text;
					toggle: aut.classes.Toggle;
					dot: aut.classes.Dot;
					checkbox: aut.classes.Checkbox;
					pseudocheckbox: aut.classes.PseudoCheckbox;
					textarea: aut.classes.Textarea;
					select: aut.classes.Select;
				};
			};
		}

		interface GenericCharacterDataLayout {
			[key: string]: {
				[key: string]: {
					[key: string]: Text | Toggle | Dot | Checkbox | PseudoCheckbox | Textarea | Select;
				};
			};
		}

		interface GenericChronicleData {
			[key: string]: { [key: string]: Text | Toggle; };
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

	namespace classes {

		class Test {
			_data: aut.short.GenericCharacterData;
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

		class AutarkisObject {
			readonly uuid?: string;
			readonly ruleset?: string;

			changeValue: (event: aut.short.Events) => void;
			placeSheetData: () => void;

			delete: () => Promise<void>;
			insert: () => Promise<void>;
			update: () => Promise<void>;
		}

		class Chronicle extends AutarkisObject {
			readonly type = "chronicle";

			data: aut.short.GenericChronicleData = {};
		}

		class Character extends AutarkisObject {
			readonly type = "character";
			readonly editable: boolean;

			data: aut.short.GenericCharacterData = {};

			changeSelected: (event: Option[], id: string) => void;

			export: (event: React.FormEvent<HTMLInputElement>) => void;
			import: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
			data: aut.short.GenericCharacterData;
			ruleset: aut.ruleset.Names;
			editable: boolean;
			chronicle_uuid: string;
			chronicle_name: string;
			created_at: string;
			updated_at: string;
		}
	}
}
