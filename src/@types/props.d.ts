namespace aut {

	namespace props {

		interface ChronicleSheetWrapper {
			sheetID: number;
			removeSheet: (id: number) => void,
			moveSheet: (id: number, direction: "up" | "down") => void;
			ruleset: aut.ruleset.Names;
			uuid?: string;
		}

		interface CharacterSheetWrapper {
			sheetID: number;
			removeSheet: (id: number) => void,
			moveSheet: (id: number, direction: "up" | "down") => void;
			ruleset: aut.ruleset.Names;
			uuid?: string;
		}

		interface SheetList {
			createSheet: (category: aut.SheetCategory, ruleset?: aut.ruleset.Names, uuid?: string | undefined) => void;
		}

		interface SheetListRow {
			sheetData: { name: null | string; uuid: string; date: string; creator: string; ruleset: undefined | aut.ruleset.Names; category: aut.SheetCategory; };
			createSheet: (category: aut.SheetCategory, ruleset?: aut.ruleset.Names, uuid?: string | undefined) => void;
		}

		interface CharacterSheet {
			sheetID: number;
			removeSheet: (id: number) => void,
			moveSheet: (id: number, direction: "up" | "down") => void;
			characterObject: aut.hooks.UseSheetReturns;
		}

		interface ChronicleSheet {
			sheetID: number;
			removeSheet: (id: number) => void,
			moveSheet: (id: number, direction: "up" | "down") => void;
			chronicleObject: aut.hooks.UseSheetReturns;
		}

		interface GeneratorBox {
			characterObject: aut.hooks.UseSheetReturns;
		}

		interface TestWrapper {
			event: React.MouseEvent<HTMLDivElement, MouseEvent>;
			characterObject: aut.hooks.UseSheetReturns;
			setDiceRoller: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
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

		interface ConfirmBox {
			title: string;
			innerHTML: string | JSX.Element;
			button: string;
			callback?: () => void;
			close?: () => void;
		}

		interface CharacterList {
			chronicleUUID: string;
			chronicleName: string;
			sheetDisplayType: aut.SheetDisplayType;
		}

		interface SheetColumn {
			sheetID: number;
			blockData: aut.sheet.SheetBlock;
			ruleset: aut.ruleset.Names;
			setTester?: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
			sheetObject: aut.hooks.UseSheetReturns;
		}

		interface SheetRow {
			sheetID: number;
			blockTitle: string;
			rowData: aut.sheet.SheetRow;
			ruleset: aut.ruleset.Names;
			setTester?: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
			sheetObject: aut.hooks.UseSheetReturns;
		}

	}

}
