export function MakeRequest(path: string, data?: aut.request.Types): Promise<aut.server.ResponseData> {
	return new Promise<aut.server.ResponseData>((resolve, reject) => {
		const request = new XMLHttpRequest();
		request.open("POST", path, true); // true = asynchronous
		request.overrideMimeType("application/json");
		request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

		request.onreadystatechange = () => {
			if (request.readyState === XMLHttpRequest.DONE) {

				if (request.status < 500) {
					const response = JSON.parse(request.response) as aut.server.ResponseData;

					if (response.success === "error") {
						reject(response);
					}
					else {
						resolve(response);
					}
				}
				else {
					reject({ success: "error", data: ["offline"] });
				}
			}
		};

		if (data) { request.send(JSON.stringify(data)); }
		else { request.send(); }
	});
}
