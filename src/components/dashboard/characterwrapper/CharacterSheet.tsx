import { Fragment, createRef, useEffect, useState, useCallback, useContext } from "react";

import { Rulesets } from "../../../rulesets/_rulesets";

import { ClientContext, SheetContext } from "../../../contexts/Contexts";

import { ConfirmBox } from "../../shared/ConfirmBox";
import { Icon } from "../../shared/Icon";
import { Button, Submit } from "../../shared/Inputs";
import { DashboardForm, Extras } from "../../shared/Sheet";

import { DiceRoller } from "../DiceRoller";
import { SheetBlock } from "./SheetBlock";

export function CharacterSheet({ sheetDisplayType, character, switchSheetDisplayType }: aut.props.CharacterSheet): JSX.Element {
	const { clientState } = useContext(ClientContext);
	const { changeSheet } = useContext(SheetContext);

	const formRef = createRef<HTMLFormElement>();
	const importRef = createRef<HTMLInputElement>();

	const [diceRollerElement, setDiceRollerElement] = useState<JSX.Element>(<Fragment />);
	const [deleteBox, setDeleteBox] = useState<JSX.Element>(<Fragment />);

	const setDiceRoller = (event?: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
		if (event) {
			setDiceRollerElement(
				<DiceRoller
					event={event}
					character={character}
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
				title={`Delete ${character.data.basics.name.text.current}`}
				innerHTML={"Are you sure that you want to delete this character?"}
				button={"Delete"}
				callback={() => { character.delete().then(() => { changeSheet(undefined, undefined, "none", true); }); }}
				close={() => { setDeleteBox(<Fragment />); }}
			/>
		);
	}, [character, changeSheet]);

	const changeSheetValue = useCallback((event: aut.short.Events) => {
		if (sheetDisplayType !== "view") character.changeValue(event);
	}, [character, sheetDisplayType]);

	useEffect(() => {
		character.placeSheetData();
	}, [character, sheetDisplayType]);

	return (
		<Fragment>
			{(character) ? diceRollerElement : <Fragment />}

			{(character) ? deleteBox : <Fragment />}

			<DashboardForm ref={formRef}>
				<Extras>
					<input className="hide" type="file" name="c.misc.file" ref={importRef} multiple={false}
						onChange={(event) => { character.import(event); }} accept=".char.autarkis"
					/>

					<Icon size={24} name={"close"} hover brightness float={"right"} title>
						<Button name="s.misc.close" value="" onClick={() => { changeSheet(undefined, undefined, "none", true); }} />
					</Icon>

					{(sheetDisplayType !== "new")
						? <Icon size={24} name={(sheetDisplayType === "view") ? "edit_off" : "edit_on"} hover brightness float={"right"} title>
							<Button name="s.misc.edit_switch" value="" onClick={() => { switchSheetDisplayType(); }} />
						</Icon>
						: null
					}

					{(sheetDisplayType !== "view" && clientState !== "offline")
						? <Fragment>
							{(character.editable)
								? <Icon size={24} name={"save"} hover brightness float={"right"} title>
									<Submit name="s.misc.submit" value={""} noBg
										onClick={(event) => {
											event.preventDefault();
											character.submit(sheetDisplayType)
												.then(() => { changeSheet(undefined, undefined, "none", true); });
										}}
									/>
								</Icon>
								: null
							}

							{(sheetDisplayType !== "new")
								? <Icon size={24} name={"delete"} hover brightness float={"right"} title>
									<Submit name="s.misc.submit" value={""} noBg
										onClick={(event) => {
											event.preventDefault();
											deleteCharacter();
										}}
									/>
								</Icon>
								: null
							}
						</Fragment>
						: null
					}

					<Icon size={24} name={"export"} hover brightness float={"right"} title>
						<Button name="c.misc.export" value={""} onClick={(event) => { character.export(event); }} />
					</Icon>

					{(sheetDisplayType === "new" || sheetDisplayType === "edit")
						? <Icon size={24} name={"import"} hover brightness float={"right"} title>
							<Button name="c.misc.import" value={""} onClick={() => { importRef.current?.click(); }} />
						</Icon>
						: null
					}

					{(sheetDisplayType === "view" || clientState === "offline")
						? <Icon size={22} name={"roll"} hover brightness float={"right"} title>
							<Button name="c.misc.roll.standard.standard" value="" onClick={(event) => { setDiceRoller(event); }} />
						</Icon>
						: null
					}
				</Extras>

				{(character)
					? (Rulesets.getRuleset((character.data._primary.ruleset.text.current) as aut.ruleset.Names)).characterSheet.map((block: any) => {
						return (<SheetBlock key={`${block.title}_${sheetDisplayType}`}
							sheetDisplayType={sheetDisplayType}
							blockData={block}
							setDiceRoller={setDiceRoller}
							changeSheetValue={changeSheetValue}
						/>);
					})
					: null
				}

			</DashboardForm>
		</Fragment>
	);
}
