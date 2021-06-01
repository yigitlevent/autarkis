import { useSheet } from "../../hooks/useSheet";

import { LargeBox } from "../shared/Box";
import { Title } from "../shared/Sheet";
import { Spinner } from "../shared/Spinner";

import { CharacterSheet } from "./characterwrapper/CharacterSheet";

export function CharacterWrapper({ sheetID, removeSheet, moveSheet, ruleset, uuid }: aut.props.CharacterSheetWrapper): JSX.Element {
	const characterObject = useSheet("character", ruleset, uuid);

	console.log(characterObject);

	return (
		(!characterObject.isLoaded)
			? <Spinner />
			: <LargeBox>
				<Title>{characterObject.displayType.toUpperCase()} CHARACTER</Title>

				<CharacterSheet
					sheetID={sheetID}
					removeSheet={removeSheet}
					moveSheet={moveSheet}
					characterObject={characterObject}
				/>

				{/*TODO: (category === "generator")
					? <GeneratorBox ruleset={ruleset} character={character} />
					: <Fragment />
				*/}

			</LargeBox>
	);
}
