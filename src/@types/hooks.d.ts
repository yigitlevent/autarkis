namespace aut {

	namespace hooks {

		type UseSheetReturns = {
			displayType: aut.SheetDisplayType,
			data: aut.data.GenericData,
			setDisplayType: (newDisplayType?: aut.SheetDisplayType | undefined) => void,
			database: {
				insert: () => Promise<void>,
				update: () => Promise<void>,
				remove: () => Promise<void>;
			},
			isLoaded: boolean;
		};

	}

}
