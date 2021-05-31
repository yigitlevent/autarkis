import { Fragment, useState } from "react";

import { Subtitle, ColumnsWrapper, RowsWrapper } from "../Sheet";

import { Row } from "./Row";

export function Column({ sheetID, sheetDisplayType, blockData, ruleset, setTester, changeSheetValue, changeSelected }: aut.props.SheetBlock): JSX.Element {
	const [isHidden, setIsHidden] = useState(false);

	const columns = blockData.columns.map((column, index) => {
		const rows = column.map((row, i) => {
			return (<Row 
				key={`${row.title}_${index}_${i}`}
				sheetID={sheetID}
				sheetDisplayType={sheetDisplayType}
				blockTitle={blockData.title}
				rowData={row}
				ruleset={ruleset}
				setTester={setTester}
				changeSheetValue={changeSheetValue}
				changeSelected={changeSelected}
			/>);
		});

		return (<RowsWrapper key={`${blockData.title}_${index}`}>{rows}</RowsWrapper>);
	});

	return (
		<Fragment>
			{(blockData.showTitle)
				? <Subtitle isClickable onClick={() => { setIsHidden(!isHidden); }}>
					{blockData.title.toUpperCase()}
				</Subtitle>
				: null}

			<ColumnsWrapper className={(isHidden) ? "hide" : ""} display={(blockData.display === false) ? "none" : "block"}>{columns}</ColumnsWrapper>
		</Fragment>
	);
}
