import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom";
import PayrollForm  from './components/payroll-form/payroll-form';
import Home from './components/home/home';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/add-employee" component={PayrollForm}>
            <PayrollForm />
          </Route>
          <Route path = "/home" component = {Home}>
            <Home/>
          </Route>
        </Switch>
      </Router>
           
    </div>
  );
}

export default App;
