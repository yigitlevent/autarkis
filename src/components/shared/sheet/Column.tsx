import { Fragment, useState } from "react";

import { Subtitle, BlockWrapper, ColumnWrapper } from "../Sheet";

import { Row } from "./Row";

export function Column({ sheetDisplayType, blockData, ruleset, setTester: setDiceRoller, changeSheetValue }: aut.props.SheetBlock): JSX.Element {
	const [isHidden, setIsHidden] = useState(false);

	const columns = blockData.columns.map((column, index) => {
		const rows = column.map((row, i) => {
			return (<Row key={`${row.title}_${index}_${i}`}
				sheetDisplayType={sheetDisplayType}
				blockTitle={blockData.title}
				rowData={row}
				ruleset={ruleset}
				setTester={setDiceRoller}
				changeSheetValue={changeSheetValue}
			/>);
		});

		return (<ColumnWrapper key={`${blockData.title}_${index}`}>{rows}</ColumnWrapper>);
	});

	return (
		<Fragment>
			{(blockData.showTitle)
				? <Subtitle isClickable onClick={() => { setIsHidden(!isHidden); }}>
					{blockData.title.toUpperCase()}
				</Subtitle>
				: null}

			<BlockWrapper className={(isHidden) ? "hide" : ""}>{columns}</BlockWrapper>
		</Fragment>
	);
}
