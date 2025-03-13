// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/landingpage">LandingPage</Link>
          </li>
          <li>
            <Link to="/loginpage">LoginPage</Link>
          </li>
          <li>
            <Link to="/registerpage">RegisterPage</Link>
          </li>
          <li>
            
          </li>
        </ul>

        <hr/>

        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/landingpage' Component={Auth(LandingPage, null)} />
          <Route path='/loginpage' Component={Auth(LoginPage, false)} />
          <Route path='/registerpage' Component={Auth(RegisterPage, false)} />
        </Routes >
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Hoem 안녕하세요.</h2>
    </div>
  );
}
function About() {
  return (
    <div>
      <h2>About About입니다.</h2>
    </div>
  );
}
function Dashboard() {
  return (
    <div>
      <h2>Dashboard Dashboard입니다.</h2>
    </div>
  );
}

export default App;
