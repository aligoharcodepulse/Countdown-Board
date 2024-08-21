import './App.css';
import AuthForm from './components/AuthForm';
import ProtectedRoute from './components/ProtectedRoute';
import { useState, useEffect } from 'react';
import { auth } from './firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useLocation, BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

const AppContent = ({ user }) => {
  const location = useLocation();


  return (
    <>
      {location.pathname !== '/' && <Navbar/>}
      <Routes>
        <Route index path="/" element={<AuthForm />} />
        <Route path="/home" element={<ProtectedRoute user={user}><Home /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute user={user}><About /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        return;
      }
      setUser(null);
      setIsFetching(false);
    });
    return () => unSubscribe();
  }, []);

  if (isFetching) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <BrowserRouter>
        <AppContent user={user} />
      </BrowserRouter>
    </>
  );
};

export default App;
