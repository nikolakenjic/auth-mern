import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Register from './pages/Register';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
