import { Fragment, createRef, useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import Select, { Option } from "react-basic-select";

import { Dot, PseudoCheckbox } from "../../rulesets/_generic";
import { Rulesets } from "../../rulesets/_rulesets";

import { CleanString } from "../../function/utility";

import { ClientContext } from "../../contexts/Contexts";

import { Topbox, TopboxButton, TopboxChildren, TopboxTitle } from "../shared/Topbox";

const Results = styled.div`
	width: 360px;
	max-width: 100%;
	height: auto;
	margin: 4px auto;
	padding: 8px;

	background: ${(props: aut.theme.StyleProps) => props.theme.box.background};
	outline: ${(props: aut.theme.StyleProps) => props.theme.box.border};
`;

const Result = styled.div`
	padding: 4px;
`;

export function DiceRoller({ event, character, setDiceRoller }: aut.props.DiceRoller): JSX.Element {
	const { clientState } = useContext(ClientContext);

	const ref = createRef<HTMLFormElement>();

	const [rulesetName] = useState(character?.data._primary.ruleset.text.current as aut.ruleset.Names);

	const [parts] = useState((event.target as any).id.split("."));
	const [result, setResult] = useState<undefined | string>(undefined);

	const [selectedAbilities, setSelectedAbilities] = useState<string[]>([]);

	const [title] = useState(
		`${(parts[3] === "standard") ? "Standard" : ((event.target as HTMLElement)?.parentElement?.nextSibling as HTMLElement)?.innerText
		} ${(parts[4] === "rouseCheck") ? "" : "Roll"}`
	);

	const getPoolSize = useCallback((category: string, name: string, type: "number" | "checkbox" | "dot" | "pseudocheckbox" | "text", pcValue?: string): number | string => {
		console.log(category);
		console.log(name);
		console.log(type);

		if (type === "pseudocheckbox" && pcValue) { return (character?.data[category][name].pseudocheckbox as PseudoCheckbox).getAmount(pcValue); }
		else if (type === "number") { return parseInt(character?.data[category][name].text.current as string); }
		else if (type === "text") { return character?.data[category][name].text.current as string; }
		return parseInt(character?.data[category][name][type].current as string);
	}, [character?.data]);

	const getData = useCallback(() => {
		const data: { [key: string]: number | boolean; } = {};

		if (ref && ref.current) {
			console.log(ref.current);

			for (let i = 0; i < ref.current.length; i++) {
				const current = ref.current[i] as HTMLInputElement;
				if (current.type === "checkbox") { data[current.id] = current.checked; }
				else if (current.id.length > 0) { data[current.id] = parseInt(current.value); }
			}
		}

		return data;
	}, [ref]);

	const setAbilities = (selected: Option[]): void => {
		const arr = selected.map((v: any) => v.value);
		setSelectedAbilities(arr);
	};

	const onValueChange = useCallback(() => {
		const data = getData();

		let abilityBonus = 0;
		for (const ability in selectedAbilities) {
			const current = selectedAbilities[ability].split(" ");
			abilityBonus += getPoolSize(current[0], current[1], "dot") as number;
		}

		const basePoolInput = (document.getElementById("basePool") as HTMLInputElement);
		if (basePoolInput) basePoolInput.value = abilityBonus.toString();

		let pool = abilityBonus;

		if (data["modifierPool"]) pool += (data["modifierPool"] as number);
		if (data["hasSurge"]) pool += getPoolSize("the_blood", "blood_surge", "number") as number;
		if (data["hasHumanity"]) pool += Math.floor((getPoolSize("the_blood", "humanity", "pseudocheckbox", (Rulesets.getRuleset(rulesetName)).basics.pseudoCheckboxInputs.square) as number) / 3);
		if (data["hasSpeciality"]) pool += 1;

		const input = (document.getElementById("totalPool") as HTMLInputElement);
		if (input) input.value = Math.max(1, pool).toString();
	}, [rulesetName, selectedAbilities, getData, getPoolSize]);

	const rollDice = (offline: boolean) => {
		const data = getData();

		if (parts[3] === "standard") {
			setResult(
				character?.rollStandard(
					title,
					data.difficulty as number,
					data.totalPool as number,
					data.hasHunger as boolean,
					data.hasSurge as boolean,
					data.rouse as number,
					offline
				)
			);
		}
		else if (parts[4] === "rouseCheck" || parts[4] === "willpower" || parts[4] === "humanity") {
			setResult(
				character?.rollCheck(
					title,
					data.difficulty as number,
					data.totalPool as number,
					offline
				)
			);
		}
		else if (parts[4] === "compulsion") {
			setResult(character?.rollCompulsion(title, offline));
		}
	};

	useEffect(() => {
		onValueChange();
	}, [selectedAbilities, onValueChange]);

	const [defaultMainValue] = useState(() => {
		if (parts[4] === "compulsion") { return 1; }
		else if (parts[4] === "willpower") {
			const dotEmptyAmount = (character?.data[parts[3]][parts[4]].dot as Dot).getEmpty();
			const pseudocheckboxEmptyAmount = (character?.data[parts[3]][parts[4]].pseudocheckbox as PseudoCheckbox).getEmpty();
			return pseudocheckboxEmptyAmount - dotEmptyAmount;
		}
		else if (parts[4] === "humanity") {
			return (character?.data[parts[3]][parts[4]].pseudocheckbox as PseudoCheckbox).getEmpty();
		}

		return 0;
	});

	const options = [
		{
			name: "Attributes",
			value: "attributes",
			options: (Rulesets.getRuleset(rulesetName)).basics.attributes.sort().map((v) => {
				return { name: v, value: CleanString(v) };
			}),
		},
		{
			name: "Skills",
			value: "skills",
			options: (Rulesets.getRuleset(rulesetName)).basics.skills.sort().map((v) => {
				return { name: v, value: CleanString(v) };
			})
		},
		{
			name: "Disciplines",
			value: "disciplines",
			options: (Rulesets.getRuleset(rulesetName)).basics.disciplines.sort().map((v) => {
				// TODO: Filter out Custom 1-3 if their respective text inputs are empty
				return { name: v, value: CleanString(v) };
			})
		}
	];

	console.log(parts);

	return (
		<Topbox
			title={title}
			formRef={ref}
			otherChildren={
				(result)
					? <Results>
						<TopboxTitle>Results</TopboxTitle>
						<Result>{result}</Result>
					</Results>
					: undefined
			}
		>
			{(parts[4] === "compulsion")
				? <Fragment />
				: <Fragment>

					{(parts[3] === "standard")
						? <TopboxChildren columns={1} span={2}>
							<Select
								options={options}
								onSelectedChange={setAbilities}
								multi={true}
								search={true}
								appendGroupValue={true}
								showAsText={true}
								placeholder={"Select abilities"}
							/>
						</TopboxChildren>
						: null
					}

					<TopboxChildren columns={2}>
						<label>Base Pool</label>
						<input type="number" id="basePool" readOnly defaultValue={defaultMainValue} onChange={onValueChange} />
					</TopboxChildren>

					<TopboxChildren columns={2}>
						<label>Modifier</label>
						<input type="number" id="modifierPool" min={-50} max={50} defaultValue={0} onChange={onValueChange} />
					</TopboxChildren>

					{(parts[4] === "willpower")
						? <TopboxChildren columns={3}>
							<label>Humanity?</label>
							<input type="checkbox" id="hasHumanity" onChange={onValueChange} defaultChecked={true} />
							<input type="number" readOnly
								defaultValue={getPoolSize("the_blood", "humanity", "pseudocheckbox", (Rulesets.getRuleset(rulesetName)).basics.pseudoCheckboxInputs.square)}
							/>
						</TopboxChildren>
						: null
					}

					{(parts[3] === "standard")
						? <Fragment>

							<TopboxChildren columns={2}>
								<label>Speciality?</label>
								<input type="checkbox" id="hasSpeciality" onChange={onValueChange} />
							</TopboxChildren>

							<TopboxChildren columns={2}>
								<label>Rouse #</label>
								<input type="number" id="rouse" min={0} max={50} defaultValue={0} />
							</TopboxChildren>

							<TopboxChildren columns={3}>
								<label>Blood Surge?</label>
								<input type="checkbox" id="hasSurge" onChange={onValueChange} />
								<input type="number" readOnly
									defaultValue={getPoolSize("the_blood", "blood_surge", "number") as number}
								/>
							</TopboxChildren>

							<TopboxChildren columns={3}>
								<label>Hunger?</label>
								<input type="checkbox" id="hasHunger" defaultChecked={true} />
								<input type="number" readOnly
									defaultValue={getPoolSize("the_blood", "hunger", "checkbox")}
								/>
							</TopboxChildren>

						</Fragment>
						: null
					}

					{(parts[4] === "willpower")
						? <TopboxChildren columns={2} />
						: null
					}

					{(parts[3] === "standard" || parts[4] === "willpower" || parts[4] === "humanity")
						? <TopboxChildren columns={2} topBorder>
							<label>Difficulty</label>
							<input type="number" id="difficulty" min={1} max={10} defaultValue={1} />
						</TopboxChildren>
						: <TopboxChildren columns={2} topBorder />
					}

					<TopboxChildren columns={2} topBorder>
						<label>Total Pool</label>
						<input type="number" id="totalPool" min={0} max={100} defaultValue={defaultMainValue} readOnly />
					</TopboxChildren>

				</Fragment>
			}

			<TopboxChildren columns={(clientState !== "offline") ? -1 : 0} span={2} topBorder>
				{(clientState !== "offline") ? <TopboxButton value="Roll" onClick={() => rollDice(false)} /> : null}
				<TopboxButton value="Offline Roll" onClick={() => rollDice(true)} />
				<TopboxButton value="Close" onClick={() => { setDiceRoller(); }} />
			</TopboxChildren>

		</Topbox >
	);
}
