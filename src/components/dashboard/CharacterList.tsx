import { useContext } from "react";

import { SortObjects } from "../../function/utility";

import { ClientContext } from "../../contexts/Contexts";

import { useListCharacters } from "../../hooks/useQueries";

import { IconBox, List, EmptyListError } from "../shared/List";
import { Subtitle } from "../shared/Sheet";
import { Spinner } from "../shared/Spinner";
import { Icon } from "../shared/Icon";
import { Button } from "../shared/Inputs";
import { SmallBox } from "../shared/Box";

import { SheetListRow } from "./lists/SheetListRow";

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
			</IconBox>

			{(clientState !== "offline" && characterList.status === "loading")
				? <Spinner />
				: (characterList.status === "error")
					? <span>Error: {(characterList.error as any).message}</span>
					: <List>
						{(characterList.data?.length === 0)
							? <EmptyListError>Cannot find any characters, either create a new character or refresh the page.</EmptyListError>
							: SortObjects(characterList.data)?.map((char: any, index: number) =>
								<SheetListRow key={index} createSheet={createSheet}
									sheetData={{
										name: char.name, uuid: char.uuid,
										date: char.created_at, creator: char.user_name,
										ruleset: char.ruleset, category: "character"
									}}
								/>
							)
						}
					</List>
			}
		</SmallBox>
	);
}
