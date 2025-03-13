import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
