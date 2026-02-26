import { useState, useEffect } from "react"
import { TodoForm } from "./components/TodoForm"
import { TodoList } from "./components/TodoList"
import { useTodoStore } from "./store/useTodoStore"

function App() {
  const todos = useTodoStore(state => state.todos)
  const toggleCompleteAllOrClear = useTodoStore(state => state.toggleCompleteAllOrClear)
  const remaining = todos.filter(todo => !todo.completed).length
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode")
    } else {
      document.body.classList.remove("dark-mode")
    }
  }, [darkMode])

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed)
  const completeButtonText = allCompleted ? "Ta bort alla" : "Markera alla"

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        borderRadius: "12px",
        background: darkMode ? "#2d623ed0" : "#f9e960cb",
        position: "relative",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      {/* Header med Dark Mode-knapp */}
      <div style={{ position: "relative", marginBottom: "20px" }}>
        <h1 style={{ textAlign: "center", margin: 0 }}>Att göra-lista</h1>
        <button
          onClick={() => setDarkMode(prev => !prev)}
          className="dark-mode-toggle"
        >
          {darkMode ? "Ljust läge" : "Mörkt läge"}
        </button>
      </div>

      {/* Remaining counter */}
      <p>Kvar att göra: {remaining}</p>

      {/* Form och lista */}
      <TodoForm />
      {/* Complete All / Remove All knapp */}
      <button onClick={toggleCompleteAllOrClear}>
        {completeButtonText}
      </button>
      <TodoList />
    </div>
  )
}

export default App