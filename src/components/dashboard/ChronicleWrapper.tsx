import { useSheet } from "../../hooks/useSheet";

import { SmallBox } from "../shared/Box";
import { Spinner } from "../shared/Spinner";

import { WrapperTitle } from "./wrapper/WrapperTitle";
import { ChronicleSheet } from "./chroniclewrapper/ChronicleSheet";

export function ChronicleWrapper({ sheetID, sheet, ruleset, uuid }: aut.props.SheetWrapper): JSX.Element {
	const chronicleObject = useSheet("chronicle", ruleset, uuid);

	return (
		(!chronicleObject.isLoaded)
			? <Spinner />
			: <SmallBox>

				<WrapperTitle
					sheetID={sheetID}
					sheet={sheet}
					category={"chronicle"}
					object={chronicleObject}
				/>

				<ChronicleSheet
					sheetID={sheetID}
					sheet={sheet}
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

			</SmallBox >
	);
}
