import { Fragment } from "react";

import { useChronicle } from "../../hooks/useChronicle";

import { SmallBox as LargeBox } from "../shared/Box";
import { Title } from "../shared/Sheet";
import { Spinner } from "../shared/Spinner";

import { ChronicleSheet } from "./chroniclewrapper/ChronicleSheet";
import { List } from "./chroniclewrapper/List";

export function ChronicleWrapper({ sheetID, removeSheet, moveSheet, chronicleData }: aut.props.ChronicleSheetWrapper): JSX.Element {
	const chronicleObject = useChronicle(chronicleData.ruleset, chronicleData.uuid);

	return (
		(chronicleData === undefined)
			? <Spinner />
			: <LargeBox>
				<Title>{chronicleObject[0].toUpperCase()} CHRONICLE</Title>

				<ChronicleSheet
					sheetID={sheetID}
					removeSheet={removeSheet}
					moveSheet={moveSheet}
					chronicleObject={chronicleObject}
				/>

				{(chronicleObject[0] !== "new")
					? <List
						chronicleUUID={chronicleObject[1].uuid.text.current}
						chronicleName={chronicleObject[1].name.text.current}
						sheetDisplayType={chronicleObject[0]}
					/>
					: <Fragment />
				}

			</LargeBox >
	);
}
