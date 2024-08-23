import './App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Artifacts from './components/Artifacts';
import Home from './components/Home';
import Profile from './components/Profile';
import Upload from './components/Upload';
import Login from './components/Login';
import Landing from './components/Landing';
import NavBar from './components/NavBar';
import Register from './components/Register';
import NotFound from './components/NotFound';

function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/model" element={<Artifacts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
