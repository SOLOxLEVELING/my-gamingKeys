import React, { createContext, useState, useCallback, useContext } from "react";

export const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000); // The toast will disappear after 3 seconds
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </ToastContext.Provider>
  );
};

// This is the actual Toast component that will be displayed
const Toast = ({ message, type }) => {
  const baseStyle =
    "fixed bottom-5 right-5 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 animate-slide-in-out";
  const typeStyles = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
  };

  return (
    <div className={`${baseStyle} ${typeStyles[type] || typeStyles.info}`}>
      {message}
    </div>
  );
};
