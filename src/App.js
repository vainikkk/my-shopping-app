import "./App.css";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Home from "./components/pages/Home";
import Navbar from "./components/common/Navbar";

function App() {
  const state = useSelector((state) => state);
  const verifyToken = localStorage.getItem("token");
  if (state.isLoggedIn || verifyToken) {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="*">
            <Login />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
