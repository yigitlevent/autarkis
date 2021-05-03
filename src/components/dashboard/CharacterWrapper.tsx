import { Fragment, useContext, useEffect, useState } from "react";

import { Character } from "../../classes/Character";

import { SheetContext } from "../../contexts/Contexts";

import { useGetCharacter } from "../../hooks/useQueries";
import { useSheetDisplayType } from "../../hooks/useSheetDisplayType";

import { Box } from "../shared/Box";
import { Title } from "../shared/Sheet";
import { Spinner } from "../shared/Spinner";

import { CharacterSheet } from "./characterwrapper/CharacterSheet";

export function CharacterWrapper(): JSX.Element {
	const { sheetUUID, sheetRuleset } = useContext(SheetContext);

	const [sheetDisplayType, switchSheetDisplayType] = useSheetDisplayType((sheetUUID) ? "view" : "new");

	const { data, status, error } = useGetCharacter(sheetUUID);

	const [character, setCharacter] = useState<undefined | aut.classes.Character>(undefined);

	useEffect(() => {
		if (sheetRuleset) setCharacter(new Character(data, sheetRuleset));
	}, [sheetRuleset, data, status]);

	return (
		(status === "loading")
			? <Spinner />
			: <Box width={"1000px"} zIndex={2}>
				<Title>{sheetDisplayType.toUpperCase()} CHARACTER</Title>

				{(character)
					? <CharacterSheet
						sheetDisplayType={sheetDisplayType}
						character={character}
						switchSheetDisplayType={switchSheetDisplayType}
					/>
					: (status === "error")
						? <span>Error: {(error as any).message}</span>
						: <Fragment />
				}
			</Box>
	);
}
