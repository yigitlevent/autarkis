import { StrictMode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Slide } from "react-toastify";
import { createClient } from "@supabase/supabase-js";

import styled, { ThemeProvider } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyle } from "./theme/global";
import { DarkTheme } from "./theme/_themes";

import { ClientContext } from "./contexts/Contexts";

import { Spinner } from "./components/shared/Spinner";
import { StyledToast } from "./components/shared/StyledToast";

import { Entrance } from "./components/Entrance";
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

export const DatabaseClient = createClient(
	"https://ekuxtwwwiddozwwdkfjx.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDAyNjAwNiwiZXhwIjoxOTM1NjAyMDA2fQ.M9cEgca7EvBJY52LCNIKnZpYc4ZmfEjQAHUJ6p5t26Y"
);

export const GlobalQueryClient = new QueryClient({
	defaultOptions: {
		queries: { staleTime: Infinity, retry: false },
	},
});

function App(): JSX.Element {
	const [clientState, setClientState] = useState<aut.short.ClientState>("precheck");
	const [clientUsername, setClientUsername] = useState<undefined | string>(undefined);

	const { data, error } = DatabaseClient.auth.onAuthStateChange(
		(event, session) => {
			console.log("event");
			console.log(event);
			console.log(session);
		}
	);

	useEffect(() => {
		console.log("data");
		console.log(data);
		console.log(error);

		if (clientState === "precheck") {
			const session = DatabaseClient.auth.session();

			console.log("session");
			console.log(session);

			if (session) {
				setClientUsername(session.user.user_metadata.full_name);
				setClientState("loggedin");
			}
			else {
				setClientUsername(undefined);
				setClientState("loggedout");
			}
		}
	}, [data, error, clientState]);

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
					{(clientState === "precheck")
						? <Spinner overlay={false} size={["100vw", "100vh"]} />
						: (clientState === "loggedin")
							? <Dashboard />
							: <Entrance />
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
