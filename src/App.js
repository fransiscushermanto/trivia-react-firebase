import React from "react";
import "./App.css";
import Home from "./components/Home";
import HighScores from "./components/HighScores";
import Game from "./components/Game";
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="container">
        <Route exact path="/" component={Home} />
        <Route path="/game" component={Game} />
        <Route path="/highScores" component={HighScores} />
      </div>
    </Router>
  );
}

export default App;
