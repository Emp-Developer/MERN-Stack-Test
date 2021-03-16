import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Login from './components/login';
import Signup from './components/signup';
import Navigation from './components/navigation';
import Dashboard from './components/dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              {/* <Route path = '/' component={Signup} /> */}
              <Route exact path='/' component={Dashboard} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
