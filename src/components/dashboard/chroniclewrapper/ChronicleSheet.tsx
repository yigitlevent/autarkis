import { Fragment, createRef, useEffect, useState, useCallback, useContext } from "react";
import styled from "styled-components";

import { ClientContext, SheetContext } from "../../../contexts/Contexts";

import { Subtitle, DashboardForm, Extras, BlockWrapper, ColumnWrapper } from "../../shared/Sheet";
import { Button, Submit } from "../../shared/Inputs";
import { Icon } from "../../shared/Icon";
import { ConfirmBox } from "../../shared/ConfirmBox";

const Wrapper = styled(BlockWrapper)`
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

export function ChronicleSheet({ sheetDisplayType, chronicle, switchSheetDisplayType }: aut.props.ChronicleSheet): JSX.Element {
	const { clientState } = useContext(ClientContext);
	const { changeSheet } = useContext(SheetContext);

	const refForm = createRef<HTMLFormElement>();
	const importRef = createRef<HTMLInputElement>();

	const [deleteBox, setDeleteBox] = useState<JSX.Element>(<Fragment />);

	const deleteChronicle = useCallback((): void => {
		setDeleteBox(
			<ConfirmBox
				title={"Delete Chronicle"}
				innerHTML={"Are you sure that you want to delete this chronicle?"}
				button={"Delete"}
				callback={() => { chronicle.delete().then(() => { changeSheet(undefined, undefined, "none", true); }); }}
				close={() => { setDeleteBox(<Fragment />); }}
			/>
		);
	}, [chronicle, changeSheet]);

	const changeSheetValue = useCallback((event: aut.short.Events) => {
		if (sheetDisplayType !== "view") chronicle.changeValue(event);
	}, [chronicle, sheetDisplayType]);

	useEffect(() => {
		chronicle.placeSheetData();
	}, [chronicle]);

	return (
		<DashboardForm ref={refForm}>

			{deleteBox}

			<Extras>
				<input className="hide" type="file" id="c.misc.file" ref={importRef} multiple={false}
					onChange={(event) => { chronicle.import(event); }} accept=".chro.autarkis"
				/>

				<Icon size={24} name={"close"} hover brightness float={"right"} title>
					<Button id="s.misc.close" value="" onClick={() => { changeSheet(undefined, undefined, "none", true); }} />
				</Icon>

				{(sheetDisplayType !== "new")
					? <Icon size={24} name={(sheetDisplayType === "view") ? "edit_off" : "edit_on"} hover brightness float={"right"} title>
						<Button id="s.misc.edit_switch" value="" onClick={() => { switchSheetDisplayType(); }} />
					</Icon>
					: null
				}

				{(clientState !== "offline" && sheetDisplayType === "new")
					? <Icon size={24} name={"save"} hover brightness float={"right"} title>
						<Submit id="s.misc.submit" value={""} noBg
							onClick={(event) => {
								event.preventDefault();
								chronicle.insert()
									.then(() => { changeSheet(undefined, undefined, "none", true); });
							}}
						/>
					</Icon>
					: null
				}

				{(clientState !== "offline" && sheetDisplayType === "edit")
					? <Fragment>
						<Icon size={24} name={"save"} hover brightness float={"right"} title>
							<Submit id="s.misc.submit" value={""} noBg
								onClick={(event) => {
									event.preventDefault();
									chronicle.update()
										.then(() => { changeSheet(undefined, undefined, "none", true); });
								}}
							/>
						</Icon>
						<Icon size={24} name={"delete"} hover brightness float={"right"} title>
							<Submit id="s.misc.submit" value={""} noBg
								onClick={(event) => {
									event.preventDefault();
									deleteChronicle();
								}}
							/>
						</Icon>
					</Fragment>
					: null
				}

				<Icon size={24} name={"export"} hover brightness float={"right"} title>
					<Button id="c.misc.export" value={""} onClick={(event) => { chronicle.export(event); }} />
				</Icon>

				{(sheetDisplayType === "new" || sheetDisplayType === "edit")
					? <Icon size={24} name={"import"} hover brightness float={"right"} title>
						<Button id="c.misc.import" value={""} onClick={() => { importRef.current?.click(); }} />
					</Icon>
					: null
				}
			</Extras>

			<Wrapper>

				<ColumnWrapper>

					<Subtitle>Basics</Subtitle>

					<Row>
						<label className="extra">Storyteller</label>
						<input className="extra" type="text" id="s.storyteller_name" readOnly />
					</Row>

					<Row>
						<label className="extra">Chronicle Name</label>
						<input className="extra" type="text" id="s.name"
							readOnly={(sheetDisplayType !== "new") ? true : false}
							onChange={changeSheetValue}
						/>
					</Row>

				</ColumnWrapper>

				<ColumnWrapper>

					<Subtitle>Discord</Subtitle>

					<Row>
						<label className="extra">Bot Enabled</label>
						<input className="extra" type="checkbox" id="s.discord_enabled"
							disabled={(sheetDisplayType === "view") ? true : false}
							onClick={changeSheetValue}
						/>
					</Row>

					<Row>
						<label className="extra">Server ID</label>
						<input className="extra" type="text" id="s.discord_server"
							readOnly={(sheetDisplayType === "view") ? true : false}
							onChange={changeSheetValue}
						/>
					</Row>

					<Row>
						<label className="extra">Channel</label>
						<input className="extra" type="text" id="s.discord_channel"
							readOnly={(sheetDisplayType === "view") ? true : false}
							onChange={changeSheetValue}
						/>
					</Row>

				</ColumnWrapper>

			</Wrapper>

		</DashboardForm >
	);
}

