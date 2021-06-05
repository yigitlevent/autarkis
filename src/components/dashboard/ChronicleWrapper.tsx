import { useSheet } from "../../hooks/useSheet";

import { SmallBox } from "../shared/Box";
import { Spinner } from "../shared/Spinner";

import { WrapperTitle } from "./wrapper/WrapperTitle";
import { ChronicleSheet } from "./chroniclewrapper/ChronicleSheet";

export function ChronicleWrapper({ sheetID, sheet, ruleset, uuid }: aut.props.SheetWrapper): JSX.Element {
	const chronicleObject = useSheet("campaign", ruleset, uuid);

	return (
		(!chronicleObject.isLoaded)
			? <Spinner />
			: <SmallBox>

				<WrapperTitle
					sheetID={sheetID}
					sheet={sheet}
					category={"campaign"}
					object={chronicleObject}
				/>

				<ChronicleSheet
					sheetID={sheetID}
					sheet={sheet}
					campaignObject={chronicleObject}
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
