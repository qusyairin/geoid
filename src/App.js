import './App.css';
import Home from './components/Home';
import Landing from './components/Landing';
import Login from './components/Login';

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
      <Login/>
    </div>
  );
}

export default App;
