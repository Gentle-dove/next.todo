'use client';
import { useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { TodosContext } from '../../context/TodosContext';

export default function TodoDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { todos, setTodos } = useContext(TodosContext);

  const todo = todos.find(t => String(t.id).padStart(2, '0') === id);

  if (!todo) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h2>Todo not found</h2>
        <button onClick={() => router.back()}>Back</button>
      </div>
    );
  }

  const toggleStatus = () => {
    setTodos(todos.map(t => t.id === todo.id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t));
  };

  return (
    <div style={{ padding: 40, maxWidth: 600, margin: '0 auto' }}>
      <h2>Todo Detail</h2>
      <p>ID: {String(todo.id).padStart(2, '0')}</p>
      <p>Title: {todo.title}</p>
      <p>Status: {todo.status}</p>
      <button onClick={toggleStatus}>
        Mark as {todo.status === 'completed' ? 'Pending' : 'Completed'}
      </button>
      <button onClick={() => router.back()}>Back</button>
    </div>
  );
}
