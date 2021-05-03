import { Fragment, useContext, useState } from "react";

import { ClientContext } from "../contexts/Contexts";

import { useGetCaptchaSiteKey } from "../hooks/useQueries";

import { Topbar } from "./shared/Sidebar";
import { MainBox } from "./shared/Box";
import { Spinner } from "./shared/Spinner";
import { Button } from "./shared/Inputs";

import { DatabaseClient } from "../index";

export function Entrance(): JSX.Element {
	const { clientState } = useContext(ClientContext);

	const signIn = async () => {
		await DatabaseClient.auth.signIn({ provider: "github" }, { redirectTo: "http://localhost:3000" });
	};

	return (
		(clientState === "loggedout")
			? <MainBox>
				<Button onClick={signIn} value={"Sign in using Github"} />
				<Topbar />
			</MainBox>
			: <Fragment />
	);
}
