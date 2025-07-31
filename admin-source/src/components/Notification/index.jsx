import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Notification = ({ message, user, action, timestamp }) => {
  const getVariant = () => {
    switch (action) {
      case 'create': return 'success';
      case 'update': return 'info';
      case 'delete': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <div className={`alert alert-${getVariant()}`} role="alert">
      <strong>{user}</strong>: {message}
      <br />
      <small className="text-muted">Thời gian: {new Date(timestamp).toLocaleString()}</small>
    </div>
  );
};

export default Notification;