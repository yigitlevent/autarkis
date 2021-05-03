import { useQuery, UseQueryResult } from "react-query";

import { MakeRequest } from "../function/makeRequest";

export function useListChronicleCharacters(uuid: undefined | string): UseQueryResult<aut.server.Character[], string[]> {
	const query = useQuery<aut.server.Character[], string[]>(["ChroCharList", uuid],
		async () => {
			const list = await MakeRequest("/chro/char/list", { chroKey: uuid as string });
			return list.data as aut.server.Character[];
		},
		{ enabled: (uuid) ? true : false }
	);

	return query;
}

export function useListChronicles(online: boolean): UseQueryResult<aut.server.Chronicle[], string[]> {
	const query = useQuery<aut.server.Chronicle[], string[]>("ChroList",
		async () => {
			const list = await MakeRequest("/chro/list");
			return list.data as aut.server.Chronicle[];
		},
		{ enabled: false }
	);

	return query;
}

export function useListCharacters(online: boolean): UseQueryResult<aut.server.Character[], string[]> {
	const query = useQuery<aut.server.Character[], string[]>("CharList",
		async () => {
			const list = await MakeRequest("/char/list");
			return list.data as aut.server.Character[];
		},
		{ enabled: false }
	);

	return query;
}

export function useGetCharacter(uuid: undefined | string): UseQueryResult<aut.server.Character, string[]> {
	const query = useQuery<aut.server.Character, string[]>(["CharSheet", uuid],
		async () => {
			const list = await MakeRequest("/char/get", { charKey: uuid as string });
			return list.data as aut.server.Character;
		},
		{ enabled: (uuid) ? true : false }
	);

	return query;
}

export function useGetChronicle(uuid: undefined | string): UseQueryResult<aut.server.Chronicle, string[]> {
	const query = useQuery<aut.server.Chronicle, string[]>(["ChroSheet", uuid],
		async () => {
			const list = await MakeRequest("/chro/get", { chroKey: uuid as string });
			return list.data as aut.server.Chronicle;
		},
		{ enabled: (uuid) ? true : false }
	);

	return query;
}

export function useGetCaptchaSiteKey(online: boolean): UseQueryResult<string, string[]> {
	const query = useQuery<string, string[]>(["CaptchaSiteKey"],
		async () => {
			const list = await MakeRequest("/user/captcha");
			return list.data as string;
		},
		{ enabled: online }
	);

	return query;
}

export function useUserLogin(data: aut.request.user.Login): UseQueryResult<string, string[]> {
	const query = useQuery<string, string[]>(["UserLogin"],
		async () => {
			const list = await MakeRequest("/user/login", data);
			return list.data as string;
		},
		{ enabled: false }
	);

	return query;
}

export function useUserAuth(loggedIn: boolean): UseQueryResult<string, any> {
	const query = useQuery<string, any>(["UserAuth"],
		async () => {
			const list = await MakeRequest("/user/auth");
			return list.data as string;
		},
		{ enabled: loggedIn, staleTime: 1000 * 60 * 60 }
	);

	return query;
}
