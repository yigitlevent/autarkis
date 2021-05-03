import { Fragment, useContext, useEffect, useState } from "react";

import { Chronicle } from "../../classes/Chronicle";

import { SheetContext } from "../../contexts/Contexts";

import { useGetChronicle } from "../../hooks/useQueries";
import { useSheetDisplayType } from "../../hooks/useSheetDisplayType";

import { Box } from "../shared/Box";
import { Title } from "../shared/Sheet";
import { Spinner } from "../shared/Spinner";

import { ChronicleSheet } from "./chroniclewrapper/ChronicleSheet";
import { List } from "./chroniclewrapper/List";

export function ChronicleWrapper(): JSX.Element {
	const { sheetUUID, sheetRuleset } = useContext(SheetContext);

	const [sheetDisplayType, switchSheetDisplayType] = useSheetDisplayType((sheetUUID) ? "view" : "new");

	const { data, status, error } = useGetChronicle(sheetUUID);

	const [chronicle, setChronicle] = useState<undefined | aut.classes.Chronicle>(undefined);

	useEffect(() => {
		if (sheetRuleset) setChronicle(new Chronicle(data, sheetRuleset));
	}, [sheetRuleset, data, status]);

	return (
		(status === "loading")
			? <Spinner />
			: <Box width={"600px"} zIndex={2}>
				<Title>{sheetDisplayType.toUpperCase()} CHRONICLE</Title>

				{(chronicle)
					? <Fragment>
						<ChronicleSheet
							sheetDisplayType={sheetDisplayType}
							chronicle={chronicle}
							switchSheetDisplayType={switchSheetDisplayType}
						/>
						{(sheetDisplayType !== "new")
							? <List chronicleUUID={chronicle.data._primary.uuid as string} sheetDisplayType={sheetDisplayType} />
							: <Fragment />
						}
					</Fragment>
					: (status === "error")
						? <span>Error: {(error as any).message}</span>
						: <Fragment />
				}
			</Box >
	);
}
