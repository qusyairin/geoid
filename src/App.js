import './App.css';
import Artifacts from './components/Artifacts';
import Home from './components/Home';
import Landing from './components/Landing';
import Login from './components/Login';
import Profile from './components/Profile';
import Upload from './components/Upload';

function App() {
  return (
    <div className="App">
      <header className="navbar">
          <div className="navbar-container">
              <div className="logo">
                  GeoID
              </div>
              <nav className="nav-links">
                  <a href="#home">Home</a>
              </nav>
              <div className="login-button">
                  <span style={{marginRight: '30px', color: 'white', cursor: 'pointer'}}>Upload</span>
                  <button>Login</button>
              </div>
          </div>
      </header>
      <Artifacts/>
    </div>
  );
}

export default App;
