import { Fragment, useCallback, useState } from "react";
import styled from "styled-components";

import { Rulesets } from "../rulesets/_rulesets";

import { useSheets } from "../hooks/useSheets";

import Select from "./shared/Select";

import { ChronicleList } from "./dashboard/ChronicleList";
import { CharacterList } from "./dashboard/CharacterList";
import { ConfirmBox } from "./shared/ConfirmBox";

import { CharacterWrapper } from "./dashboard/CharacterWrapper";
import { ChronicleWrapper } from "./dashboard/ChronicleWrapper";

const TopGrid = styled.div`
	width: 100%;
	max-width: 100%;
	padding-top: 5px;
	margin: 0;

	display: flex;
	flex-flow: row wrap;
	justify-content: space-evenly;

	position: relative;
	z-index: 10;

	& > * {
		width: 630px;
		max-width: 100%;
		height: max-content;
		padding: 0;
		flex: 0 0 auto;
		margin: 3px;
		min-height: 120px;
	}
`;

const BottomGrid = styled.div`
	width: 100%;
	max-width: 100%;
	padding-top: 5px;
	margin: 0;

	display: flex;
	flex-flow: row wrap;
	justify-content: space-evenly;
	
	position: relative;
	z-index: 10;

	& > * {
		width: 950px;
		max-width: 100%;
		height: max-content;
		padding: 0;
		flex: 0 1 auto;
		margin: 3px;
		min-height: 120px;
	}
`;

export function Dashboard(): JSX.Element {
	const [sheets, addSheet, removeSheet, moveSheet] = useSheets();

	const [rulesetSelect, setRulesetSelect] = useState<null | JSX.Element>(null);
	const [selectedRuleset, setSelectedRuleset] = useState<undefined | aut.ruleset.Names>();

	const createSheet = useCallback((category: aut.SheetCategory, ruleset?: aut.ruleset.Names, uuid?: string | undefined) => {
		if (ruleset) {
			setRulesetSelect(null);
			if (category === "chronicle") addSheet(category, ruleset, uuid);
			else addSheet(category, ruleset, uuid);
		}
		else {
			setRulesetSelect(
				<ConfirmBox
					title={"Select Ruleset"} button={"Continue"}
					callback={() => createSheet(category, selectedRuleset, uuid)} close={() => setRulesetSelect(null)}
					innerHTML={
						<Select
							options={Rulesets.getRulesetNames()} placeholder={"Select a Ruleset"} closeOnSelect
							onOptionSelect={(option) => { setSelectedRuleset(option.value as aut.ruleset.Names); }}
						/>
					}
				/>
			);
		}
	}, [addSheet, selectedRuleset]);

	const bottomElements = sheets.map((x) => {
		if (x.category === "chronicle") {
			return (
				<ChronicleWrapper
					key={x.id} sheetID={x.id}
					removeSheet={removeSheet} moveSheet={moveSheet}
					ruleset={x.ruleset} uuid={x.uuid}
				/>
			);
		}
		else {
			return (
				<CharacterWrapper
					key={x.id} sheetID={x.id}
					removeSheet={removeSheet} moveSheet={moveSheet}
					ruleset={x.ruleset} uuid={x.uuid}
				/>
			);
		}
	});

	return (
		<Fragment>
			{rulesetSelect}

			<TopGrid>
				<ChronicleList createSheet={createSheet} />
				<CharacterList createSheet={createSheet} />
				<CharacterList createSheet={createSheet} />
			</TopGrid>

			<BottomGrid>
				{bottomElements}
			</BottomGrid>
		</Fragment>
	);
}
