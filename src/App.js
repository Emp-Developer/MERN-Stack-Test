import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import TodosList from './components/create-todo.component';
import EditTodo from './components/edit-todo.component';
import CreateTodo from './components/create-todo.component';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>My First Crud App</h1>
      </div>
      
      <Route path="/" exact component={TodosList} />
      <Route path="/edit/:id" component={EditTodo}/>
      <Route path="/create" component={CreateTodo}/>
    </Router>
    
  );
}

export default App;
