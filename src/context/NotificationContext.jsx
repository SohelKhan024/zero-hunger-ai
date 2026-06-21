import { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext(null);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      title: 'New donation received', 
      message: '5kg of vegetables donated by John', 
      time: '2 min ago', 
      unread: true,
      type: 'donation'
    },
    { 
      id: 2, 
      title: 'Request fulfilled', 
      message: 'Your food request for vegetables was approved', 
      time: '1 hour ago', 
      unread: true,
      type: 'request'
    },
    { 
      id: 3, 
      title: 'Welcome to Zero Hunger AI!', 
      message: 'Thanks for joining our mission to end hunger', 
      time: '1 day ago', 
      unread: false,
      type: 'system'
    },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAsRead = useCallback((id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  }, []);

  const addNotification = useCallback((notification) => {
    const newNotification = {
      id: Date.now(),
      time: 'Just now',
      unread: true,
      ...notification
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      addNotification,
      removeNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
