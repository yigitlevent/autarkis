import { useState } from "react";

export function useSheetDisplayType(initial?: aut.SheetDisplayType): [aut.SheetDisplayType, (newDisplayType?: aut.SheetDisplayType) => void] {
	const [sheetDisplayType, setSheetDisplayType] = useState<aut.SheetDisplayType>((initial) ? initial : "new");

	const switchSheetDisplayType = (newType?: aut.SheetDisplayType): void => {
		if (newType) { setSheetDisplayType(newType); }
		else if (sheetDisplayType === "edit") { setSheetDisplayType("view"); }
		else if (sheetDisplayType === "view") { setSheetDisplayType("edit"); }
	};

	return [sheetDisplayType, switchSheetDisplayType];
}
