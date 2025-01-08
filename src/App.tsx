import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginPage/LoginPage';
import UserManagement from './pages/userManagement/UserManagement';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<UserManagement />} />
      </Routes>
    </div>
  );
}

export default App;
