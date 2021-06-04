import { useEffect } from "react";
import { useSheet } from "../../hooks/useSheet";

import { LargeBox } from "../shared/Box";
import { Spinner } from "../shared/Spinner";

import { WrapperTitle } from "./wrapper/WrapperTitle";
import { CharacterSheet } from "./characterwrapper/CharacterSheet";

export function CharacterWrapper({ sheetID, sheet, ruleset, uuid }: aut.props.SheetWrapper): JSX.Element {
	const characterObject = useSheet("character", ruleset, uuid);

	useEffect(() => {
		console.log("CharacterWrapper");
	}, [characterObject]);

	return (
		(!characterObject.isLoaded)
			? <Spinner />
			: <LargeBox>

				<WrapperTitle
					sheetID={sheetID}
					sheet={sheet}
					category={"character"}
					object={characterObject}
				/>

				<CharacterSheet
					sheetID={sheetID}
					sheet={sheet}
					characterObject={characterObject}
				/>
			</LargeBox>
	);
}
