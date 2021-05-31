import { Fragment, useCallback, useState } from "react";
import Masonry from "react-masonry-css";

import { Rulesets } from "../rulesets/_rulesets";

import { useSheets } from "../hooks/useSheets";

import { Select } from "./shared/Select";

import { ChronicleList } from "./dashboard/ChronicleList";
import { CharacterList } from "./dashboard/CharacterList";
import { ConfirmBox } from "./shared/ConfirmBox";

import { CharacterWrapper } from "./dashboard/CharacterWrapper";
import { ChronicleWrapper } from "./dashboard/ChronicleWrapper";

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

			<Masonry
				breakpointCols={{ default: 3, 1260: 2, 630: 1 }}
				className="top-masonry" columnClassName="top-masonry-column"
			>
				<ChronicleList createSheet={createSheet} />
				<CharacterList createSheet={createSheet} />
				<CharacterList createSheet={createSheet} />
			</Masonry>

			<Masonry
				breakpointCols={{ default: 2, 950: 1 }}
				className="bottom-masonry" columnClassName="bottom-masonry-column"
			>
				{bottomElements}
			</Masonry>
		</Fragment>
	);
}
