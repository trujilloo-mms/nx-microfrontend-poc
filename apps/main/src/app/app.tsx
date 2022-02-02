// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import MicroFrontend from './MicroFrontend';


const app1Host = 'http://localhost:4201';
const App1 = () => <MicroFrontend name="Myapp1" host={app1Host} />;


const Nav = () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <p className="navbar-item">MAIN</p>

      <a
        role="button"
        className="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">
        <Link className="navbar-item" to="/micro-fe-1">
          App list
        </Link>
        <br />

        <Link className="navbar-item" to="/settings">
          No app
        </Link>
      </div>
    </div>
  </nav>
);

export function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/micro-fe-1">
          <App1 />
        </Route>
        <Route exact path="/settings">
          no app
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
