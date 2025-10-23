'use client';
import TodoList from '../components/TodoList';
import { TodosProvider } from '../context/TodosContext';

export default function HomePage() {
  return (
    <TodosProvider>
      <TodoList />
    </TodosProvider>
  );
}
