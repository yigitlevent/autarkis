import { useState } from "react";

export function useSheetDisplayType(initial?: aut.short.SheetDisplayType): [aut.short.SheetDisplayType, (newDisplayType?: aut.short.SheetDisplayType) => void] {
	const [sheetDisplayType, setSheetDisplayType] = useState<aut.short.SheetDisplayType>((initial) ? initial : "new");

	const switchSheetDisplayType = (newType?: aut.short.SheetDisplayType): void => {
		if (newType) { setSheetDisplayType(newType); }
		else if (sheetDisplayType === "edit") { setSheetDisplayType("view"); }
		else if (sheetDisplayType === "view") { setSheetDisplayType("edit"); }
	};

	return [sheetDisplayType, switchSheetDisplayType];
}
