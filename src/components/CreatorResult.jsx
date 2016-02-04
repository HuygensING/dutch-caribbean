import React from "react";

export default React.createClass({
	render() {
    let r = this.props.data;
		return (<li id={r.id} key={r.id}>
      <a className="title" href={`/creator/${r.id}`}>{r.displayName}</a>
    		{/*<span class="right">{String(r.beginDate).split('-')[0]} - {String(r.endDate).split('-')[0]}</span>
    		<span class="ref">{r.countries[0]} {r.refCodeArchive} {r.refCode} {r.subCode} {r.itemNo || r.series}</span>*/}
    </li>);
  }
});
