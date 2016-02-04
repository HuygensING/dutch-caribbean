import React from "react";

export default React.createClass({
	render() {
		console.log(this.props.data);
    let r = this.props.data.data || {};
		let id = this.props.data.id;
		return (<li id={id} key={id}>
			<a className="title" href={`/archive/${id}`}>{r.titleEng}</a>
      <span className="right">{r.beginDate} - {r.endDate}</span>
    	<span className="ref">{r.countries[0]} {r.refCodeArchive} {r.refCode} {r.subCode} {r.itemNo || r.series}</span>
    </li>);
  }
});
