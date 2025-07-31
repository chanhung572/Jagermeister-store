import { Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainLayout from './components/MainLayout';
import MainContent from './components/MainContent';
import Signup from './components/Signup'; 
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Product from './components/Product';
import Order from './components/Order';
import Customer from './components/Customer';
import ProductStatistical from './components/ProductStatistical';
import NotificationPage from './components/NotificationPage';
import Contact from './components/Contact';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />

      <Route path='/' element={<MainLayout />}>
        <Route path='/home' element={<ProtectedRoute><MainContent /></ProtectedRoute>} /> {/* Trang chính */}
        <Route path='/products' element={<ProtectedRoute><Product /></ProtectedRoute>} />
        <Route path='/orders'element={<ProtectedRoute><Order /></ProtectedRoute>} />
        <Route path='/customers'element={<ProtectedRoute><Customer /></ProtectedRoute>} />
        <Route path='/product-statistical' element={<ProtectedRoute><ProductStatistical /></ProtectedRoute>} />
        <Route path='/notification' element={<ProtectedRoute><NotificationPage /></ProtectedRoute>} />
        <Route path='/contact' element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="#" element={<ProtectedRoute><Sidebar /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}

export default App;
