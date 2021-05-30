import { useCallback,  useState } from "react";

type SheetsList = {
	id: number;
	category: aut.SheetCategory,
	ruleset: aut.ruleset.Names,
	uuid?: string;
}[];

type UseSheetsReturns = [
	SheetsList,
	(category: aut.SheetCategory, ruleset: aut.ruleset.Names, uuid?: string) => void,
	(id: number) => void,
	(id: number, direction: "up" | "down") => void
];

export function useSheets(): UseSheetsReturns {
	const [counter, setCounter] = useState(0);
	const [sheets, setSheets] = useState<SheetsList>([]);

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

	const addSheet = useCallback((category: aut.SheetCategory, ruleset: aut.ruleset.Names, uuid?: string): void => {
		setSheets([{ id: counter, category, ruleset, uuid }, ...sheets]);
		setCounter(counter + 1);
	}, [counter, sheets]);

	return [sheets, addSheet, removeSheet, moveSheet];
}
