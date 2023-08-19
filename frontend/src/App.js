import "./assets/css/App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import homepage from "./Pages/homepage/homepage";
import TablePage from "./Pages/table/table";
import upload from "./Pages/upload/upload";
import Selection from "./Pages/selection/selection";
import Contri from "./Pages/contribution/contribution";
import image from "./assets/img/bill.jpg";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="main_div">
          <header className="App-header">
            <h1 className="App">Click-n-Split</h1>
          </header>
          <div
            className="p-5 bg-image img-fluid"
            style={{
              backgroundImage: `url(${image})`,
              height: "500px",
            }}
          ></div>
          <main>
            <Route path="/" exact component={homepage} />
            <Route path="/upload" exact component={upload} />
            <Route path="/review" exact component={TablePage} />
            <Route path="/selection" exact component={Selection} />
            <Route path="/contri" exact component={Contri} />
          </main>
          <main className="App"></main>
        </div>
      </Router>
    );
  }
}

export default App;
