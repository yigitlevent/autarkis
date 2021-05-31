import { useCharacter } from "../../hooks/useCharacter";

import { LargeBox } from "../shared/Box";
import { Title } from "../shared/Sheet";
import { Spinner } from "../shared/Spinner";

import { CharacterSheet } from "./characterwrapper/CharacterSheet";

export function CharacterWrapper({ sheetID, removeSheet, moveSheet, ruleset, uuid }: aut.props.CharacterSheetWrapper): JSX.Element {
	const [displayType, data, setters, database, isLoaded] = useCharacter(sheetID, ruleset, uuid);

	return (
		(!isLoaded)
			? <Spinner />
			: <LargeBox>
				<Title>{displayType.toUpperCase()} CHARACTER</Title>

				<CharacterSheet
					sheetID={sheetID}
					removeSheet={removeSheet}
					moveSheet={moveSheet}
					characterObject={[displayType, data, setters, database, isLoaded]}
				/>

				{/*TODO: (category === "generator")
					? <GeneratorBox ruleset={ruleset} character={character} />
					: <Fragment />
				*/}

			</LargeBox>
	);
}
