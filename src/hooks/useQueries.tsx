import { createClient } from "@supabase/supabase-js";
import { QueryClient, useQuery, UseQueryResult } from "react-query";

export const DatabaseClient = createClient(process.env.REACT_APP_DATABASE_URL as string, process.env.REACT_APP_DATABASE_KEY as string);

export const GlobalQueryClient = new QueryClient({ defaultOptions: { queries: { staleTime: Infinity, retry: false } } });

export function useListChronicleCharacters(online: boolean, uuid: undefined | string): UseQueryResult<aut.server.Character[], null> {
	const query = useQuery<aut.server.Character[], null>(["ChroCharList", uuid],
		async () => {
			const list = await DatabaseClient.from("characters").select("*").eq("chronicle_uuid", uuid);
			return list.data as aut.server.Character[];
		},
		{ enabled: (online && uuid) ? true : false }
	);

	return query;
}

export function useListChronicles(online: boolean): UseQueryResult<aut.server.Chronicle[], null> {
	const query = useQuery<aut.server.Chronicle[], null>("ChroList",
		async () => {
			const list = await DatabaseClient.from("chronicles").select("*").eq("storyteller_uuid", DatabaseClient.auth.session()?.user.id);
			return list.data as aut.server.Chronicle[];
		},
		{ enabled: (online) ? true : false }
	);

	return query;
}

export function useListCharacters(online: boolean): UseQueryResult<aut.server.Character[], null> {
	const query = useQuery<aut.server.Character[], null>("CharList",
		async () => {
			const list = await DatabaseClient.from("characters").select("*").eq("player_uuid", DatabaseClient.auth.session()?.user.id);
			return list.data as aut.server.Character[];
		},
		{ enabled: (online) ? true : false }
	);

	return query;
}

export function useGetCharacter(uuid: undefined | string): UseQueryResult<aut.server.Character, null> {
	const query = useQuery<aut.server.Character, null>(["CharSheet", uuid],
		async () => {
			const list = await DatabaseClient.from("characters").select("*").eq("uuid", uuid).single();
			return list.data as aut.server.Character;
		},
		{ enabled: (uuid) ? true : false }
	);

	return query;
}

export function useGetChronicle(uuid: undefined | string): UseQueryResult<aut.server.Chronicle, null> {
	const query = useQuery<aut.server.Chronicle, null>(["ChroSheet", uuid],
		async () => {
			const list = await DatabaseClient.from("chronicles").select("*").eq("uuid", uuid).single();
			return list.data as aut.server.Chronicle;
		},
		{ enabled: (uuid) ? true : false }
	);

	return query;
}
