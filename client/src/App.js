import { useEffect, useState } from 'react';
import axios from 'axios'
import { Route, Routes, Navigate } from 'react-router-dom'
import './App.scss';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Doc from './components/Doc/Doc';

function App() {

  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')))

  const getUser = async () => {
    const { data } = await axios.get(`http://localhost:3001/auth/user`, { withCredentials: true })
    setUser(data);
    sessionStorage.setItem('user', JSON.stringify(data));
    console.log(data);
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={user ? <Home user={user} /> : <Login />} />
        <Route exact path='/doc' element={<Doc/>} />
      </Routes>
    </div>
  );
}

export default App;
