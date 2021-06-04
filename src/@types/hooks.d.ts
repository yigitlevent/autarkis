namespace aut {

	namespace hooks {

		type UseSheetReturns = {
			displayType: aut.SheetDisplayType;
			data: aut.data.GenericData;
			setDisplayType: (newDisplayType?: aut.SheetDisplayType | undefined) => void;
			newRevision: React.DispatchWithoutAction;
			database: {
				insert: () => Promise<void>;
				update: () => Promise<void>;
				remove: () => Promise<void>;
			};
			isLoaded: boolean;
		};

		interface Sheet {
			id: number;
			category: aut.SheetCategory | string;
			ruleset: aut.ruleset.Names;
			uuid?: string;
			characterData?: aut.data.GenericData;
		}

		type SheetsList = Sheet[];

		interface SheetMethods {
			add: ({ category, ruleset, uuid, characterData }: { category: aut.SheetCategory | string; ruleset: aut.ruleset.Names; uuid?: string; characterData?: aut.data.GenericData; }) => void,
			remove: (id: number) => void,
			move: (id: number, direction: "up" | "down") => void,
			get: (sheetID: number) => Sheet | undefined;
		}

		type UseSheetsReturns = [
			SheetsList,
			SheetMethods
		];

	}

}
