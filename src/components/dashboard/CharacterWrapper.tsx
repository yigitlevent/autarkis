import { useContext, useEffect, useState } from "react";

import { Character } from "../../classes/Character";

import { SheetContext } from "../../contexts/Contexts";

import { DatabaseClient } from "../../hooks/useQueries";
import { useSheetDisplayType } from "../../hooks/useSheetDisplayType";

import { Box } from "../shared/Box";
import { Title } from "../shared/Sheet";
import { Spinner } from "../shared/Spinner";

import { CharacterSheet } from "./characterwrapper/CharacterSheet";

export function CharacterWrapper(): JSX.Element {
	const { sheetUUID, sheetRuleset } = useContext(SheetContext);

	const [sheetDisplayType, switchSheetDisplayType] = useSheetDisplayType((sheetUUID) ? "view" : "new");

	const [character, setCharacter] = useState<undefined | aut.classes.Character>(undefined);

	useEffect(() => {
		if (sheetRuleset) {
			if (sheetUUID) {
				DatabaseClient.from("characters").select("*").eq("uuid", sheetUUID).single()
					.then((response) => {
						if (response.error) { }
						else { setCharacter(new Character(response.data, sheetRuleset)); }
					});
			}
			else {
				setCharacter(new Character(undefined, sheetRuleset));
			}
		}
	}, [sheetRuleset, sheetUUID]);

	return (
		(character === undefined)
			? <Spinner />
			: <Box width={"1000px"} zIndex={2}>
				<Title>{sheetDisplayType.toUpperCase()} CHARACTER</Title>
				<CharacterSheet
					sheetDisplayType={sheetDisplayType}
					character={character}
					switchSheetDisplayType={switchSheetDisplayType}
				/>
			</Box>
	);
}
