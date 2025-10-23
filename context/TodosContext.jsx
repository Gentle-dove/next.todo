// context/TodosContext.jsx
'use client';
import { createContext, useState, useEffect } from 'react';

export const TodosContext = createContext();

export function TodosProvider({ children }) {
  const [todos, setTodos] = useState([]);

  const API_URL = 'https://react-exam-3.onrender.com/api/todo'; // replace with your Render URL

  // Load todos from backend
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error('Error fetching todos:', err));
  }, []);

  // Save todos to backend whenever they change
  const updateTodos = (newTodos) => {
    setTodos(newTodos);
    fetch(API_URL, {
      method: 'POST', // or PUT depending on your backend
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodos),
    }).catch((err) => console.error('Error saving todos:', err));
  };

  return (
    <TodosContext.Provider value={{ todos, setTodos: updateTodos }}>
      {children}
    </TodosContext.Provider>
  );
}
