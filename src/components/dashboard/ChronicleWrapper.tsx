import { useSheet } from "../../hooks/useSheet";

import { SmallBox as LargeBox } from "../shared/Box";
import { Title } from "../shared/Sheet";
import { Spinner } from "../shared/Spinner";

import { ChronicleSheet } from "./chroniclewrapper/ChronicleSheet";

export function ChronicleWrapper({ sheetID, removeSheet, moveSheet, ruleset, uuid }: aut.props.ChronicleSheetWrapper): JSX.Element {
	const chronicleObject = useSheet("chronicle", ruleset, uuid);

	return (
		(!chronicleObject.isLoaded)
			? <Spinner />
			: <LargeBox>
				<Title>{chronicleObject.displayType.toUpperCase()} CHRONICLE</Title>

				<ChronicleSheet
					sheetID={sheetID}
					removeSheet={removeSheet}
					moveSheet={moveSheet}
					chronicleObject={chronicleObject}
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
