import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/Auth'
import BookingsPage from './pages/Bookings'
import EventsPage from './pages/Events'
import MainNavigation from './components/Navigation/MainNavigation'
import {AuthContext} from './context/auth-context'
import './App.css';

 function App(){
  const { token } = useContext(AuthContext);

    return (
      <React.Fragment>
            <MainNavigation/>
            <main className="main-content">
              <Routes>
                    {!token && <Route path='/' element={<Navigate to="/auth"/>} />}
                    {!token && <Route path="auth" element={<AuthPage />} />}
                    {token && <Route path='/' element={<Navigate to="/events"/>} />}
                    {token && <Route path='/auth' element={<Navigate to="/events"/>} />}
                    {token && <Route path="bookings" element={<BookingsPage />}/>}
                    <Route path="events" element={<EventsPage />}/>
              </Routes>
            </main>  
        </React.Fragment>
    );
}

export default App;