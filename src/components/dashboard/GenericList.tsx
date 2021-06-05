import { useContext, useEffect, useState } from "react";

import { CapitalizeFirstLetter, SortObjects } from "../../function/utility";

import { ClientContext } from "../../contexts/Contexts";

import { useList } from "../../hooks/useList";

import { IconBox, List, EmptyListError } from "../shared/List";
import { Subtitle } from "../shared/Sheet";
import { Spinner } from "../shared/Spinner";
import { Icon } from "../shared/Icon";
import { Button } from "../shared/Inputs";
import { SmallBox } from "../shared/Box";

import { DatabaseClient } from "../../index";

import { SheetListRow } from "./lists/SheetListRow";

export function GenericList({ category, tableName, createSheet }: aut.props.SheetList): JSX.Element {
	const { clientState } = useContext(ClientContext);

	const [list, error, done] = useList(clientState !== "offline", tableName, DatabaseClient.auth.session()?.user?.id);

	const [listElement, setListElement] = useState<JSX.Element>(<Spinner />);

	useEffect(() => {
		console.log(clientState, list, error, done);

		if (clientState === "offline") {
			setListElement(<EmptyListError>Cannot get {category} list in offline mode.</EmptyListError>);
		}
		else if (error || list?.length === 0) {
			setListElement(<EmptyListError>Cannot find any {tableName}, either create a new {category} or refresh the page.</EmptyListError>);
		}
		else if (!done) {
			setListElement(<Spinner />);
		}
		else {
			const listElements = SortObjects(list)?.map((row: aut.server.DataReturn, index: number) =>
				<SheetListRow
					key={index}
					createSheet={createSheet}
					sheetData={{
						name: row.name,
						uuid: row.uuid,
						date: row.created_at,
						category: category,
						ruleset: row.data._primary.ruleset.text.current,
						creator: row.data.basics.user.text.current,
					}}
				/>
			);

			setListElement(<List>{listElements}</List>);
		}
	}, [category, clientState, createSheet, done, error, list, tableName]);

	return (
		<SmallBox>
			<Subtitle>{category.toUpperCase()}</Subtitle>

			<IconBox>
				<Icon size={24} name={"freeform"} hover brightness>
					<Button value={""} title={`New Freeform ${CapitalizeFirstLetter(category)}`}
						onClick={() => {
							createSheet(category, undefined, undefined);
						}}
					/>
				</Icon>
			</IconBox>

			{listElement}
		</SmallBox>
	);
}
