import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Videoplayer from "./containers/VideoPlayer";
import ShakaVideoplayer from "./containers/Shakaplayer";
import Sample from "./containers/sample";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/video">
        <Videoplayer />
      </Route>
      <Route exact path="/Shaka">
        <ShakaVideoplayer />
      </Route>
      <Route exact path="/sample">
        <Sample />
      </Route>
      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}