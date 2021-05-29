import { Fragment, useState, useCallback, useContext } from "react";
import styled from "styled-components";

import { ClientContext } from "../../../contexts/Contexts";

import { Subtitle, Dashboard, Extras, RowsWrapper } from "../../shared/Sheet";
import { Button, Submit } from "../../shared/Inputs";
import { Icon } from "../../shared/Icon";
import { ConfirmBox } from "../../shared/ConfirmBox";

const Wrapper = styled.div` // TODO: Fix this, inherit from ColumnsWrapper
	line-height: 1.5em;
	width: 100%;
	padding: 6px 10px 6px;
	font-size: 0.9em;
	text-align: center;
	text-align: left;
`;

const Row = styled.div`
	display: grid;
	grid-template-columns: 140px 1fr;
	grid-template-rows: 24px;
	padding: 0 4px;
	width: 100%;
	margin: 2px auto 6px;
`;

export function ChronicleSheet({ sheetID, removeSheet, moveSheet, chronicleObject }: aut.props.ChronicleSheet): JSX.Element {
	const { clientState } = useContext(ClientContext);

	const [displayType, data, setters, database] = chronicleObject;

	const [deleteBox, setDeleteBox] = useState<JSX.Element>(<Fragment />);

	const deleteChronicle = useCallback((): void => {
		setDeleteBox(
			<ConfirmBox
				title={"Delete Chronicle"}
				innerHTML={"Are you sure that you want to delete this chronicle?"}
				button={"Delete"}
				callback={() => { database.remove().then(() => { removeSheet(sheetID); }); }}
				close={() => { setDeleteBox(<Fragment />); }}
			/>
		);
	}, [database, removeSheet, sheetID]);

	const changeSheetValue = useCallback((event: aut.short.Events) => {
		if (displayType !== "view") setters.changeValue(event);
	}, [displayType, setters]);

	return (
		<Dashboard>

			{deleteBox}

			<Extras>
				<Icon size={24} name={"close"} hover brightness float={"right"} title>
					<Button id="misc.close" value="" onClick={() => { removeSheet(sheetID); }} />
				</Icon>

				{(displayType !== "new")
					? <Icon size={24} name={(displayType === "view") ? "edit_off" : "edit_on"} hover brightness float={"right"} title>
						<Button id="misc.edit_toggle" value="" onClick={() => { setters.setDisplayType(); }} />
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
									deleteChronicle();
								}}
							/>
						</Icon>
					</Fragment>
					: null
				}

				<Icon size={24} name={"arrow_left"} hover brightness float={"right"}>
					<Button value="" title={"Move Left"} onClick={() => { moveSheet(sheetID, "up"); }} />
				</Icon>

				<Icon size={24} name={"arrow_right"} hover brightness float={"right"}>
					<Button value="" title={"Move Right"} onClick={() => { moveSheet(sheetID, "down"); }} />
				</Icon>
			</Extras>

			<Wrapper>

				<RowsWrapper>

					<Subtitle>Basics</Subtitle>

					<Row>
						<label className="extra">Storyteller</label>
						<input className="extra" type="text" id="storyteller_name" readOnly />
					</Row>

					<Row>
						<label className="extra">Chronicle Name</label>
						<input className="extra" type="text" id="name"
							readOnly={(displayType !== "new") ? true : false}
							onChange={changeSheetValue}
						/>
					</Row>

				</RowsWrapper>

				<RowsWrapper>

					<Subtitle>Discord</Subtitle>

					<Row>
						<label className="extra">Bot Enabled</label>
						<input className="extra" type="checkbox" id="discord_enabled"
							disabled={(displayType === "view") ? true : false}
							onClick={changeSheetValue}
						/>
					</Row>

					<Row>
						<label className="extra">Server ID</label>
						<input className="extra" type="text" id="discord_server"
							readOnly={(displayType === "view") ? true : false}
							onChange={changeSheetValue}
						/>
					</Row>

					<Row>
						<label className="extra">Channel</label>
						<input className="extra" type="text" id="discord_channel"
							readOnly={(displayType === "view") ? true : false}
							onChange={changeSheetValue}
						/>
					</Row>

				</RowsWrapper>

			</Wrapper>

		</Dashboard >
	);
}

