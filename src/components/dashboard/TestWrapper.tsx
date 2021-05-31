import { useState, useContext, useCallback, useEffect, Fragment } from "react";
import styled from "styled-components";

import { Rulesets } from "../../rulesets/_rulesets";

import { DirtyString } from "../../function/utility";

import { Test } from "../../classes/Test";

import { ClientContext } from "../../contexts/Contexts";

import { Row } from "../shared/sheet/Row";
import { Topbox, TopboxBox, TopboxTitle, TopboxButton, TopboxChildren } from "../shared/Topbox";

const Result = styled.div`
	padding: 4px;
`;

export function TestWrapper({ event, characterObject, setDiceRoller }: aut.props.TestWrapper): JSX.Element {
	const { clientState } = useContext(ClientContext);

	const [displayType, data] = characterObject;

	const [basics] = useState(() => {
		if (data) {
			const target = event.target as HTMLElement;

			const ruleset = data._primary.ruleset.text.current as aut.ruleset.Names;
			const type = target.id.split(".")[2];

			const dataset: aut.ruleset.TestSheet = Rulesets.getRuleset(ruleset).tests[type];

			return {
				title: dataset.title,
				type: type,
				ruleset: ruleset,
				tester: new Test(dataset, ruleset, data)
			};
		}
	});

	const [probabilityTopbox, setProbabilityTopbox] = useState<JSX.Element>(<Fragment />);
	const [resultTopbox, setResultTopbox] = useState<JSX.Element>(<Fragment />);

	const changeSheetValue = useCallback((valueEvent: aut.Events): void => {
		if (basics) {
			basics.tester.changeValue(valueEvent);
			basics.tester.placeSheetData();
		}
	}, [basics]);

	const changeSelected = useCallback((values: rbs.Option[]): void => {
		if (basics) {
			basics.tester.changeSelected(values);
			basics.tester.placeSheetData();
		}
	}, [basics]);

	const roll = useCallback((offlineTest: boolean): void => {
		if (basics) {
			const testResult = basics.tester.roll(offlineTest);

			const resultElements: JSX.Element[] = [];
			for (const key in testResult.test.results) {
				resultElements.push(
					<Result key={key}>
						<b>{DirtyString(key)}</b>: {testResult.test.results[key].join(", ")}
					</Result>
				);
			}

			setResultTopbox(
				<TopboxBox columns={1}>
					<TopboxTitle columns={1}>{testResult.title}</TopboxTitle>
					<Result>{testResult.test.result}</Result>
					{resultElements}
				</TopboxBox>
			);
		}
	}, [basics]);

	const probability = useCallback((): void => {
		if (basics) {
			const probabilities = basics.tester.calculateProbabilities();

			const elements = [];

			for (const key in probabilities) {
				if (key.startsWith("_")) continue;
				elements.push(<Result key={key}><b>{DirtyString(key)}</b>: {probabilities[key]}%</Result>);
			}

			setProbabilityTopbox(
				<TopboxBox columns={1}>
					<TopboxTitle columns={1}>Probabilities</TopboxTitle>
					{elements}
				</TopboxBox>
			);
		}
	}, [basics]);

	useEffect(() => {
		basics?.tester.placeSheetData();
	}, [basics?.tester]);

	return (
		<Topbox>
			<TopboxBox>
				<TopboxTitle>{basics?.title}</TopboxTitle>

				{(data && basics)
					? (Rulesets.getRuleset((data._primary.ruleset.text.current) as aut.ruleset.Names))
						.tests[basics.type].children.map((row, index) => {
							return (
								<TopboxChildren columns={1} span={(row.select) ? 2 : 1} key={`${data.basics.name}_${displayType}_${index}`}>
									<Row
										sheetID={100000 /* this will break something, fix it later */}
										sheetDisplayType={displayType}
										blockTitle={"roller"}
										rowData={row}
										ruleset={data._primary.ruleset.text.current as aut.ruleset.Names}
										setTester={setDiceRoller}
										changeSheetValue={changeSheetValue}
										changeSelected={changeSelected}
									/>
								</TopboxChildren>
							);
						})
					: null
				}

				<TopboxChildren columns={(clientState !== "offline") ? -2 : -1} span={2} topBorder>
					<TopboxButton value="Stats" onClick={() => { probability(); }} />
					{(clientState !== "offline") ? <TopboxButton value="Roll" onClick={() => roll(false)} /> : null}
					<TopboxButton value="Offline Roll" onClick={() => roll(true)} />
					<TopboxButton value="Close" onClick={() => { setDiceRoller(); }} />
				</TopboxChildren>
			</TopboxBox>

			{probabilityTopbox}

			{resultTopbox}

		</Topbox >
	);
}
