import logo from './logo.svg';
import './App.css';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
        <nav className="navbar">
            <ul className="nav-links">
                <li>
                    <a href="#">Home</a>
                </li>
            </ul>
        </nav>
      <Home/>
    </div>
  );
}

export default App;
