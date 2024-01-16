/* eslint-disable react/prop-types */
import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, addTodo, removeTodo, toggleTodo, editTodo }) => {
  const [newTodo, setNewTodo] = React.useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  return (
    <div>
      <div className="mb-4">
        <div className="flex items-center">
          <input
            type="text"
            className="flex-grow border rounded p-2 mr-2"
            placeholder="New Todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            onClick={handleAddTodo}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          removeTodo={removeTodo}
          toggleTodo={toggleTodo}
          editTodo={editTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
