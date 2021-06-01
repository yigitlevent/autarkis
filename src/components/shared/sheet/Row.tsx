import { Fragment, useCallback, useContext, useState } from "react";
import styled from "styled-components";

import { Rulesets } from "../../../rulesets/_rulesets";

import { CleanString } from "../../../function/utility";

import { ClientContext } from "../../../contexts/Contexts";

import { Input, NumberInput, Textarea, Button, Checkbox, Toggle, PseudoCheckbox, Dot, InputGroup } from "../../shared/Inputs";
import { Icon } from "../../shared/Icon";
import { Select } from "../Select";

const RowWrapper = styled.div<{ columns: string; rows: string; align?: string; }>`
	display: grid;
	grid-template-columns: ${p => p.columns};
	grid-template-rows: ${p => p.rows};
	padding: 0 4px;
	margin: 0 ${p => (p.align === "center") ? "auto" : "0"};
	text-align: ${p => (p.align) ? p.align : "initial"};
`;

export function Row({ sheetID, blockTitle, rowData, ruleset, setTester, sheetObject }: aut.props.SheetRow): JSX.Element {
	const { clientState } = useContext(ClientContext);

	const { displayType, data } = sheetObject;

	const [nameString] = useState(`${(displayType) ? CleanString(blockTitle) : "???"}.${CleanString(rowData.title)}`);
	const [nameParts] = useState(`${(displayType) ? CleanString(blockTitle) : "???"}.${CleanString(rowData.title)}`.split("."));
	const [field] = useState(data[nameParts[0]]?.[nameParts[1]]);

	const [gridData] = useState(() => {
		const tempColumnWidths: string[] = [];
		const tempRowWidths: string[] = ["24px"];
		let tempColumnAmount: number = 1;

		if (rowData.inputs.includes("precheckbox")) {
			tempColumnWidths.push("21px");
			tempColumnAmount++;
		}

		if (rowData.isTestable && (displayType === "view" || clientState === "offline")) {
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
			tempColumnWidths.push(`minmax(${rowData.dot.amount * 14}px, 1fr)`);
			tempColumnAmount++;
		}

		if (rowData.inputs.includes("pseudocheckbox") && rowData.pseudocheckbox) {
			tempColumnWidths.push(`minmax(${rowData.pseudocheckbox.amount * 14}px, 1fr)`);
			tempColumnAmount++;
		}

		if (rowData.inputs.includes("checkbox") && rowData.checkbox) {
			tempColumnWidths.push(`minmax(${rowData.checkbox.amount * 14}px, 1fr)`);
			tempColumnAmount++;
		}

		if (rowData.inputs.includes("textarea") && rowData.textarea) {
			tempRowWidths.push(`${10 + (rowData.textarea.amount * 21)}px`);
		}

		return { rowWidths: tempRowWidths.join(" "), columnWidths: tempColumnWidths.join(" "), columnAmount: tempColumnAmount };
	});

	const setInputGroup = useCallback((newValue: number, id: string, type: "dot" | "checkbox") => {
		const amount = rowData[type]?.amount;
		const isChecked = (document.getElementById(`${id}.${type}.${newValue}`) as HTMLInputElement).checked;

		if (field && amount) {
			field[type].current = newValue + 1;

			for (let n = 0; n < amount; n++) {
				const el = document.getElementById(`${id}.${type}.${n}`) as HTMLInputElement;
				if (el && n === newValue) el.checked = (isChecked) ? true : false;
				else if (el) el.checked = (n < newValue) ? true : false;
			}
		}
	}, [field, rowData]);

	const [inputGroup] = useState(() => {
		const elements: JSX.Element[] = [<Fragment key={0} />];

		if (rowData.pseudocheckbox) {
			new Array<JSX.Element>(rowData.pseudocheckbox.amount).fill(<Fragment />)
				.forEach((v, i) => {
					elements.push(<PseudoCheckbox
						key={`${sheetID}.${nameString}.pseudocheckbox.${i}`}
						id={`${sheetID}.${nameString}.pseudocheckbox.${i}`}
						onClick={() => { if (field) return field.pseudocheckbox.nextValue(i); return ""; }}
						defaultValue={(field) ? [...field.pseudocheckbox.current][i] : undefined}
					/>);
				});
		}
		else if (rowData.checkbox) {
			new Array<JSX.Element>(rowData.checkbox.amount).fill(<Fragment />)
				.forEach((v, i) => {
					elements.push(<Checkbox
						id={`${sheetID}.${nameString}.checkbox.${i}`}
						key={`${sheetID}.${nameString}.checkbox.${i}`}
						disabled={(rowData.isReadOnly === true || displayType === "view") ? true : false}
						defaultChecked={(field) ? i < field.checkbox.current : undefined}
						onClick={() => { setInputGroup(i, `${sheetID}.${nameString}`, "checkbox"); }}
					/>);
				});
		}
		else if (rowData.dot) {
			new Array<JSX.Element>(rowData.dot.amount).fill(<Fragment />)
				.forEach((v, i) => {
					elements.push(<Dot
						id={`${sheetID}.${nameString}.dot.${i}`}
						key={`${sheetID}.${nameString}.dot.${i}`}
						disabled={(rowData.isReadOnly === true || displayType === "view") ? true : false}
						defaultChecked={(field) ? i < field.dot.current : undefined}
						onClick={() => { setInputGroup(i, `${sheetID}.${nameString}`, "dot"); }}
					/>);
				});
		}

		return elements;
	});

	const createSelectGroupOptions = (categories: string[]): rbs.Group[] => {
		const options: rbs.Group[] = [];

		for (const category in categories) {
			const name = categories[category];
			options.push({
				name: name,
				value: name.toLowerCase(),
				options: ((Rulesets.getRuleset(ruleset)).basicLists[CleanString(name)] as string[]).sort().map((v) => {
					return { name: v, value: CleanString(v) };
				})
			});
		}

		return options;
	};

	return (
		<RowWrapper key={nameString} align={rowData.align} columns={gridData.columnWidths} rows={gridData.rowWidths}>

			{(rowData.inputs.includes("precheckbox"))
				? <Checkbox
					key={`${sheetID}.${nameString}.precheckbox`}
					id={`${sheetID}.${nameString}.precheckbox`}
					disabled={(displayType === "view") ? true : false}
					defaultChecked={(field) ? field.precheckbox.current : undefined}
					onClick={(event) => { if (field) field.precheckbox.current = (event.target as HTMLInputElement).checked; }}
				/>
				: null
			}

			{(rowData.isTestable && (displayType === "view" || clientState === "offline"))
				? <Icon size={18} name={"roll"} hover brightness title>
					<Button id={`roll.${CleanString(blockTitle)}.${CleanString(rowData.title)}`} value="" onClick={(event) => { if (setTester) setTester(event); }} />
				</Icon>
				: null
			}

			{(rowData.showTitle)
				? <label className={(rowData.boldTitle) ? "bold" : ""} key={`${sheetID}.${nameString}.label`}>{rowData.title}</label>
				: null
			}

			{(rowData.inputs.includes("select") && rowData.select)
				? <Select
					options={createSelectGroupOptions(rowData.select.categories)}
					multi={(rowData.select.multi) ? true : false}
					search={(rowData.select.search) ? true : false}
					create={(rowData.select.create) ? true : false}
					appendGroupValue={(rowData.select.appendGroupValue) ? true : false}
					showAsText={true}
					placeholder={(rowData.select.placeholder) ? rowData.select.placeholder : undefined}
					disabled={(rowData.isReadOnly === true || displayType === "view") ? true : false}
					defaultSelected={(field) ? field.select.current : undefined}
					onSelectedChange={(options: rbs.Option[]) => { if (field) field.select.current = options; }}
				/>
				: null
			}

			{(rowData.inputs.includes("text"))
				? <Input
					type="text"
					align={rowData.align}
					id={`${sheetID}.${nameString}.text`}
					key={`${sheetID}.${nameString}.text`}
					readOnly={(rowData.isReadOnly === true || displayType === "view") ? true : false}
					defaultValue={(field) ? field.text.current : undefined}
					onChange={(event) => { if (field) field.text.current = event.target.value; }}
				/>
				: null
			}

			{(rowData.inputs.includes("postcheckbox"))
				? <Toggle
					key={`${sheetID}.${nameString}.postcheckbox`}
					id={`${sheetID}.${nameString}.postcheckbox`}
					disabled={false}
					defaultChecked={(field) ? field.postcheckbox.current : undefined}
					onClick={(event) => { if (field) field.postcheckbox.current = (event.target as HTMLInputElement).checked; }}
				/>
				: null
			}

			{(rowData.inputs.includes("number"))
				? <NumberInput
					type="number"
					align={rowData.align}
					id={`${sheetID}.${nameString}.number`}
					key={`${sheetID}.${nameString}.number`}
					readOnly={(rowData.isReadOnly === true) ? true : false}
					defaultValue={(field) ? field.text.current : undefined}
					onChange={(event) => { if (field) field.text.current = event.target.value; }}
				/>
				: null
			}

			{(rowData.inputs.includes("dot") || rowData.inputs.includes("pseudocheckbox") || rowData.inputs.includes("checkbox"))
				? <InputGroup>{inputGroup}</InputGroup>
				: null
			}

			{(rowData.inputs.includes("textarea") && rowData.textarea)
				? <Textarea
					height={rowData.textarea.amount * 23}
					columns={gridData.columnAmount}
					id={`${sheetID}.${nameString}.textarea`}
					readOnly={(rowData.isReadOnly === true || displayType === "view") ? true : false}
					defaultValue={(field) ? field.textarea.current : undefined}
					onChange={(event) => { if (field) field.textarea.current = event.target.value; }}
				/>
				: null
			}

		</RowWrapper>
	);
}
