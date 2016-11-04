import React from "react";
import config from "../config";

export default React.createClass({

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.location.pathname !== this.props.location.pathname;
  },

  componentDidUpdate() {
    const { storedScrollTop } = this.props;
    if (typeof storedScrollTop !== "undefined") {
      console.log(storedScrollTop);
      window.scrollTo(0, storedScrollTop);
    }
  },

  render() {
    return (
      <div className="wrapper">
        <div id="app" className="main">
          <div className="head"><a href={config.huygensUrl}><img src="/images/HuygensING.png" className="HIlogo"/></a>
            <h1><a href={config.mainSiteUrl}><img src="/images/dutch-caribbean.jpg" alt="The Dutch in the Caribbean" className="DClogo"/></a></h1>
          </div>
          <nav className="navigation">
            <div className="menu-main-container">
              <ul id="menu-main" className="menu">
                <li id="menu-item-32" className="menu-item"><a href="http://dutch-caribbean.huygens.knaw.nl/">Home</a></li>
                <li id="menu-item-21" className="menu-item"><a href="http://database.dutch-caribbean.huygens.knaw.nl/">Search the database</a></li>
                <li id="menu-item-11" className="menu-item"><a href="http://dutch-caribbean.huygens.knaw.nl/?page_id=10">About the project</a></li>
                <li id="menu-item-131" className="menu-item"><a href="http://dutch-caribbean.huygens.knaw.nl/?page_id=128">Introductions database</a></li>
                <li id="menu-item-132" className="menu-item"><a href="http://dutch-caribbean.huygens.knaw.nl/?page_id=125">Maps</a></li>
              </ul>
            </div>
          </nav>
          <div id="main">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});
