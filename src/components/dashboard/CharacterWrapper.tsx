import { useCharacter } from "../../hooks/useCharacter";

import { LargeBox } from "../shared/Box";
import { Title } from "../shared/Sheet";
import { Spinner } from "../shared/Spinner";

import { CharacterSheet } from "./characterwrapper/CharacterSheet";

export function CharacterWrapper({ sheetID, removeSheet, moveSheet, characterData }: aut.props.CharacterSheetWrapper): JSX.Element {
	const characterObject = useCharacter(characterData.ruleset, characterData.uuid);

	return (
		(characterData === undefined)
			? <Spinner />
			: <LargeBox>
				<Title>{characterObject[0].toUpperCase()} CHARACTER</Title>

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
