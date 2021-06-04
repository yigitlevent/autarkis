import { useCallback, useState } from "react";

export function useSheets(): aut.hooks.UseSheetsReturns {
	const [counter, setCounter] = useState(0);
	const [sheets, setSheets] = useState<aut.hooks.SheetsList>([]);

	const removeSheet = useCallback((id: number): void => {
		const tempArray = sheets;
		tempArray.splice(sheets.findIndex((e) => e.id === id), 1);
		setSheets([...tempArray]);
	}, [sheets]);

	const moveSheet = useCallback((id: number, direction: "up" | "down"): void => {
		const tempArray = sheets;
		const leftIndex = tempArray.findIndex((e) => e.id === id);

		if (sheets.length > 1 && leftIndex > -1) {
			const tempEl = tempArray[leftIndex];

			if (direction === "up" && tempArray[leftIndex - 1]) {
				tempArray[leftIndex] = tempArray[leftIndex - 1];
				tempArray[leftIndex - 1] = tempEl;
			}
			else if (direction === "down" && tempArray[leftIndex + 1]) {
				tempArray[leftIndex] = tempArray[leftIndex + 1];
				tempArray[leftIndex + 1] = tempEl;
			}

			setSheets([...tempArray]);
		}
	}, [sheets]);

	const addSheet = useCallback(({ category, ruleset, uuid, characterData }: { category: aut.SheetCategory | string, ruleset: aut.ruleset.Names; uuid?: string; characterData?: aut.data.GenericData; }): void => {
		setSheets([{ id: counter, category, ruleset, uuid, characterData }, ...sheets]);
		setCounter(counter + 1);
	}, [counter, sheets]);

	const getSheet = useCallback((sheetID: number): aut.hooks.Sheet | undefined => {
		return sheets.find((x) => x.id === sheetID);
	}, [sheets]);

	return [sheets, { add: addSheet, remove: removeSheet, move: moveSheet, get: getSheet }];
}
