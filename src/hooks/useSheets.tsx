import { useCallback, useState } from "react";

import { CharacterWrapper } from "../components/dashboard/CharacterWrapper";
import { ChronicleWrapper } from "../components/dashboard/ChronicleWrapper";

type SheetsList = {
	id: number;
	data: {
		category: aut.SheetCategory,
		ruleset: aut.ruleset.Names,
		uuid?: string;
	};
	element: JSX.Element;
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
		setSheets(tempArray);
	}, [sheets]);

	const moveSheet = useCallback((id: number, direction: "up" | "down"): void => {
		const tempArray = sheets;
		const leftIndex = sheets.findIndex((e) => e.id === id);
		const tempEl = sheets[leftIndex];
		tempArray[leftIndex] = tempArray[leftIndex + ((direction === "down") ? 1 : -1)];
		tempArray[leftIndex + ((direction === "down") ? -1 : 1)] = tempEl;
		setSheets(tempArray);
	}, [sheets]);

	const addSheet = useCallback((category: aut.SheetCategory, ruleset: aut.ruleset.Names, uuid?: string): void => {
		if (category === "chronicle") {
			setSheets([
				{
					id: counter + 1,
					data: { category, ruleset, uuid },
					element: <ChronicleWrapper
						key={counter + 1}
						sheetID={counter + 1}
						chronicleData={{ ruleset, uuid }}
						removeSheet={removeSheet}
						moveSheet={moveSheet}
					/>
				},
				...sheets
			]);
		}
		else {
			setSheets([
				{
					id: counter + 1, 
					data: { category, ruleset, uuid },
					element: <CharacterWrapper
						key={counter + 1}
						sheetID={counter + 1}
						characterData={{ ruleset, uuid }}
						removeSheet={removeSheet}
						moveSheet={moveSheet}
					/>
				},
				...sheets
			]);
		}

		setCounter(counter + 1);
	}, [counter, moveSheet, removeSheet, sheets]);

	return [sheets, addSheet, removeSheet, moveSheet];
}
