import { useContext } from "react";
import { Provider } from "@supabase/gotrue-js";
import styled from "styled-components";

import { ClientContext } from "../contexts/Contexts";

import { DatabaseClient } from "../index";

import { Icon } from "./shared/Icon";
import { IconLink } from "./shared/Link";
import { Button } from "./shared/Inputs";

const TopbarWrapper = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: start;
	align-items: center;
	align-content: stretch;

	width: 100vw;
	height: max-content;
	z-index: 100;
	position: sticky;
	top: 0;
	
	background: ${(props: aut.theme.StyleProps) => props.theme.box.background};
	border-bottom: ${(props: aut.theme.StyleProps) => props.theme.box.border};

	& > * {
		margin: 5px;
	}
`;

const Title = styled.div`
	flex: 1 1 auto;
	font-size: 2em;
`;

const Subtitle = styled.div`
	flex: 0 0 auto;
	font-size: 1em;
`;

const DarkPackLogo = styled.a`
	display: block;
	height: 40px;
	width: 60px;
	
	background: ${(props: aut.theme.StyleProps) => props.theme.box.background} url("./assets/dark_pack.png") no-repeat center center;
	background-size: 60px 40px;
	outline: ${(props: aut.theme.StyleProps) => props.theme.box.border};

	&:active,
	&:focus {
		border: none;
		appearance: none;
	}
`;

export function Topbar(): JSX.Element {
	const { clientUsername, clientState, setClientState } = useContext(ClientContext);

	const signOut = async (): Promise<void> => {
		DatabaseClient.auth.signOut().then(() => { setClientState("signedout"); });
	};

	const signIn = async (provider: Provider): Promise<void> => {
		await DatabaseClient.auth.signIn({ provider: provider }, { redirectTo: process.env.REACT_APP_REDIRECT_URL });
	};

	return (
		<TopbarWrapper>
			<Title>
				AUTARKIS
				{(clientState === "offline") ? <Subtitle>(Offline)</Subtitle> : ""}
			</Title>

			{(clientState === "signedout")
				? <Button onClick={() => signIn("github")} value={"Sign in using Github"} />
				: null
			}

			<Subtitle>{(clientState === "signedin") ? `Welcome, ${clientUsername}` : ""}</Subtitle>

			{(clientState === "signedin")
				? <IconLink onClick={signOut} title="Logout">
					<Icon size={24} name={"logout"} hover />
				</IconLink>
				: null
			}

			<IconLink href="https://github.com/yigitlevent/autarkis" title="Autarkis Github Repository" target="_blank" rel="noopener noreferrer">
				<Icon size={20} name={"github"} hover />
			</IconLink>

			<IconLink href="https://discord.gg/w23ayKCKKZ" title="Autarkis Bot Discord Server" target="_blank" rel="noopener noreferrer">
				<Icon size={24} name={"discord"} hover />
			</IconLink>

			<DarkPackLogo href="https://worldofdarkness.com/dark-pack" title="Dark Pack" target="_blank" rel="noopener noreferrer" />
		</TopbarWrapper>
	);
}
