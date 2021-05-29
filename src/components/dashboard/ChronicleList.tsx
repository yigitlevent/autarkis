import { useContext } from "react";
import styled from "styled-components";

import { SortObjects } from "../../function/utility";

import { ClientContext } from "../../contexts/Contexts";

import { useListChronicles } from "../../hooks/useQueries";

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

export function ChronicleList({ createSheet }: aut.props.SheetList): JSX.Element {
	const { clientState } = useContext(ClientContext);

	const chronicleList = useListChronicles(clientState !== "offline");

	return (
		<SmallBox>
			<Subtitle>CHRONICLES</Subtitle>

			<IconBox>
				<Icon size={24} name={"freeform"} hover brightness>
					<Button value={""} title={"New Chronicle"}
						onClick={() => createSheet("chronicle", undefined, undefined)}
					/>
				</Icon>
			</IconBox>

			{(clientState !== "offline" && chronicleList.status === "loading")
				? <Spinner />
				: (chronicleList.status === "error")
					? <span>Error: {(chronicleList.error as any).message}</span>
					: <List>
						{SortObjects(chronicleList.data)?.map((chro: any, index: number) =>
							<SheetListRow key={index} createSheet={createSheet}
								sheetData={{
									name: chro.name, uuid: chro.uuid,
									date: chro.created_at, creator: chro.storyteller_name,
									ruleset: chro.ruleset, category: "chronicle"
								}}
							/>
						)}
					</List>
			}
		</SmallBox>
	);
}
