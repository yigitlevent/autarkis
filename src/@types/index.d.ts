namespace aut {

	namespace short {

		type DispSet<T> = React.Dispatch<React.SetStateAction<T>>;

		type Events = React.MouseEvent<HTMLInputElement, MouseEvent> | React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;

		type ClientState = "offline" | "loggedin" | "loggedout" | "precheck";

		type SheetDisplayType = "new" | "edit" | "view";

		type ListChange = "add" | "remove";

		type RollTypes = "attributes" | "skills" | "disciplines" | "standard" | "rouse_check" | "willpower" | "humanity" | "compulsion";

	}

	namespace props {

		interface Entrance {
			setIsLogin: (b: boolean) => void;
		}

		interface MyListRow {
			sheetData: { name: null | string; uuid: string; date: string; creator: string; ruleset: undefined | aut.ruleset.Names; type: "character" | "chronicle"; };
		}

		interface DiceRoller {
			event: React.MouseEvent<HTMLDivElement, MouseEvent>;
			character: undefined | aut.classes.Character;
			setDiceRoller: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
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
			title: string;
			formRef?: React.RefObject<HTMLFormElement>;
			otherChildren?: JSX.Element | JSX.Element[];
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
			sheetDisplayType: aut.short.SheetDisplayType;
		}

		interface CharacterSheet {
			sheetDisplayType: aut.short.SheetDisplayType;
			character: aut.classes.Character;
			switchSheetDisplayType: (newType?: aut.short.SheetDisplayType) => void;
		}

		interface SheetBlock {
			sheetDisplayType: aut.short.SheetDisplayType;
			blockData: aut.ruleset.SheetBlock;
			setDiceRoller: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
			changeSheetValue: (event: aut.short.Events) => void;
		}

		interface SheetRow {
			sheetDisplayType: aut.short.SheetDisplayType;
			blockTitle: string;
			rowData: aut.ruleset.SheetRow;
			setDiceRoller: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
			changeSheetValue: (event: aut.short.Events) => void;
		}

	}

	namespace data {

		interface Roll {
			results: number[];
			successes: number;
			tens: number;
			ones: number;
		}

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

	namespace request {

		type Types = aut.request.user.Register | aut.request.user.Login |
		aut.request.chronicle.NewOrEdit | aut.request.chronicle.DeleteOrGet | aut.request.chronicle.CharacterAddOrRemove |
		aut.request.character.NewOrEdit | aut.request.character.DeleteOrGet | aut.request.character.SwitchEditable |
		aut.request.dice.Roll;

		namespace user {

			interface Register {
				username: string;
				email: string;
				password: string;
				passwordrepeat: string;
				"g-recaptcha-response": string;
			}

			interface Login {
				username: string;
				password: string;
				"g-recaptcha-response": string;
			}

		}

		namespace chronicle {

			interface NewOrEdit {
				chroName: string;
				chroKey: string;
				discordEnabled: boolean;
				discordServer: string;
				discordChannel: string;
			}

			interface CharacterAddOrRemove {
				chroKey: string;
				charKey: string;
			}

			interface DeleteOrGet {
				chroKey: string;
			}

		}

		namespace character {

			interface NewOrEdit {
				charName: string;
				charKey: string;
				charData: string;
			}

			interface DeleteOrGet {
				charKey: string;
			}

			interface SwitchEditable {
				charKey: string;
				editable: boolean;
			}

		}

		namespace dice {

			interface Roll {
				charName: string;
				charKey: string;
				title: string;
				normalResults: string;
				hungerResults: string;
				results: string;
				difficulty: string;
				infoRouse: string,
				infoWillpower: string;
			}

		}

	}

	namespace classes {

		class AutarkisObject {
			changeValue: (event: aut.short.Events) => void;
			placeSheetData: () => void;

			export: (event: React.FormEvent<HTMLInputElement>) => void;
			import: (event: React.ChangeEvent<HTMLInputElement>) => void;

			delete: () => Promise<void>;
			submit: (displayType: aut.short.SheetDisplayType) => Promise<void>;
		}

		class Chronicle extends AutarkisObject {
			readonly type = "chronicle";

			data: {
				[key: string]: {
					[key: string]: boolean | string | string[] | any[];
				};
			} = {};
		}

		class Character extends AutarkisObject {
			readonly type = "character";
			readonly editable: boolean;

			data: {
				[key: string]: {
					[key: string]: {
						[key: string]: Text | Dot | Checkbox | PreCheckbox | PseudoCheckbox | Textarea;
					};
				};
			} = {};

			rollStandard: (title: string, difficulty: number, pool: number, hasHunger: boolean, hasSurge: boolean, rouse: number, offline: boolean) => string;
			rollCheck: (title: string, difficulty: number, pool: number, offline: boolean) => string;
			rollCompulsion: (title: string, offline: boolean) => string;
		}

		class PreCheckbox {
			current: boolean;
		}

		class Text {
			current: string;
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

		type Names = "v5Modern";

		interface Ruleset<Chronicle, Character> {
			chronicle: Chronicle;
			character: Character;
			basics: aut.ruleset.Basics;
			characterSheet: aut.ruleset.SheetLayout;
			misc: {
				[key: string]: any;
			};
		}

		interface Basics {
			pseudoCheckboxInputs: { [key: string]: string; };
			attributes: string[];
			skills: string[];
			disciplines: string[];
		}

		type SheetLayout = SheetBlock[];

		interface SheetBlock {
			title: string;
			showTitle: boolean;
			columns: SheetColumn[];
		}

		type SheetColumn = SheetRow[];

		interface SheetRow {
			title: string;

			showTitle?: true;
			boldTitle?: true;
			isRollable?: true;
			isReadOnly?: true;
			align?: "center" | "right";

			inputs: InputTypes[];

			// text?: {};
			dot?: {
				amount: 5 | 6 | 10 | 15;
			};
			checkbox?: {
				amount: 3 | 5 | 10 | 15;
			};
			// precheckbox?: {};
			pseudocheckbox?: {
				amount: 3 | 5 | 10 | 15;
				possibleValues: string[];
			};
			textarea?: {
				amount: 2 | 3 | 4 | 5 | 6;
			};
		}

		type InputTypes = "text" | "dot" | "checkbox" | "precheckbox" | "pseudocheckbox" | "textarea";

		type BloodPotency = BloodPotencyRow[];

		interface BloodPotencyRow {
			[key: string]: number | string;
			bloodSurge: number;
			mendAmount: number;
			powerBonus: number;
			rouseCheck: number;
			baneSeverity: number;
			feedingPenalty: string;
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
			id: number;
			uuid: string;
			name: string;
			creator: string;
			ruleset: aut.ruleset.Names;
			discord_enabled: boolean;
			discord_server: string;
			discord_channel: string;
			created_at: string;
			updated_at: string;
		}

		interface Character {
			id: number;
			uuid: string;
			name: string;
			creator: string;
			data: string;
			ruleset: aut.ruleset.Names;
			editable: boolean;
			chronicle_uuid: string;
			chronicle_name: string;
			created_at: string;
			updated_at: string;
		}

	}

}
