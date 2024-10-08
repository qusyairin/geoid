import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Artifacts from './components/Artifacts';
import Home from './components/Home';
import Profile from './components/Profile';
import Upload from './components/Upload';
import Login from './components/Login';
import Landing from './components/Landing';
import Landing2 from './components/Landing2';
import NavBar from './components/NavBar';
import Register from './components/Register';
import NotFound from './components/NotFound';
import Multimedia from './components/Multimedia';
import Service from './components/Service';
import Report from './components/Report';
import UploadReport from './components/UploadReport';
import ViewModelMain from './components/ViewModelMain';
import PrivateRoute from './components/helpers/PrivateRoute';
import AdminDashboard from './components/AdminDashboard';
import { useState } from 'react';
import UploadMultimedia from './components/UploadMultimedia';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser).user : null;
  });

  const location = useLocation();

  const handleLogin = (userData) => {
    setUser(userData.user);
    localStorage.setItem('user', JSON.stringify(userData)); // Save user data to localStorage
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Clear user data from localStorage
  };

  // Check if the current path is login or register
  const hideNavBar = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="App">
      {!hideNavBar && <NavBar user={user} onLogout={handleLogout} />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/upload" element={<PrivateRoute element={Upload} user={user} isAdmin={user ? user.type : ''} adminOnly={false}/>} />
        <Route path="/profile" element={<PrivateRoute element={Profile} user={user} isAdmin={user ? user.type : ''} adminOnly={false}/>} />
        <Route path="/model" element={<Artifacts />} />
        <Route path="/login" element={<Login onLogin={handleLogin}/>} />
        <Route path="/" element={<Landing2 user={user} />} />
        <Route path="/multimedia" element={<Multimedia />} />
        <Route path="/register" element={<Register />} />
        <Route path="/service-training" element={<Service />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/upload-reports" element={<PrivateRoute element={UploadReport} user={user} isAdmin={user ? user.type : ''} adminOnly={false}/>} />
        <Route path="/upload-multimedia" element={<PrivateRoute element={UploadMultimedia} user={user} isAdmin={user ? user.type : ''} adminOnly={false}/>} />
        <Route path="/model/view-model" element={<ViewModelMain />} />
        <Route path="/admin-dashboard" element={<PrivateRoute element={AdminDashboard} user={user} isAdmin={user ? user.type : ''} adminOnly={true}/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;