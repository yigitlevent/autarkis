import { useChronicle } from "../../hooks/useChronicle";

import { SmallBox as LargeBox } from "../shared/Box";
import { Title } from "../shared/Sheet";
import { Spinner } from "../shared/Spinner";

import { ChronicleSheet } from "./chroniclewrapper/ChronicleSheet";

export function ChronicleWrapper({ sheetID, removeSheet, moveSheet, ruleset, uuid }: aut.props.ChronicleSheetWrapper): JSX.Element {
	const [displayType, data, setters, database, isLoaded] = useChronicle(sheetID, ruleset, uuid);

	return (
		(!isLoaded)
			? <Spinner />
			: <LargeBox>
				<Title>{displayType.toUpperCase()} CHRONICLE</Title>

				<ChronicleSheet
					sheetID={sheetID}
					removeSheet={removeSheet}
					moveSheet={moveSheet}
					chronicleObject={[displayType, data, setters, database, isLoaded]}
				/>

				{/*(displayType !== "new")
					? <List
						chronicleUUID={data.uuid.text.current}
						chronicleName={data.name.text.current}
						sheetDisplayType={displayType}
					/>
					: <Fragment />
				*/}

			</LargeBox >
	);
}
