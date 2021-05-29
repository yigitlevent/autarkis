import { useContext } from "react";
import styled from "styled-components";

import { SortObjects } from "../../function/utility";

import { ClientContext } from "../../contexts/Contexts";

import { useListCharacters } from "../../hooks/useQueries";

import { Subtitle } from "../shared/Sheet";
import { Spinner } from "../shared/Spinner";
import { Icon } from "../shared/Icon";

import { SheetListRow } from "./mylists/SheetListRow";
import { Button } from "../shared/Inputs";
import { SmallBox } from "../shared/Box";

const IconBox = styled.div`
	float: right;
	margin: -26px 0 0;

	& > * {
		display: inline-block;
	}
`;

const List = styled.div`
	margin: 0 9px;
	overflow: auto;

	& > *:nth-child(2n) {
		background: ${(props: aut.theme.StyleProps) => props.theme.row.background};
	}
`;

export function CharacterList({ createSheet }: aut.props.SheetList): JSX.Element {
	const { clientState } = useContext(ClientContext);

	const characterList = useListCharacters(clientState !== "offline");

	return (
		<SmallBox>
			<Subtitle>UNASSIGNED CHARACTERS</Subtitle>

			<IconBox>
				<Icon size={24} name={"freeform"} hover brightness>
					<Button value={""} title={"New Freeform Character"}
						onClick={() => {
							createSheet("character", undefined, undefined);
						}}
					/>
				</Icon>

				<Icon size={24} name={"generated"} hover brightness>
					<Button value={""} title={"New Generated Character"}
						onClick={() => createSheet("generator", undefined, undefined)}
					/>
				</Icon>
			</IconBox>

			{(clientState !== "offline" && characterList.status === "loading")
				? <Spinner />
				: (characterList.status === "error")
					? <span>Error: {(characterList.error as any).message}</span>
					: <List>
						{SortObjects(characterList.data)?.map((char: any, index: number) =>
							<SheetListRow key={index} createSheet={createSheet}
								sheetData={{
									name: char.name, uuid: char.uuid,
									date: char.created_at, creator: char.player_name,
									ruleset: char.ruleset, category: "character"
								}}
							/>
						)}
					</List>
			}
		</SmallBox>
	);
}
