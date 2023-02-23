import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/Auth'
import BookingsPage from './pages/Bookings'
import EventsPage from './pages/Events'
import MainNavigation from './components/Navigation/MainNavigation'
import AuthService from './utils/AuthService';
import AuthContext from './context/auth-context'
import './App.css';

const auth = new AuthService();

let token, userId = null

if(auth.getUser() !== null ){
  token = auth.getUser().token
  userId = auth.getUser().userId
}

export default class App extends Component {
  state = {
    token: token,
    userId: userId
  }
  
  login = (token, userId, tokenExpiration) => {
    this.setState({ token, userId })
  }

  logout = () => {
    localStorage.removeItem('user');
    this.setState({token: null, userId: null})
  }

  render(){
    return (
    <Router>
      <React.Fragment>
        <AuthContext.Provider 
          value={{
            token: this.state.token, 
            userId: this.state.userId, 
            login: this.login, 
            logout: this.logout}}>
            <MainNavigation/>
            <main className="main-content">
              <Routes>
                    {!this.state.token && <Route path='/' element={<Navigate to="/auth"/>} />}
                    {!this.state.token && <Route path="auth" element={<AuthPage />} />}
                    {this.state.token && <Route path='/' element={<Navigate to="/events"/>} />}
                    {this.state.token && <Route path='/auth' element={<Navigate to="/events"/>} />}
                    {this.state.token && <Route path="bookings" element={<BookingsPage />}/>}
                    <Route path="events" element={<EventsPage />}/>
              </Routes>
            </main>  
          </AuthContext.Provider>
        </React.Fragment>
    </Router>

    );
  }
}
