import { Fragment, useCallback, useState } from "react";
import styled from "styled-components";

import { Rulesets } from "../../../rulesets/_rulesets";

const ChecklistWrapper = styled.div`
	border-bottom: ${(props: aut.theme.StyleProps) => props.theme.box.border};
	margin: 0 10px;
`;

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

export function Checklist({ characterObject }: aut.props.GeneratorBox): JSX.Element {
	const { data } = characterObject;

	const [ruleset] = useState(data._primary.ruleset.text.current as aut.ruleset.Names);
	const [conditions] = useState((ruleset) ? Rulesets.getRuleset(ruleset).generatorConditions : []);

	const checkConditions = useCallback((): boolean[] => {
		return conditions.map((v) => {
			if (data) { return v.condition(data)[0]; }
			else { return false; }
		});
	}, [conditions, data]);

	const firstFalseIndex = checkConditions().findIndex(v => v === false);

	const conditionElements = conditions.slice(Math.max(0, firstFalseIndex - 1), Math.min(checkConditions().length - 1, firstFalseIndex + 1)).map((v, i) => {
		if (data) {
			const condition = (v.condition(data));
			return (
				<ChecklistText strike={condition[0]} key={i}>
					{i + Math.max(1, firstFalseIndex)}: {v.text}
					{(!condition[0]) ? <ChecklistSubtext strike={condition[0]}>{condition[1]}</ChecklistSubtext> : <Fragment />}
				</ChecklistText>
			);
		}
		return <Fragment key={i} />;
	});

	return <ChecklistWrapper>{conditionElements}</ChecklistWrapper>;
}
