// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import NxWelcome from './nx-welcome';

import { Route, Link, Redirect } from 'react-router-dom';

export function App() {
  return (
    <div style={{ 
      background: `#5743BB`, color: "white"
    }}>


      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      MY APP 1
      <br />
      <div role="navigation" >
        <ul>
          <li>
            <Link style={{color: "white"}} to="/micro-fe-1">Home</Link>
          </li>
          <li>
            <Link  style={{color: "white"}} to="/micro-fe-1/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
{/*       
      <Route
                exact
                path="/"
                render={() => {
                    return (
                      <Redirect to="/micro-fe-1" /> 
                    )
                }}
              /> */}
      <Route
        path="/micro-fe-1"
        exact
        render={() => (
          <div>
            This is the generated root route.{' '}
            <Link  style={{color: "white"}} to="/micro-fe-1/page-2">Click here for page 2.</Link>
          </div>
        )}
      />
      <Route
        path="/micro-fe-1/page-2"
        exact
        render={() => (
          <div>
            <Link  style={{color: "white"}} to="/micro-fe-1">Click here to go back to root page.</Link>
          </div>
        )}
      />
      {/* END: routes */}
    </div>
  );
}

export default App;
