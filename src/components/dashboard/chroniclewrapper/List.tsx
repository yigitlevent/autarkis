import { Fragment, useContext } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

import { SortObjects } from "../../../function/utility";

import { ClientContext } from "../../../contexts/Contexts";

import { DatabaseClient, useListChronicleCharacters } from "../../../hooks/useQueries";

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

export function List({ chronicleUUID, chronicleName, sheetDisplayType }: aut.props.CharacterList): JSX.Element | null {
	const { clientState } = useContext(ClientContext);

	const { data, status, error, refetch } = useListChronicleCharacters(clientState !== "offline", chronicleUUID);

	const addCharacter = (): void => {
		const characterUUID = (document.getElementById("character_uuid") as HTMLInputElement).value;

		DatabaseClient.from("characters").update({ chronicle_uuid: chronicleUUID, chronicle_name: chronicleName })
			.eq("uuid", characterUUID).is("chronicle_uuid", null).is("chronicle_name", null).single()
			.then((response) => {
				if (response.error) { /* TODO: toast */ }
				else { }
				refetch();
			});
	};

	const removeCharacter = (): void => {
		const characterUUID = (document.getElementById("character_uuid") as HTMLInputElement).value;

		DatabaseClient.from("characters").update({ chronicle_uuid: null, chronicle_name: null })
			.eq("uuid", characterUUID).eq("chronicle_uuid", chronicleUUID).eq("chronicle_name", chronicleName).single()
			.then((response) => {
				if (response.error) { /* TODO: toast */ }
				else { }
				refetch();
			});
	};

	const switchCharacterEditability = (editable: boolean): void => {
		const characterUUID = (document.getElementById("character_uuid") as HTMLInputElement).value;

		DatabaseClient.from("characters").update({ editable: editable })
			.eq("uuid", characterUUID).single()
			.then((response) => {
				if (response.error) { /* TODO: toast */ }
				else { }
				refetch();
			});
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
								<Button value={""} onClick={() => { addCharacter(); }} />
							</Icon>

							<Icon size={24} name={"remove"} hover brightness float={"right"} title>
								<Button value={""} onClick={() => { removeCharacter(); }} />
							</Icon>

							<input className="extra" type="text" id="character_uuid" placeholder={"Character UUID"} />

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
									<Button value={""} onClick={() => { switchCharacterEditability(!character.editable); }} />
								</Icon>

								<span className="name">{character.name}</span>
							</Row>
						)}
					</Wrapper>
				</Fragment>
	);
}
