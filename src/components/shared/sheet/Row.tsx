import { Fragment, useContext, useState } from "react";
import styled from "styled-components";
import Select, { Group } from "react-basic-select";

import { CleanString } from "../../../function/utility";

import { ClientContext } from "../../../contexts/Contexts";

import { Input, NumberInput, Textarea, Button, Checkbox, Switch, PseudoCheckbox, Dot, InputGroup } from "../../shared/Inputs";
import { Icon } from "../../shared/Icon";
import { Rulesets } from "../../../rulesets/_rulesets";

const RowWrapper = styled.div<{ columns: string; rows: string; align?: string; }>`
	display: grid;
	grid-template-columns: ${p => p.columns};
	grid-template-rows: ${p => p.rows};
	padding: 0 4px;
	margin: 0 ${p => (p.align === "center") ? "auto" : "0"};
	text-align: ${p => (p.align) ? p.align : "initial"};
`;

export function Row({ sheetDisplayType, blockTitle, rowData, ruleset, setTester: setDiceRoller, changeSheetValue, changeSelected }: aut.props.SheetRow): JSX.Element {
	const { clientState } = useContext(ClientContext);

	const [nameString] = useState(`${(sheetDisplayType) ? CleanString(blockTitle) : "???"}.${CleanString(rowData.title)}`);

	const [gridData] = useState(() => {
		const tempColumnWidths: string[] = [];
		const tempRowWidths: string[] = ["24px"];
		let tempColumnAmount: number = 1;

		if (rowData.inputs.includes("precheckbox")) {
			tempColumnWidths.push("21px");
			tempColumnAmount++;
		}

		if (rowData.isTestable && (sheetDisplayType === "view" || clientState === "offline")) {
			tempColumnWidths.push("20px");
			tempColumnAmount++;
		}

		if (rowData.showTitle) {
			tempColumnWidths.push("minmax(100px, max-content)");
			tempColumnAmount++;
		}

		if (rowData.inputs.includes("select")) {
			tempColumnWidths.push("4fr");
			tempColumnAmount++;
		}

		if (rowData.inputs.includes("text")) {
			tempColumnWidths.push("4fr");
			tempColumnAmount++;
		}

		if (rowData.inputs.includes("postcheckbox")) {
			tempColumnWidths.push("21px");
			tempColumnAmount++;
		}

		if (rowData.inputs.includes("number")) {
			tempColumnWidths.push("26px");
			tempColumnAmount++;
		}

		if (rowData.inputs.includes("dot") && rowData.dot) {
			tempColumnWidths.push(`minmax(${rowData.dot.amount * 16}px, 1fr)`);
			tempColumnAmount++;
		}

		if (rowData.inputs.includes("pseudocheckbox") && rowData.pseudocheckbox) {
			tempColumnWidths.push(`minmax(${rowData.pseudocheckbox.amount * 16}px, 1fr)`);
			tempColumnAmount++;
		}

		if (rowData.inputs.includes("checkbox") && rowData.checkbox) {
			tempColumnWidths.push(`minmax(${rowData.checkbox.amount * 16}px, 1fr)`);
			tempColumnAmount++;
		}

		if (rowData.inputs.includes("textarea") && rowData.textarea) {
			tempRowWidths.push(`${10 + (rowData.textarea.amount * 24)}px`);
		}

		return { rowWidths: tempRowWidths.join(" "), columnWidths: tempColumnWidths.join(" "), columnAmount: tempColumnAmount };
	});

	const [inputGroup] = useState(() => {
		const elements: JSX.Element[] = [<Fragment key={0} />];

		if (rowData.pseudocheckbox) {
			new Array<JSX.Element>(rowData.pseudocheckbox.amount).fill(<Fragment />)
				.forEach((v, i) => {
					elements.push(<PseudoCheckbox
						id={`${nameString}.pseudocheckbox.${i}`}
						key={`${nameString}.pseudocheckbox.${i}`}
						readOnly={(rowData.isReadOnly || sheetDisplayType === "view")}
						onClick={changeSheetValue}
					/>);
				});
		}
		else if (rowData.checkbox) {
			new Array<JSX.Element>(rowData.checkbox.amount).fill(<Fragment />)
				.forEach((v, i) => {
					elements.push(<Checkbox
						id={`${nameString}.checkbox.${i}`}
						key={`${nameString}.checkbox.${i}`}
						disabled={(rowData.isReadOnly || sheetDisplayType === "view")}
						onClick={changeSheetValue}
					/>);
				});
		}
		else if (rowData.dot) {
			new Array<JSX.Element>(rowData.dot.amount).fill(<Fragment />)
				.forEach((v, i) => {
					elements.push(<Dot
						id={`${nameString}.dot.${i}`}
						key={`${nameString}.dot.${i}`}
						disabled={(rowData.isReadOnly || sheetDisplayType === "view")}
						onClick={changeSheetValue}
					/>);
				});
		}

		return elements;
	});

	const createSelectOptions = (categories: string[]) => {
		const options: Group[] = [];

		for (const category in categories) {
			const name = categories[category];
			options.push({
				name: name,
				value: name.toLowerCase(),
				options: ((Rulesets.getRuleset(ruleset)).basics[name.toLowerCase()] as string[]).sort().map((v) => {
					return { name: v, value: CleanString(v) };
				})
			});
		}

		return options;
	};

	return (
		<RowWrapper key={nameString} align={rowData.align} columns={gridData.columnWidths} rows={gridData.rowWidths}>

			{(rowData.inputs.includes("precheckbox"))
				? <Checkbox key={`${nameString}.precheckbox`}
					id={`${nameString}.precheckbox`}
					disabled={(sheetDisplayType === "view")}
					onClick={changeSheetValue}
				/>
				: null
			}

			{(rowData.isTestable && (sheetDisplayType === "view" || clientState === "offline"))
				? <Icon size={18} name={"roll"} hover brightness title>
					<Button id={`roll.${CleanString(blockTitle)}.${CleanString(rowData.title)}`} value="" onClick={(event) => { setDiceRoller(event); }} />
				</Icon>
				: null
			}

			{(rowData.showTitle)
				? <label className={(rowData.boldTitle) ? "bold" : ""} key={`${nameString}.label`}>{rowData.title}</label>
				: null
			}

			{(rowData.inputs.includes("select") && rowData.select && changeSelected)
				? <Select
					options={createSelectOptions(rowData.select.categories)}
					onSelectedChange={changeSelected}
					multi={true}
					search={true}
					appendGroupValue={true}
					showAsText={true}
					placeholder={rowData.title}
				/>
				: null
			}

			{(rowData.inputs.includes("text"))
				? <Input
					type="text"
					align={rowData.align}
					id={`${nameString}.text`}
					key={`${nameString}.text`}
					readOnly={(rowData.isReadOnly || sheetDisplayType === "view") ? true : false}
					onChange={changeSheetValue}
				/>
				: null
			}

			{(rowData.inputs.includes("postcheckbox"))
				? <Switch key={`${nameString}.postcheckbox`}
					id={`${nameString}.postcheckbox`}
					onClick={changeSheetValue}
				/>
				: null
			}

			{(rowData.inputs.includes("number"))
				? <NumberInput
					type="number"
					align={rowData.align}
					id={`${nameString}.number`}
					key={`${nameString}.number`}
					readOnly={(rowData.isReadOnly) ? true : false}
					onChange={changeSheetValue}
				/>
				: null
			}
			{(rowData.inputs.includes("dot") || rowData.inputs.includes("pseudocheckbox") || rowData.inputs.includes("checkbox"))
				? <InputGroup>{inputGroup}</InputGroup>
				: null
			}

			{(rowData.inputs.includes("textarea") && rowData.textarea)
				? <Textarea
					height={rowData.textarea.amount * 24}
					columns={gridData.columnAmount}
					id={`${nameString}.textarea`}
					readOnly={(rowData.isReadOnly || sheetDisplayType === "view")}
					onChange={changeSheetValue}
				/>
				: null
			}

		</RowWrapper>
	);
}
