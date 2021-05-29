import { Fragment, useCallback, useState } from "react";
import styled from "styled-components";

import { useSheets } from "../hooks/useSheets";

import Select from "./shared/Select";

import { ChronicleList } from "./dashboard/ChronicleList";
import { CharacterList } from "./dashboard/CharacterList";
import { Rulesets } from "../rulesets/_rulesets";
import { ConfirmBox } from "./shared/ConfirmBox";


const TopGrid = styled.div`
	width: 100%;
	max-width: 100%;
	padding-top: 35px;
	margin: 0;

	display: flex;
	flex-flow: row wrap;
	justify-content: space-evenly;

	& > * {
		width: 630px;
		max-width: 100%;
		height: max-content;
		padding: 0;
		flex: 0 0 auto;
		margin: 3px;
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
	
	& > * {
		width: 950px;
		max-width: 100%;
		height: max-content;
		padding: 0;
		flex: 0 1 auto;
		margin: 3px;
	}
`;

export function Dashboard(): JSX.Element {
	const [sheets, addSheet] = useSheets();

	const [rulesetSelect, setRulesetSelect] = useState<null | JSX.Element>(null);
	const [selectedRuleset, setSelectedRuleset] = useState<undefined | aut.ruleset.Names>();

	const createSheet = useCallback((category: aut.short.SheetCategory, ruleset?: aut.ruleset.Names, uuid?: string | undefined) => {
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

	return (
		<Fragment>
			{rulesetSelect}

			<TopGrid>
				<ChronicleList createSheet={createSheet} />
				<CharacterList createSheet={createSheet} />
				<CharacterList createSheet={createSheet} />
			</TopGrid>

			<BottomGrid>
				{sheets.map((x) => x.element)}
			</BottomGrid>
		</Fragment>
	);
}
