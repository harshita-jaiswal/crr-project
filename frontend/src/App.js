import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import "./assets/css/App.css";
import Homepage from "./Pages/Homepage/Homepage";
import TablePage from "./Pages/Table/Table";
import Upload from "./Pages/Upload/Upload";
import Selection from "./Pages/Selection/Selection";
import Contribution from "./Pages/Contribution/Contribution";
import image from "./assets/img/bill.jpg";

function App() {
    return (
        <Router>
            <div className="main_div">
                <header className="App-header">
                    <h1 className="App">Click-n-Split</h1>
                </header>
                <div className="p-5 bg-image img-fluid"
                     style={{backgroundImage: `url(${image})`, height: "500px"}}></div>
                <main>
                    <Route path="/" exact component={Homepage}/>
                    <Route path="/upload" exact component={Upload}/>
                    <Route path="/review" exact component={TablePage}/>
                    <Route path="/selection" exact component={Selection}/>
                    <Route path="/contributions" exact component={Contribution}/>
                </main>
            </div>
        </Router>
    );
}

export default App;
