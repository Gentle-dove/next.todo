'use client';
import { useContext, useState } from 'react';
import { TodosContext } from '../context/TodosContext';
import Link from 'next/link';
import { FaSearch, FaRegEdit } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { MdOutlineDelete } from 'react-icons/md';
import { IoSaveOutline } from 'react-icons/io5';

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const TODOS_PER_PAGE = 10;

  // Add new todo
  const handleAddTodo = () => {
    if (!input.trim()) return;
    const newTodo = {
      id: todos.length ? todos[todos.length - 1].id + 1 : 1,
      title: input,
      status: 'pending',
    };
    setTodos([...todos, newTodo]);
    setInput('');
    setEditIndex(null);
    setEditValue('');
    setSearch('');
    setSearchTerm('');
  };

  // Delete todo
  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // Start editing todo
  const handleEditTodo = (index) => {
    setEditIndex(index);
    setEditValue(todos[index].title);
  };

  // Save edited todo
  const handleSaveEdit = (index) => {
    if (!editValue.trim()) return;
    const updatedTodos = [...todos];
    updatedTodos[index].title = editValue;
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditValue('');
  };

  // Filtered todos
  const filteredTodos = todos.filter(
    (todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'all' || todo.status === statusFilter)
  );

  const totalPages = Math.ceil(filteredTodos.length / TODOS_PER_PAGE);
  const startIdx = (currentPage - 1) * TODOS_PER_PAGE;
  const currentTodos = filteredTodos.slice(startIdx, startIdx + TODOS_PER_PAGE);

  return (
    <div className="p-4 max-w-4xl mx-auto flex flex-col items-center justify-center h-screen">
      <div className="border-2 border-[#38485C] m-[40px_30px] p-[5px_15px] md:m-[15px_40px] md:p-[8px_20px] lg:m-[20px_50px] lg:p-[10px_25px] h-[80vh] w-[50vh] shadow-xl rounded-[20px]">
        <h1 className="[font-size:1.875rem] md:[font-size:2.25rem] font-bold text-center mb-6  bg-clip-text ">
        TO-DO LIST
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-3">
        <div className="flex gap-[10px]">
          <input
            className="flex w-[300px] h-[40px] border-2 border-indigo-900 rounded-[20px]"
            type="text"
            placeholder="Search todos"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="rounded-[50%] h-[25px] mt-[9px]"
            onClick={() => setSearchTerm(search)}
          >
            <FaSearch />
          </button>
        </div>
        <select
          className="border-2 border-indigo-900 rounded px-3 py-2 w-full md:w-1/4"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Add new todo */}
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          className="flex-1 border-2 border-indigo-900 rounded px-3 py-2 text-lg"
          type="text"
          placeholder="Enter your task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
        />
        <button
          className="bg-indigo-900 text-white px-4 py-2 rounded font-bold flex items-center gap-1"
          onClick={handleAddTodo}
        >
          <IoMdAdd /> ADD
        </button>
      </div>

      {/* Todo List */}
      <ul className="space-y-3">
        {currentTodos.length === 0 && (
          <p className="text-center italic text-gray-700">No Task yet. Add one!</p>
        )}
        {currentTodos.map((todo, index) => (
          <li
            key={todo.id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between border-2 border-indigo-900 rounded p-3 bg-white"
          >
            <div className="flex items-center gap-3 flex-1">
              {/* Status Toggle */}
              <button
                className={`font-bold ${
                  todo.status === 'completed' ? 'text-green-600' : 'text-red-600'
                }`}
                onClick={() =>
                  setTodos(
                    todos.map((t) =>
                      t.id === todo.id
                        ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' }
                        : t
                    )
                  )
                }
              >
                {todo.status}
              </button>

              {/* Title */}
              {editIndex === startIdx + index ? (
                <input
                  className="border-2 border-indigo-900 rounded px-2 py-1 flex-1"
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(startIdx + index)}
                />
              ) : (
                <Link
                  className="flex-1 font-medium hover:text-indigo-500 underline"
                  href={`/todos/${String(todo.id).padStart(2, '0')}`}
                >
                  {todo.title}
                </Link>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-2 md:mt-0">
              {editIndex === startIdx + index ? (
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1"
                  onClick={() => handleSaveEdit(startIdx + index)}
                >
                  <IoSaveOutline /> Save
                </button>
              ) : (
                <button
                  className="bg-indigo-900 text-white px-3 py-1 rounded flex items-center gap-1"
                  onClick={() => handleEditTodo(startIdx + index)}
                >
                  <FaRegEdit /> Edit
                </button>
              )}
              <button
                className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                onClick={() => handleDeleteTodo(startIdx + index)}
              >
                <MdOutlineDelete /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4 flex-wrap">
        <button
          className="px-4 py-1 bg-indigo-900 text-white rounded disabled:opacity-50"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-4 py-1 rounded font-bold ${
              currentPage === i + 1 ? 'bg-orange-400 text-indigo-900' : 'bg-indigo-900 text-white'
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-4 py-1 bg-indigo-900 text-white rounded disabled:opacity-50"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      </div>
      <footer className="text-center font-semibold text-white mt-6 p-4 bg-gradient-to-r from-indigo-900/40 via-blue-700/40 to-indigo-500/40 rounded">
        &copy; {new Date().getFullYear()} ROYAL's Todo App
      </footer>
    </div>
  );
}
