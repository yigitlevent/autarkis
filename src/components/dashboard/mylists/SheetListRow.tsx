import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Icon } from "../../shared/Icon";
import { Link } from "../../shared/Link";
dayjs.extend(utc);

const Row = styled.div`
	margin: 6px 0;
	display: grid;
	grid-template-columns: 30px 30px 30px 30px 1fr;
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

export function SheetListRow({ sheetData, createSheet: addSheet }: aut.props.SheetListRow): JSX.Element {
	const [data] = useState(() => {
		const dateTime = dayjs(sheetData.date).format("HH:mm:ss DD/MM/YYYY");

		return {
			name: sheetData.name,
			uuid: sheetData.uuid,
			date: dateTime,
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

			<Link className="name" onClick={() => { addSheet(data.category, data.ruleset, data.uuid); }}>{data.name}</Link>

			<span className={"hide"}>{data.creator}</span>
		</Row>
	);
}
