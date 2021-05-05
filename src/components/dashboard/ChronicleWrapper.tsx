import { Fragment, useContext, useEffect, useState } from "react";

import { Chronicle } from "../../classes/Chronicle";

import { SheetContext } from "../../contexts/Contexts";

import { DatabaseClient } from "../../hooks/useQueries";
import { useSheetDisplayType } from "../../hooks/useSheetDisplayType";

import { Box } from "../shared/Box";
import { Title } from "../shared/Sheet";
import { Spinner } from "../shared/Spinner";

import { ChronicleSheet } from "./chroniclewrapper/ChronicleSheet";
import { List } from "./chroniclewrapper/List";

export function ChronicleWrapper(): JSX.Element {
	const { sheetUUID, sheetRuleset } = useContext(SheetContext);

	const [sheetDisplayType, switchSheetDisplayType] = useSheetDisplayType((sheetUUID) ? "view" : "new");

	const [chronicle, setChronicle] = useState<undefined | aut.classes.Chronicle>(undefined);

	useEffect(() => {
		if (sheetRuleset) {
			if (sheetUUID) {
				DatabaseClient.from("chronicles").select("*").eq("uuid", sheetUUID).single()
					.then((response) => {
						if (response.error) { }
						else { setChronicle(new Chronicle(response.data, sheetRuleset)); }
					});
			}
			else {
				setChronicle(new Chronicle(undefined, sheetRuleset));
			}
		}
	}, [sheetRuleset, sheetUUID]);

	return (
		(chronicle === undefined)
			? <Spinner />
			: <Box width={"600px"} zIndex={2}>
				<Title>{sheetDisplayType.toUpperCase()} CHRONICLE</Title>
				<ChronicleSheet
					sheetDisplayType={sheetDisplayType}
					chronicle={chronicle}
					switchSheetDisplayType={switchSheetDisplayType}
				/>
				{(sheetDisplayType !== "new")
					? <List
						chronicleUUID={chronicle.data.uuid.text.current as string}
						chronicleName={chronicle.data.name.text.current as string}
						sheetDisplayType={sheetDisplayType}
					/>
					: <Fragment />
				}
			</Box >
	);
}
