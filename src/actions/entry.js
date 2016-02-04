import config from "../config";
import xhr from "xhr";
import store from "../store"

let fetchEntry = function(type, id, dispatch) {
	let options = {
		headers: {
			"Accept": "application/json",
			"Content-type": "application/json"
		},
		url: `${config.timbuctooUrl}/domain/${config.collections[type]}/${id}`
	};
	xhr(options, function(err, resp, body) {
		dispatch({
			type: "SELECT_ENTRY",
			data: JSON.parse(body)
		})
	});
}

export function getEntry(type, id) {
	store.dispatch(redispatch => fetchEntry(type, id, redispatch));
}