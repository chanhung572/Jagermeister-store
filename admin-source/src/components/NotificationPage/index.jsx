import React, { useEffect, useState } from 'react';
import Notification from '../Notification/index';
import 'bootstrap/dist/css/bootstrap.min.css';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const res = await fetch('http://localhost:3000/api/notifications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Lỗi từ server: ${errorText}`);
        }

        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        setError(err.message || 'Lỗi khi lấy thông báo');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="container">
      <h4>📢 Danh sách thông báo gần đây</h4>

      {loading && <div className="text-primary">Đang tải thông báo...</div>}

      {error && (
        <div className="alert alert-danger" role="alert">
          ⚠️ {error}
        </div>
      )}

      {!loading && !error && notifications.length === 0 && (
        <p className="text-muted">Chưa có thông báo nào.</p>
      )}

      {!loading &&
        !error &&
        notifications.map((n, i) => (
          <Notification
            key={i}
            message={n.message}
            user={n.user}
            action={n.action}
            timestamp={n.timestamp}
          />
        ))}
    </div>
  );
};

export default NotificationPage;