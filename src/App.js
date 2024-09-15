// App.js

import './App.css';
import { Route, Routes } from 'react-router-dom';
import Artifacts from './components/Artifacts';
import Home from './components/Home';
import Profile from './components/Profile';
import Upload from './components/Upload';
import Login from './components/Login';
import Landing from './components/Landing';
import NavBar from './components/NavBar';
import Register from './components/Register';
import NotFound from './components/NotFound';
import Multimedia from './components/Multimedia';
import Service from './components/Service';
import Report from './components/Report';
import UploadReport from './components/UploadReport';
import ViewModelMain from './components/ViewModelMain';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser).user : null;
  });

  const handleLogin = (userData) => {
    setUser(userData.user);
    localStorage.setItem('user', JSON.stringify(userData)); // Save user data to localStorage
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Clear user data from localStorage
  };

  return (
    <div className="App">
      <NavBar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/model" element={<Artifacts />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={<Landing />} />
        <Route path="/multimedia" element={<Multimedia />} />
        <Route path="/register" element={<Register />} />
        <Route path="/service-training" element={<Service />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/upload-reports" element={<UploadReport />} />
        <Route path="/model/view-model" element={<ViewModelMain />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;