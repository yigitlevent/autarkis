import { Fragment, useState, useCallback, useContext } from "react";

import { Rulesets } from "../../../rulesets/_rulesets";

import { ClientContext } from "../../../contexts/Contexts";

import { ConfirmBox } from "../../shared/ConfirmBox";
import { Icon } from "../../shared/Icon";
import { Button, Submit } from "../../shared/Inputs";
import { Dashboard, Extras } from "../../shared/Sheet";
import { Column } from "../../shared/sheet/Column";

import { TestWrapper } from "../TestWrapper";

import { Checklist } from "./Checklist";

export function CharacterSheet({ sheetID, removeSheet, moveSheet, characterObject }: aut.props.CharacterSheet): JSX.Element {
	const { clientState } = useContext(ClientContext);

	const { displayType, data, setDisplayType, database } = characterObject;

	const [diceRollerElement, setDiceRollerElement] = useState<JSX.Element>(<Fragment />);
	const [deleteBox, setDeleteBox] = useState<JSX.Element>(<Fragment />);

	const setDiceRoller = (event?: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
		if (event) {
			setDiceRollerElement(
				<TestWrapper
					event={event}
					characterObject={characterObject}
					setDiceRoller={setDiceRoller}
				/>
			);
		}
		else {
			setDiceRollerElement(<Fragment />);
		}
	};

	const deleteCharacter = useCallback((): void => {
		setDeleteBox(
			<ConfirmBox
				title={`Delete ${data.basics.name.text.current}`}
				innerHTML={"Are you sure that you want to delete this character?"}
				button={"Delete"}
				callback={() => { database.remove().then(() => { removeSheet(sheetID); }); }}
				close={() => { setDeleteBox(<Fragment />); }}
			/>
		);
	}, [data.basics.name.text, database, removeSheet, sheetID]);

	return (
		<Fragment>
			{(data) ? diceRollerElement : <Fragment />}

			{(data) ? deleteBox : <Fragment />}

			<Extras>
				<Icon size={24} name={"close"} hover brightness float={"right"} title>
					<Button id="misc.close" value="" onClick={() => { removeSheet(sheetID); }} />
				</Icon>

				{(displayType !== "new")
					? <Icon size={24} name={(displayType === "view") ? "edit_off" : "edit_on"} hover brightness float={"right"} title>
						<Button id="misc.edit_toggle" value="" onClick={() => { setDisplayType(); }} />
					</Icon>
					: null
				}

				{(clientState !== "offline" && displayType === "new")
					? <Icon size={24} name={"save"} hover brightness float={"right"} title>
						<Submit id="misc.submit" value={""} noBg
							onClick={(event) => {
								event.preventDefault();
								database.insert().then(() => { removeSheet(sheetID); });
							}}
						/>
					</Icon>
					: null
				}

				{(clientState !== "offline" && displayType === "edit")
					? <Fragment>
						<Icon size={24} name={"save"} hover brightness float={"right"} title>
							<Submit id="misc.submit" value={""} noBg
								onClick={(event) => {
									event.preventDefault();
									database.update().then(() => { removeSheet(sheetID); });
								}}
							/>
						</Icon>
						<Icon size={24} name={"delete"} hover brightness float={"right"} title>
							<Submit id="misc.submit" value={""} noBg
								onClick={(event) => {
									event.preventDefault();
									deleteCharacter();
								}}
							/>
						</Icon>
					</Fragment>
					: null
				}

				{(displayType === "view" || clientState === "offline")
					? <Icon size={22} name={"roll"} hover brightness float={"right"} title>
						<Button id="roll.standard.standard" value="" onClick={(event) => { setDiceRoller(event); }} />
					</Icon>
					: null
				}

				<Icon size={24} name={"arrow_right"} hover brightness float={"right"}>
					<Button value="" title={"Move Right"} onClick={() => { moveSheet(sheetID, "down"); }} />
				</Icon>

				<Icon size={24} name={"arrow_left"} hover brightness float={"right"}>
					<Button value="" title={"Move Left"} onClick={() => { moveSheet(sheetID, "up"); }} />
				</Icon>
			</Extras>

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
