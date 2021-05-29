namespace aut {

	namespace hooks {

		type UseCharacterReturns = [
			aut.SheetDisplayType,
			aut.GenericCharacterData,
			{
				setDisplayType: (newDisplayType?: aut.SheetDisplayType | undefined) => void,
				changeValue: (event: aut.Events) => void,
				changeSelected: (options: rbs.Option[], id: string) => void;
			},
			{
				insert: () => Promise<void>,
				update: () => Promise<void>,
				remove: () => Promise<void>;
			}
		];

		type UseChronicleReturns = [
			aut.SheetDisplayType,
			aut.GenericChronicleData,
			{
				setDisplayType: (newDisplayType?: aut.SheetDisplayType | undefined) => void,
				changeValue: (event: aut.Events) => void;
			},
			{
				insert: () => Promise<void>,
				update: () => Promise<void>,
				remove: () => Promise<void>;
			}
		];

	}

}
