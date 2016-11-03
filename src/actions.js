import config from "./config";
import xhr from "xhr";


export default function actionsMaker(dispatch) {
  const actions = {
    onFetchEntry: function(type, id) {
      const options = {
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
        },
        url: `${config.timbuctooUrl}/domain/${config.collections[type]}/${id}`
      };

      dispatch({type: "ENTRY_PENDING"});

      xhr(options, function(err, resp, body) {
        dispatch({
          type: "SELECT_ENTRY",
          entryData: JSON.parse(body)
        })
      });
    }
  };
  return actions;
}