import { Fragment, useCallback, useContext, useState } from "react";

import { ClientContext } from "../../../contexts/Contexts";

import { Title, Extras } from "../../shared/Sheet";
import { Icon } from "../../shared/Icon";
import { Button, Submit } from "../../shared/Inputs";
import { ConfirmBox } from "../../shared/ConfirmBox";

export function WrapperTitle({ sheetID, sheet, category, object }: aut.props.WrapperTitle): JSX.Element {
	const { clientState } = useContext(ClientContext);

	const { displayType, data, setDisplayType, database } = object;

	const [deleteBox, setDeleteBox] = useState<JSX.Element>(<Fragment />);

	const deleteCharacter = useCallback((): void => {
		setDeleteBox(
			<ConfirmBox
				title={`Delete ${data.basics.name.text.current}`}
				innerHTML={"Are you sure that you want to delete this chronicle?"}
				button={"Delete"}
				callback={() => { database.remove().then(() => { sheet.remove(sheetID); }); }}
				close={() => { setDeleteBox(<Fragment />); }}
			/>
		);
	}, [data.basics.name.text, database, sheet, sheetID]);

	return (
		<Fragment>
			{(data) ? deleteBox : <Fragment />}

			<Title>
				<div>{displayType.toUpperCase()} {category.toUpperCase()}</div>

				<Extras>
					<Icon size={24} name={"close"} hover brightness float={"right"} title>
						<Button id="misc.close" value="" onClick={() => { sheet.remove(sheetID); }} />
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
									database.insert().then(() => { sheet.remove(sheetID); });
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
										database.update().then(() => { sheet.remove(sheetID); });
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

					<Icon size={24} name={"arrow_right"} hover brightness float={"right"}>
						<Button value="" title={"Move Right"} onClick={() => { sheet.move(sheetID, "down"); }} />
					</Icon>

					<Icon size={24} name={"arrow_left"} hover brightness float={"right"}>
						<Button value="" title={"Move Left"} onClick={() => { sheet.move(sheetID, "up"); }} />
					</Icon>
				</Extras>
			</Title>
		</Fragment>
	);
}
