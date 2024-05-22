import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Fruits from './Fruits';
import ThankYou from './ThankYou';
import Login from './Login';
import PrivateRoute from './PrivateRoute'; 

function App() {
  const auth = 'Basic ' + btoa('user:password');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute auth={auth} component={Fruits} />} />
        <Route path="/thank-you" element={<ThankYou />} /> {/* historyプロパティを渡す */}
      </Routes>
    </Router>
  );
}

export default App;
