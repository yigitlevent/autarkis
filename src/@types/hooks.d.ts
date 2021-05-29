namespace aut {

	namespace hooks {

		type UseCharacterReturns = [
			aut.short.SheetDisplayType,
			aut.short.GenericCharacterData,
			{
				setDisplayType: (newDisplayType?: aut.short.SheetDisplayType | undefined) => void,
				changeValue: (event: aut.short.Events) => void,
				changeSelected: (options: rbs.Option[], id: string) => void;
			},
			{
				insert: () => Promise<void>,
				update: () => Promise<void>,
				remove: () => Promise<void>;
			}
		];

		type UseChronicleReturns = [
			aut.short.SheetDisplayType,
			aut.short.GenericChronicleData,
			{
				setDisplayType: (newDisplayType?: aut.short.SheetDisplayType | undefined) => void,
				changeValue: (event: aut.short.Events) => void;
			},
			{
				insert: () => Promise<void>,
				update: () => Promise<void>,
				remove: () => Promise<void>;
			}
		];

	}

}
