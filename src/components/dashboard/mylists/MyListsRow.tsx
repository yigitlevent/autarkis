import { useContext, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

import { SheetContext } from "../../../contexts/Contexts";

import { Icon } from "../../shared/Icon";
import { Link } from "../../shared/Link";

const Row = styled.div`
	margin: 6px 0;
	display: grid;
	grid-template-columns: 30px 30px 1fr;
	grid-template-rows: 22px;
	padding: 2px 0 2px 5px;
`;

const Button = styled.div<{ hover?: boolean; }>`
	height: 21px;
	width: 21px;

	&:hover{
		${p => (p.hover ? "cursor: pointer;" : "")}
	}
`;

export function MyListsRow({ sheetData }: aut.props.MyListRow): JSX.Element {
	const { changeSheet } = useContext(SheetContext);

	const [data] = useState(() => {
		const splitDateTime = (sheetData.date as string).split("T");
		const splitDate = splitDateTime[0].split("-");

		return {
			name: sheetData.name,
			uuid: sheetData.uuid,
			date: `Created At: ${splitDateTime[1].split(".")[0]}, ${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`,
			creator: sheetData.creator,
			category: sheetData.category,
			ruleset: sheetData.ruleset
		};
	});

	return (
		<Row>
			<Button title={data.date}>
				<Icon size={21} name={"time"} brightness />
			</Button>

			<Button title={"Secret Key"} hover onClick={() => {
				if (data.uuid.length > 0) {
					navigator.clipboard.writeText(data.uuid);
					toast.info(`Secret Key copied. \n ${data.uuid}`);
				}
			}}>
				<Icon size={21} name={"secret_key"} hover brightness />
			</Button>

			<Link className="name" onClick={() => { changeSheet(data.category, data.uuid, data.ruleset, false); }}>{data.name}</Link>

			<span className={"hide"}>{data.creator}</span>
		</Row>
	);
}
