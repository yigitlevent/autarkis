import { useContext } from "react";
import styled from "styled-components";

import { ClientContext } from "../../contexts/Contexts";

import { DatabaseClient } from "../../hooks/useQueries";

import { Icon } from "./Icon";
import { IconLink } from "./Link";

const IconWrapper = styled.div`
	float: left;
`;

const Title = styled.div`
	font-size: 2.4em;
	text-align: center;
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

const Sub = styled.div`
	font-size: 0.4em;
`;

const SidebarWrapper = styled.div`
	height: 100%;
	width: 100%;
	grid-row: 1 / span 2;
	grid-column: 2;
	border-left:  ${(props: aut.theme.StyleProps) => props.theme.box.border};

	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 200px 45px auto 30px;
	
	@media only screen and (max-width: 600px) {
		grid-row: 1 / span 2;
		grid-column: 1;
	}
`;

const SidebarContentRow = styled.div`
	width: 100%;
`;

const SidebarContent = styled.div`
	float: left;
	padding: 4px;
	margin: 4px 2px;
`;

export function Sidebar(): JSX.Element {
	const { clientUsername, clientState, setClientState } = useContext(ClientContext);

	const signOut = async (): Promise<void> => {
		DatabaseClient.auth.signOut().then(() => { setClientState("signedout"); });
	};

	return (
		<SidebarWrapper>
			<Logo />

			<Title>
				AUTARKIS
				{(clientState === "offline") ? <Sub>Offline</Sub> : ""}
			</Title>


			{(clientState === "signedin")
				? <SidebarContentRow>
					<SidebarContent>Hello, {clientUsername}</SidebarContent>
					<IconLink onClick={signOut} title="Logout">
						<Icon size={24} name={"logout"} hover />
					</IconLink>
				</SidebarContentRow>
				: null
			}

			<IconWrapper>
				<IconLink href="https://github.com/yigitlevent/autarkis" title="Autarkis Github Repository" target="_blank" rel="noopener noreferrer">
					<Icon size={20} name={"github"} hover />
				</IconLink>

				<IconLink href="https://discord.gg/w23ayKCKKZ" title="Autarkis Bot Discord Server" target="_blank" rel="noopener noreferrer">
					<Icon size={24} name={"discord"} hover />
				</IconLink>
			</IconWrapper>
		</SidebarWrapper>
	);
}
