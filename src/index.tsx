import { Fragment, StrictMode, useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createClient, Session } from "@supabase/supabase-js";
import { Slide } from "react-toastify";

import { ThemeProvider } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyle } from "./theme/global";
import { DarkTheme } from "./theme/_themes";

import { ClientContext } from "./contexts/Contexts";

import { Spinner } from "./components/shared/Spinner";
import { StyledToast } from "./components/shared/StyledToast";

import { Dashboard } from "./components/Dashboard";
import { Topbar } from "./components/Topbar";

export const DatabaseClient = createClient(process.env.REACT_APP_DATABASE_URL as string, process.env.REACT_APP_DATABASE_KEY as string);

function App(): JSX.Element {
	const [clientState, setClientState] = useState<aut.ClientState>("presign");
	const [clientUsername, setClientUsername] = useState<undefined | string>(undefined);

	// TODO: Delete later
	console.log(process.env.NODE_ENV);

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
		setClientState("presign");

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
				{(clientState === "presign")
					? <Spinner overlay={false} size={["100vw", "100vh"]} />
					: <Fragment>
						<Topbar />
						{(clientState === "signedin") ? <Dashboard /> : null}
					</Fragment>
				}
			</ClientContext.Provider>

		</ThemeProvider>
	);
}

ReactDOM.render(<StrictMode><App /></StrictMode>, document.getElementById("root"));
