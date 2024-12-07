import { useState } from 'react'
import './App.css'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim() === '') return

    setTodos([...todos, {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false
    }])
    setNewTodo('')
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="container">
      <h1>Lista zadań</h1>
      
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-input"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Dodaj nowe zadanie..."
        />
        <button type="submit">Dodaj</button>
      </form>

      <div className="todo-list">
        {todos.map(todo => (
          <div key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className={todo.completed ? 'completed' : ''}>
              {todo.text}
            </span>
            <button 
              className="delete-btn"
              onClick={() => deleteTodo(todo.id)}
            >
              Usuń
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
