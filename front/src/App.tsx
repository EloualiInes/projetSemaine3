import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './components/user/register';
import Login from './components/user/login';
import Home from './components/home';
import { Provider } from 'react-redux';
import { store } from './lib/redux/store';
import RequireAuth from './lib/helpers/RequireAuth';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
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
