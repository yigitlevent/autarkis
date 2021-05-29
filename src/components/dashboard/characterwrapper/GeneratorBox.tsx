import { Fragment, useCallback, useState } from "react";
import styled from "styled-components";

import { Rulesets } from "../../../rulesets/_rulesets";

import { Topbox, TopboxBox, TopboxTitle } from "../../shared/Topbox";

const ChecklistText = styled.div<{ strike: boolean; }>`
	grid-column: span 2;
	text-decoration: ${p => p.strike ? "line-through" : "none"};
	padding: 2px 5px;
	font-size: 1em;
`;

const ChecklistSubtext = styled.div<{ strike: boolean; }>`
	font-size: 0.9em;
	font-style: italic;
	white-space: pre-line;
	line-height: 1.4em;
	padding: 1px 6px;
`;

export function GeneratorBox({ ruleset, character }: aut.props.GeneratorBox): JSX.Element {
	const [conditions] = useState((ruleset) ? Rulesets.getRuleset(ruleset).generatorConditions : []);

	const checkConditions = useCallback((): boolean[] => {
		return conditions.map((v) => {
			if (character) { return v.condition(character)[0]; }
			else { return false; }
		});
	}, [character, conditions]);

	const firstFalseIndex = checkConditions().findIndex(v => v === false);

	const conditionElements = conditions.slice(Math.max(0, firstFalseIndex - 1), Math.min(checkConditions().length - 1, firstFalseIndex + 1)).map((v, i) => {
		if (character) {
			const condition = (v.condition(character));
			console.log("i");
			console.log(i);
			console.log("firstFalseIndex");
			console.log(firstFalseIndex);

			return (
				<ChecklistText strike={condition[0]} key={i}>
					{i + Math.max(1, firstFalseIndex)}: {v.text}
					{(!condition[0]) ? <ChecklistSubtext strike={condition[0]}>{condition[1]}</ChecklistSubtext> : <Fragment />}
				</ChecklistText>
			);
		}
		return <Fragment key={i} />;
	});

	return (
		<Topbox clickThrough={true}>
			<TopboxBox>
				<TopboxTitle>Generator Checklist</TopboxTitle>
				{conditionElements}
			</TopboxBox>
		</Topbox>
	);
}
