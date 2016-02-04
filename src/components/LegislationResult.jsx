import React from "react";

export default React.createClass({
	render() {
    let r = this.props.data;
		return (<li id={r.id} key={r.id}>
      <a className="title" href={`/legislation/${r.id}`}>{r.displayName}</a>
      {/*<span class="title"><%= r.titleEng %></span>
      <span class="right"><%= r.date1 %></span>*/}
    </li>);
  }
});
