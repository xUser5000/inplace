class APIDocs {
	static _docs = {
		openapi: "3.0.0",
		info: {
			title: "Inplace API",
			version: "1.0.0",
			description: "We help you find the right place"
		},
		servers: [
			{
				url: "http://localhost:3000",
				description: "Development server"
			}
		]
	};

	static get() {
		return this._docs;
	}

	static set(obj) {
		this._docs = obj;
	}
}

module.exports = { APIDocs };
