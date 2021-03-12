import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Login from './components/login';
import Signup from './components/signup';
import Navigation from './components/navigation';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path='/' component={Login} />
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
