import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import MainScreen from "./components/MainScreen";

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={MainScreen} />
    </Router>
  );
};

export default App;
