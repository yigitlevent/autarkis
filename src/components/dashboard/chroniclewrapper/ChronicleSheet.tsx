import { GenericChronicleSheet } from "../../../rulesets/GenericChronicle";

import { Dashboard } from "../../shared/Sheet";
import { Column } from "../../shared/sheet/Column";

export function ChronicleSheet({ sheetID, /*sheet,*/ chronicleObject }: aut.props.ChronicleSheet): JSX.Element {
	const { displayType, data } = chronicleObject;

	return (
		<Dashboard>
			{(data)
				? GenericChronicleSheet.map((block: aut.sheet.SheetBlock) => {
					return (<Column
						key={`${block.title}_${displayType}`}
						sheetID={sheetID}
						blockData={block}
						ruleset={data._primary.ruleset.text.current as aut.ruleset.Names}
						sheetObject={chronicleObject}
					/>);
				})
				: null
			}
		</Dashboard>
	);
}
