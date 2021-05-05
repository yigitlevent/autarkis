import { Fragment, useState, useCallback, useContext } from "react";
import Select from "react-basic-select";

import { Rulesets } from "../rulesets/_rulesets";

import { ClientContext, SheetContext } from "../contexts/Contexts";

import { useListCharacters, useListChronicles } from "../hooks/useQueries";

import { Sidebar } from "./shared/Sidebar";
import { MainBox } from "./shared/Box";
import { ConfirmBox } from "./shared/ConfirmBox";

import { MyLists } from "./dashboard/MyLists";
import { CharacterWrapper } from "./dashboard/CharacterWrapper";
import { ChronicleWrapper } from "./dashboard/ChronicleWrapper";

export function Dashboard(): JSX.Element {
	const { clientState } = useContext(ClientContext);

	const [sheetCategory, setSheetCategory] = useState<undefined | "character" | "chronicle">(undefined);
	const [sheetUUID, setSheetUUID] = useState<undefined | string>(undefined);
	const [sheetRuleset, setSheetRuleset] = useState<undefined | aut.ruleset.Names>(undefined);

	const [isRulesetSelectOpen, setIsRulesetSelectOpen] = useState<boolean>(false);
	const [selectVal, setSelectVal] = useState<undefined | aut.ruleset.Names>(undefined);

	const { refetch: chronicleRefetch } = useListChronicles(clientState !== "offline");
	const { refetch: characterRefetch } = useListCharacters(clientState !== "offline");

	const changeSheet = useCallback((type: undefined | "character" | "chronicle", uuid: undefined | string, ruleset: undefined | "none" | aut.ruleset.Names, refetch: boolean): void => {
		setSheetRuleset(undefined);

		setSheetCategory(type);
		setSheetUUID(uuid);

		if (ruleset === "none") { setIsRulesetSelectOpen(false); }
		else if (ruleset) { setSheetRuleset(ruleset); }
		else { setIsRulesetSelectOpen(true); }

		if (refetch) {
			chronicleRefetch();
			characterRefetch();
		}
	}, [characterRefetch, chronicleRefetch]);

	const selectorCallback = useCallback(() => {
		if (selectVal) {
			setIsRulesetSelectOpen(false);
			setSheetRuleset(selectVal);
		}
	}, [selectVal]);

	const selectorClose = useCallback(() => {
		setSelectVal(undefined);
		setSheetRuleset(undefined);
		changeSheet(undefined, undefined, undefined, false);
	}, [changeSheet]);

	return (
		<SheetContext.Provider value={{ sheetCategory, sheetUUID, sheetRuleset, changeSheet }}>
			<MainBox>
				<MyLists />
				<Sidebar />
			</MainBox>

			{(isRulesetSelectOpen)
				? <ConfirmBox
					title={"Ruleset Selection"}
					innerHTML={
						<Select
							options={Rulesets.getRulesetNames()} search closeOnSelect showAsText
							placeholder={"Choose a Ruleset for your chronicle."}
							onSelectedChange={(values) => { setSelectVal(values[0].name as aut.ruleset.Names); }}
						/>
					}
					button={"Confirm"}
					callback={selectorCallback}
					close={selectorClose}
				/>
				: <Fragment />
			}

			{(sheetRuleset && sheetCategory === "character")
				? <CharacterWrapper key={`${sheetCategory}_${sheetUUID}`} />
				: null
			}

			{(sheetRuleset && sheetCategory === "chronicle")
				? <ChronicleWrapper key={`${sheetCategory}_${sheetUUID}`} />
				: null
			}
		</SheetContext.Provider>
	);
}
