import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './index.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button
        className={`toggle-button ${isOpen ? 'toggle-button-open' : 'toggle-button-closed'}`}
        onClick={toggleSidebar}
      >
        {isOpen ? '⨉' : '☰'}
      </button>

      <div className="sidebar-content-wrapper">
        {isOpen && (
          <div className="sidebar-content">
            <ul>
              <li><a href="/home">Home</a></li>
              <li><a href="/products">Thông tin sản phẩm</a></li>
              <li><a href="/orders">Thông tin đơn hàng</a></li>
              <li><a href="/customers">Thông tin khách hàng</a></li>
              <li><a href="/product-statistical">Thống kê</a></li>
              <li><a href="/notification">Thông báo</a></li>
              <li><a href="/contact">Hỗ trợ</a></li>
            </ul>
            <div className="logout-container">
              <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;