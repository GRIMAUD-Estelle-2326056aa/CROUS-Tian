import React, { createContext, useState, useContext } from "react";

const DateContext = createContext(null);

export const DateProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState("Lundi 31/03/25");

  return (
    <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDate = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useDate must be used within a DateProvider");
  }
  return context;
};