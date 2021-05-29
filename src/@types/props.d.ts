namespace aut {

	namespace props {

		interface ChronicleSheetWrapper {
			sheetID: number;
			removeSheet: (id: number) => void,
			moveSheet: (id: number, direction: "up" | "down") => void;
			chronicleData: { ruleset: aut.ruleset.Names; uuid?: string; }
		}

		interface CharacterSheetWrapper {
			sheetID: number;
			removeSheet: (id: number) => void,
			moveSheet: (id: number, direction: "up" | "down") => void;
			characterData: { ruleset: aut.ruleset.Names; uuid?: string; };
		}

		interface SheetList {
			createSheet: (category: aut.short.SheetCategory, ruleset?: aut.ruleset.Names, uuid?: string | undefined) => void;
		}

		interface SheetListRow {
			sheetData: { name: null | string; uuid: string; date: string; creator: string; ruleset: undefined | aut.ruleset.Names; category: aut.short.SheetCategory; };
			createSheet: (category: aut.short.SheetCategory, ruleset?: aut.ruleset.Names, uuid?: string | undefined) => void;
		}

		interface CharacterSheet {
			sheetID: number;
			removeSheet: (id: number) => void,
			moveSheet: (id: number, direction: "up" | "down") => void;
			characterObject: aut.hooks.UseCharacterReturns;
		}

		interface ChronicleSheet {
			sheetID: number;
			removeSheet: (id: number) => void,
			moveSheet: (id: number, direction: "up" | "down") => void;
			chronicleObject: aut.hooks.UseChronicleReturns;
		}

		interface GeneratorBox {
			ruleset?: aut.ruleset.Names;
			character: aut.classes.Character;
		}

		interface TestWrapper {
			event: React.MouseEvent<HTMLDivElement, MouseEvent>;
			characterObject: aut.hooks.UseCharacterReturns;
			setDiceRoller: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
		}







		interface Entrance {
			setIsLogin: (b: boolean) => void;
		}

		interface Box {
			children?: JSX.Element | JSX.Element[],
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

		interface CharacterList {
			chronicleUUID: string;
			chronicleName: string;
			sheetDisplayType: aut.short.SheetDisplayType;
		}

		interface SheetBlock {
			sheetDisplayType: aut.short.SheetDisplayType;
			blockData: aut.ruleset.CharacterSheetBlock;
			ruleset: aut.ruleset.Names;
			setTester: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
			changeSheetValue: (event: aut.short.Events) => void;
			changeSelected: (values: Option[], id?: string) => void;
		}

		interface SheetRow {
			sheetDisplayType: aut.short.SheetDisplayType;
			blockTitle: string;
			rowData: aut.ruleset.SheetRow;
			ruleset: aut.ruleset.Names;
			setTester: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
			changeSheetValue: (event: aut.short.Events) => void;
			changeSelected: (values: Option[], id?: string) => void;
		}

	}

}
