// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import MicroFrontend from './MicroFrontend';


const app1Host = 'http://localhost:4201';
const app2Host = 'http://localhost:4202';

//const App1 = () => <MicroFrontend name="Myapp1" host={app1Host} />;
const App1 = React.lazy(() => import("app1/mainApp"));
const Counter = React.lazy(() => import("app1/counter"));
const App2 = React.lazy(() => import("app2/mainApp"));
const Content = React.lazy(() => import("app2/content"));
//const App2 = () => <MicroFrontend name="Myapp2" host={app2Host} />;


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
          App 2 + App 1
        </Link>
        <br />
        <Link className="navbar-item" to="/app1">
          App 1
        </Link>
         <br />
        <Link className="navbar-item" to="/app2">
          App 2
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
					<React.Suspense fallback={<p >loading...</p>}>
           <Content />
           <Counter />
					</React.Suspense>
        </Route>
        <Route exact path="/app1">
          <React.Suspense fallback={<p >loading...</p>}>
          <Counter />
          </React.Suspense>
        </Route>
        <Route exact path="/app2">
          <React.Suspense fallback={<p >loading...</p>}>
          <Content />
          </React.Suspense>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
