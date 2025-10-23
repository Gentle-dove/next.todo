'use client';
import TodoList from '../../components/TodoList';
import { TodosProvider } from '../../context/TodosContext';

export default function TodosPage() {
  return (
    <TodosProvider>
      <TodoList />
    </TodosProvider>
  );
}
