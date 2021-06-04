import { Fragment, useState } from "react";

import { Rulesets } from "../../../rulesets/_rulesets";

import { Dashboard } from "../../shared/Sheet";
import { Column } from "../../shared/sheet/Column";

import { Checklist } from "./Checklist";

export function CharacterSheet({ sheetID, sheet, characterObject }: aut.props.CharacterSheet): JSX.Element {
	const { displayType, data } = characterObject;

	const [diceRollerElement, setDiceRollerElement] = useState<JSX.Element>(<Fragment />);

	const setDiceRoller = (event?: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
		if (event) {
			const target = event.target as HTMLElement;
			sheet.add({
				category: `test.${target.id.split(".")[2]}`,
				ruleset: data._primary.ruleset.text.current as aut.ruleset.Names,
				uuid: data._primary.uuid.text.current
			});
		}
		else {
			setDiceRollerElement(<Fragment />);
		}
	};

	return (
		<Fragment>
			{(data) ? diceRollerElement : <Fragment />}

			{(!data._primary.uuid.text.current)
				? <Checklist characterObject={characterObject} />
				: null
			}

			<Dashboard>
				{(data)
					? Rulesets.getRuleset(data._primary.ruleset.text.current as aut.ruleset.Names)
						.characterSheet.map((block: aut.sheet.SheetBlock) => {
							return (<Column
								key={`${block.title}_${displayType}`}
								sheetID={sheetID}
								blockData={block}
								ruleset={data._primary.ruleset.text.current as aut.ruleset.Names}
								sheetObject={characterObject}
								setTester={setDiceRoller}
							/>);
						})
					: null
				}
			</Dashboard>
		</Fragment>
	);
}
