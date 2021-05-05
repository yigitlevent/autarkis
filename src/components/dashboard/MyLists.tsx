import { Fragment, useContext } from "react";
import styled from "styled-components";

import { SortObjects } from "../../function/utility";

import { ClientContext, SheetContext } from "../../contexts/Contexts";

import { useListCharacters, useListChronicles } from "../../hooks/useQueries";

import { Subtitle } from "../shared/Sheet";
import { Spinner } from "../shared/Spinner";

import { MyListsRow } from "./mylists/MyListsRow";

const Wrapper = styled.div`
	width: 100%;
	margin: 2px 0 10px;
`;

const Button = styled.input`
	border: none !important;
	background: none !important;
	font-size: 0.85em !important;
	margin: -24px 5px;
	padding: 4px 6px 2px;
	float: right;
`;

const List = styled.div`
	font-size: 1em;
	margin: 0 10px;

	& > *:nth-child(2n) {
		background: ${(props: aut.theme.StyleProps) => props.theme.row.background};
	}
`;

export function MyLists(): JSX.Element {
	const { changeSheet } = useContext(SheetContext);
	const { clientState } = useContext(ClientContext);

	const chronicleList = useListChronicles(clientState !== "offline");
	const characterList = useListCharacters(clientState !== "offline");

	return (
		<Fragment>
			<Wrapper>
				<Subtitle>MY CHRONICLES</Subtitle>
				<Button className="button" type="button" value="Create New Chronicle" onClick={() => { changeSheet("chronicle", undefined, undefined, false); }} />

				{(clientState !== "offline" && chronicleList.status === "loading")
					? <Spinner />
					: (chronicleList.status === "error")
						? <span>Error: {(chronicleList.error as any).message}</span>
						: <List>
							{SortObjects(chronicleList.data)?.map((chro: any, index: number) =>
								<MyListsRow key={index}
									sheetData={{
										name: chro.name, uuid: chro.uuid,
										date: chro.created_at, creator: chro.storyteller_name,
										ruleset: chro.ruleset, type: "chronicle"
									}}
								/>
							)}
						</List>
				}
			</Wrapper>

			<Wrapper>
				<Subtitle>MY CHARACTERS</Subtitle>
				<Button className="button" type="button" value="Create New Character" onClick={() => { changeSheet("character", undefined, undefined, false); }} />

				{(clientState !== "offline" && characterList.status === "loading")
					? <Spinner />
					: (characterList.status === "error")
						? <span>Error: {(characterList.error as any).message}</span>
						: <List>
							{SortObjects(characterList.data)?.map((char: any, index: number) =>
								<MyListsRow key={index}
									sheetData={{
										name: char.name, uuid: char.uuid,
										date: char.created_at, creator: char.player_name,
										ruleset: char.ruleset, type: "character"
									}}
								/>
							)}
						</List>
				}
			</Wrapper>
		</Fragment>
	);
}
