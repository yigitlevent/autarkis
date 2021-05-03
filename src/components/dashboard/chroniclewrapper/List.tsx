import { Fragment } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

import { MakeRequest } from "../../../function/makeRequest";
import { SortObjects } from "../../../function/utility";

import { useListChronicleCharacters } from "../../../hooks/useQueries";

import { Icon } from "../../shared/Icon";
import { Button } from "../../shared/Inputs";
import { Extras, Subtitle } from "../../shared/Sheet";
import { Spinner } from "../../shared/Spinner";

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: auto;
	margin: 0 10px 10px;
`;

const Row = styled.div`
	margin: 6px 0 0;
	display: grid;
	grid-template-columns: 30px 30px 1fr;
	grid-template-rows: auto;
`;

export function List({ chronicleUUID, sheetDisplayType }: aut.props.CharacterList): JSX.Element | null {
	const { data, status, error, refetch } = useListChronicleCharacters(chronicleUUID);

	const character = (type: aut.short.ListChange): void => {
		const characterUUID = (document.getElementsByName("character.uuid")[0] as HTMLInputElement).value;

		MakeRequest(`/chro/char/${type}`, { chroKey: chronicleUUID, charKey: characterUUID })
			.catch((errors) => { toast.error(`Submit failed. \n ${errors.data.join(" \n ")}`); })
			.then(() => { refetch(); });
	};

	return (
		(status === "loading")
			? <Spinner />
			: status === "error"
				? <span>Error: {(error as any).message}</span>
				: <Fragment>
					<Subtitle>CHARACTERS</Subtitle>

					{(sheetDisplayType === "edit")
						? <Extras>

							<Icon size={24} name={"add"} hover brightness float={"right"} title>
								<Button value={""} onClick={() => { character("add"); }} />
							</Icon>

							<Icon size={24} name={"remove"} hover brightness float={"right"} title>
								<Button value={""} onClick={() => { character("remove"); }} />
							</Icon>

							<input className="extra" type="text" name="character.uuid" placeholder={"Character UUID"} />

						</Extras>
						: null
					}

					<Wrapper>
						{SortObjects(data)?.map((character: any) =>
							<Row key={character.uuid}>

								<Icon size={21} name={"secret_key"} hover brightness title>
									<Button value={""} onClick={() => {
										navigator.clipboard.writeText(character.uuid);
										toast.info(`Secret Key copied. \n ${character.uuid}`);
									}} />
								</Icon>

								<Icon size={21} name={(character.editable) ? "edit_on" : "edit_off"} hover brightness title>
									<Button value={""} onClick={() => {
										MakeRequest("/chro/char/editable", { charKey: character.uuid, editable: !character.editable })
											.then().catch().finally(() => { refetch(); });
									}} />
								</Icon>

								<span className="name">{character.name}</span>
							</Row>
						)}
					</Wrapper>
				</Fragment>
	);
}
