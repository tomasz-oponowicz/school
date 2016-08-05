import React from "react";
import Header from "./components/header";
import Flash from "./components/flash";

const Layout = React.createClass({
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Flash />
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Layout;
