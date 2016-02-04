import React from "react";

export default React.createClass({
	render() {
    let r = this.props.data.data;
		let id = this.props.data.id;
		return (<li id={id} key={id}>
      <a className="title" href={`/legislation/${id}`}>{r.titleEng}</a>
      <span className="right">{r.date1}</span>
    </li>);
  }
});
