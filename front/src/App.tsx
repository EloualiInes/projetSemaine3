import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './components/user/register';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" 
            element={
              // <RequireAuth withAuth={false}>
                <Register/>
              // </RequireAuth>    
            } 
          />
          {/* <Route path="/home" 
            element={
              // <RequireAuth withAuth={false}>
                <Register/>
              // </RequireAuth>    
            } 
          /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
