import { StrictMode, useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Session, Provider } from "@supabase/supabase-js";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Slide } from "react-toastify";

import styled, { ThemeProvider } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyle } from "./theme/global";
import { DarkTheme } from "./theme/_themes";

import { ClientContext } from "./contexts/Contexts";

import { DatabaseClient, GlobalQueryClient } from "./hooks/useQueries";

import { Spinner } from "./components/shared/Spinner";
import { StyledToast } from "./components/shared/StyledToast";

import { MainBox } from "./components/shared/Box";
import { Button } from "./components/shared/Inputs";
import { Sidebar } from "./components/shared/Sidebar";

import { Dashboard } from "./components/Dashboard";

const MainWrapper = styled.div`
	width: 100%;
	margin: 0 auto;
	padding: 4px 0;

	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: auto 1fr;
	grid-gap: 12px;
`;

const DarkPackLogo = styled.a`
	display: block;
	height: 40px;
	width: 60px;
	margin: 3px;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 666;
	
	background: ${(props: aut.theme.StyleProps) => props.theme.box.background} url("./assets/dark_pack.png") no-repeat center center;
	background-size: 60px 40px;
	outline: ${(props: aut.theme.StyleProps) => props.theme.box.border};

	&:active,
	&:focus {
		border: none;
		appearance: none;
	}
`;

function App(): JSX.Element {
	const [clientState, setClientState] = useState<aut.short.ClientState>("presign");
	const [clientUsername, setClientUsername] = useState<undefined | string>(undefined);

	// TODO: Delete later
	console.log(process.env.NODE_ENV);

	const signIn = async (provider: Provider): Promise<void> => {
		await DatabaseClient.auth.signIn({ provider: provider }, { redirectTo: process.env.REACT_APP_REDIRECT_URL });
	};

	const setSessionData = useCallback((session: Session | null) => {
		if (session && session.user) {
			setClientUsername(session.user.user_metadata.full_name);
			setClientState("signedin");
		}
		else {
			setClientUsername(undefined);
			setClientState("signedout");
		}
	}, []);

	useEffect(() => {
		const session = DatabaseClient.auth.session();
		setSessionData(session);
		const subscription = DatabaseClient.auth.onAuthStateChange((event, session) => { setSessionData(session); });
		return () => { subscription?.data?.unsubscribe(); };
	}, [setSessionData]);

	useEffect(() => {
		window.addEventListener("offline", () => { setClientState("offline"); });
		return () => { window.removeEventListener("offline", () => { setClientState("offline"); }); };
	}, []);

	return (
		<ThemeProvider theme={DarkTheme}>
			<GlobalStyle
				mainFont={"Petrona-Regular-wght"}
				italicFont={"Petrona-Italic-wght"}
			/>

			<StyledToast
				position="top-center"
				autoClose={10000}
				transition={Slide}
				pauseOnFocusLoss={true}
				pauseOnHover={true}
				newestOnTop={true}
				closeOnClick={false}
				rtl={false}
				draggable={false}
			/>

			<ClientContext.Provider value={{ clientState, clientUsername, setClientState, setClientUsername }}>
				<MainWrapper>
					{(clientState === "presign")
						? <Spinner overlay={false} size={["100vw", "100vh"]} />
						: (clientState === "signedin")
							? <Dashboard />
							: <MainBox>
								<Button onClick={() => signIn("github")} value={"Sign in using Github"} />
								<Sidebar />
							</MainBox>
					}
				</MainWrapper>
			</ClientContext.Provider>

			<DarkPackLogo href="https://worldofdarkness.com/dark-pack" title="Dark Pack" target="_blank" rel="noopener noreferrer" />
		</ThemeProvider>
	);
}

ReactDOM.render(
	<StrictMode>
		<QueryClientProvider client={GlobalQueryClient}>
			<ReactQueryDevtools initialIsOpen={true} position={"top-right"} />
			<App />
		</QueryClientProvider>
	</StrictMode>,
	document.getElementById("root")
);
