import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './containers/user/register';
import Login from './containers/user/login';
import Home from './containers/home';
import { Provider } from 'react-redux';
import { store } from './lib/redux/store';
import RequireAuth from './lib/helpers/RequireAuth';
import Navbar from './components/navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" 
              element={
                <RequireAuth withAuth={false}>
                  <Register/> 
                </RequireAuth>
              } 
            />
            <Route path="/login" 
              element={
                <RequireAuth withAuth={false}>
                  <Login/>
                </RequireAuth>
              } 
            />
            <Route path="/home" 
              element={
                <RequireAuth withAuth={true}>
                  <Home/>
                </RequireAuth>
                  
              } 
            />
          </Routes>
        </Router>
      </Provider>
      
    </div>
  );
}

export default App;
