import React from "react";

export default React.createClass({
	render() {
		return (
			<div className="wrapper">
				<div id="app" className="main">
					<div className="head"><a href="http://www.huygens.knaw.nl/"><img src="/images/HuygensING.png" className="HIlogo"/></a>
						<h1><a href="/"><img src="/images/dutch-caribbean.jpg" alt="The Dutch in the Caribbean" className="DClogo"/></a></h1>
					</div>
					<div id="main">
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
});
