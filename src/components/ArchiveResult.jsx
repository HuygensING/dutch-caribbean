import React from "react";
import {makeArchiveUrl} from "../router";

export default React.createClass({
	render() {
		let r = this.props.data.data || {};
		let id = this.props.data.id;
		return (<li id={id} key={id}>
			<a className="title" href={makeArchiveUrl(id)}>{r.titleEng || "(no title)"}</a>
      <span className="right">{r.beginDate} - {r.endDate}</span>
    	<span className="ref">{ (r.countries || "").split(";")[0] } {r.refCodeArchive} {r.refCode} {r.subCode} {r.itemNo || r.series}</span>
    </li>);
  }
});
