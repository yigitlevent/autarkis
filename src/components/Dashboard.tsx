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
import { TestWrapper } from "./dashboard/TestWrapper";

export function Dashboard(): JSX.Element {
	const [sheets, sheet] = useSheets();

	const [rulesetSelect, setRulesetSelect] = useState<null | JSX.Element>(null);

	const createSheet = useCallback((category: aut.SheetCategory, ruleset?: aut.ruleset.Names, uuid?: string) => {
		if (ruleset) {
			console.log(ruleset);

			if (category === "chronicle") sheet.add({ category, ruleset, uuid });
			else sheet.add({ category, ruleset, uuid });
		}
		else {
			setRulesetSelect(
				<ConfirmBox
					title={"Select Ruleset"} button={"Continue"}
					innerHTML={
						<Select
							options={Rulesets.getRulesetNames()} placeholder={"Select a Ruleset"} closeOnSelect
							onOptionSelect={(option) => {
								setRulesetSelect(null);
								if (category === "chronicle") sheet.add({ category, ruleset: option.value as aut.ruleset.Names, uuid });
								else sheet.add({ category, ruleset: option.value as aut.ruleset.Names, uuid });
							}}
						/>
					}
				/>
			);
		}
	}, [sheet]);

	const bottomElements = sheets.map((x): JSX.Element => {
		if (x.category === "chronicle") {
			return <ChronicleWrapper key={x.id} sheetID={x.id} sheet={sheet} ruleset={x.ruleset} uuid={x.uuid} />;
		}
		else if (x.category === "character") {
			return <CharacterWrapper key={x.id} sheetID={x.id} sheet={sheet} ruleset={x.ruleset} uuid={x.uuid} />;
		}
		else if (x.category.startsWith("test")) {
			if (x.characterData) return <TestWrapper key={x.id} sheetID={x.id} sheet={sheet} characterData={x.characterData} />;
			else return <Fragment />;
		}
		else return <Fragment />;
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
