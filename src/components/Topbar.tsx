import { Fragment, useContext, useState } from "react";
import { Provider } from "@supabase/gotrue-js";
import styled from "styled-components";

import { ClientContext } from "../contexts/Contexts";

import { DatabaseClient } from "../hooks/useQueries";

import { Icon } from "./shared/Icon";
import { IconLink } from "./shared/Link";
import { Button } from "./shared/Inputs";
import { Divider } from "./shared/Divider";

const ToggleWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 99;
	
	background: ${(props: aut.theme.StyleProps) => props.theme.box.background};
	outline: ${(props: aut.theme.StyleProps) => props.theme.box.border};
	
	height: 30px;
	width: 30px;
`;

const TopbarWrapper = styled.div`
	display: block;
	width: 100vw;
	height: 100vh;
	
	background: ${(props: aut.theme.StyleProps) => props.theme.gradient};

	position: absolute;
	top: 0;
	left: 0;

	z-index: 100;
	text-align: center;

	&.hideLeft {
		top: -100vw;
		transition-property: top;
		transition: 1000ms;
	}

	&.showLeft {
		top: 0;
		transition-property: top;
		transition: 1000ms;
	}
`;

const Logo = styled.div`
	background: transparent url("./assets/logo.png") no-repeat center center;
	background-size: 180px;
	height: 180px;
	width: 180px;
	margin: 10px auto;
	border: ${(props: aut.theme.StyleProps) => props.theme.row.border};
	border-radius: 100%;
`;

const Title = styled.div`
	font-size: 2.4em;
	text-align: center;
	margin-bottom: 12px;
`;

const Subtitle = styled.div`
	font-size: 0.4em;
`;

const IconWrapper = styled.div`
`;

export function Topbar(): JSX.Element {
	const { clientUsername, clientState, setClientState } = useContext(ClientContext);

	const [topbar, setTopbar] = useState(true);

	const signOut = async (): Promise<void> => {
		DatabaseClient.auth.signOut().then(() => { setClientState("signedout"); });
	};

	const signIn = async (provider: Provider): Promise<void> => {
		await DatabaseClient.auth.signIn({ provider: provider }, { redirectTo: process.env.REACT_APP_REDIRECT_URL });
	};

	return (
		<Fragment>
			{(clientState === "signedin")
				? <ToggleWrapper>
					<IconLink onClick={() => setTopbar(!topbar)}>
						<Icon size={24} name={"menu_toggle"} hover />
					</IconLink>
				</ToggleWrapper>
				: null
			}

			<TopbarWrapper className={(topbar) ? "showLeft" : "hideLeft"}>
				<Logo />

				<Title>
					AUTARKIS
					{(clientState === "offline") ? <Subtitle>(Offline)</Subtitle> : ""}
				</Title>

				<Divider title={(clientState === "signedin") ? `Welcome, ${clientUsername}` : undefined} />

				{(clientState === "signedin")
					? <Button onClick={() => setTopbar(!topbar)} value={"Click to Enter"} />
					: null
				}

				{(clientState === "signedout")
					? <Button onClick={() => signIn("github")} value={"Sign in using Github"} />
					: null
				}

				<IconWrapper>
					<IconLink href="https://github.com/yigitlevent/autarkis" title="Autarkis Github Repository" target="_blank" rel="noopener noreferrer">
						<Icon size={20} name={"github"} hover />
					</IconLink>

					<IconLink href="https://discord.gg/w23ayKCKKZ" title="Autarkis Bot Discord Server" target="_blank" rel="noopener noreferrer">
						<Icon size={24} name={"discord"} hover />
					</IconLink>

					<IconLink onClick={signOut} title="Logout">
						<Icon size={24} name={"logout"} hover />
					</IconLink>
				</IconWrapper>
			</TopbarWrapper>
		</Fragment>
	);
}
