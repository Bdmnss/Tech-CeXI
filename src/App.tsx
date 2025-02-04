import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/loginPage/LoginPage';
import UserManagement from './pages/userManagement/UserManagement';
import MyAccount from './pages/myAccount/MyAccount';
import ProtectedRoute from './guards/ProtectedRoute';
import PublicRoute from './guards/PublicRoute';
import MainLayout from './layouts/MainLayout';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route
          path="/login"
          element={<PublicRoute element={<LoginPage />} />}
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute
              element={
                <MainLayout>
                  <UserManagement />
                </MainLayout>
              }
            />
          }
        />
        <Route
          path="/my-account"
          element={
            <ProtectedRoute
              element={
                <MainLayout>
                  <MyAccount />
                </MainLayout>
              }
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
