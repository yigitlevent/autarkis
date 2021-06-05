namespace aut {

	namespace props {

		interface SheetWrapper {
			sheetID: number;
			sheet: aut.hooks.SheetMethods;
			ruleset: aut.ruleset.Names;
			uuid?: string;
		}

		interface TestWrapper {
			sheetID: number;
			sheet: aut.hooks.SheetMethods;
			characterData: aut.data.GenericData;
		}

		interface SheetList {
			category: aut.SheetCategory;
			tableName: aut.server.TableNames;
			createSheet: (category: aut.SheetCategory, ruleset?: aut.ruleset.Names, uuid?: string) => void;
		}

		interface SheetListRow {
			sheetData: { name: null | string; uuid: string; date: string; creator: string; ruleset: undefined | aut.ruleset.Names; category: aut.SheetCategory; };
			createSheet: (category: aut.SheetCategory, ruleset?: aut.ruleset.Names, uuid?: string) => void;
		}

		interface Sheet {
			sheetID: number;
			sheet: aut.hooks.SheetMethods;
		}

		interface WrapperTitle extends Sheet {
			category: aut.SheetCategory;
			object: aut.hooks.UseSheetReturns;
		}

		interface CharacterSheet extends Sheet {
			characterObject: aut.hooks.UseSheetReturns;
		}

		interface CampaignSheet extends Sheet {
			campaignObject: aut.hooks.UseSheetReturns;
		}

		interface GeneratorBox {
			characterObject: aut.hooks.UseSheetReturns;
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
			campaignUUID: string;
			campaignName: string;
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
