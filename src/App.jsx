import { TodoForm } from "./components/TodoForm"
import { TodoList } from "./components/TodoList"
import { useTodoStore } from "./store/useTodoStore"
import { useState, useEffect } from "react"

function App() {
  const todos = useTodoStore(state => state.todos)
  const toggleCompleteAllOrClear = useTodoStore(state => state.toggleCompleteAllOrClear)
  const remaining = todos.filter(todo => !todo.completed).length
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.body.style.background = darkMode ? "#333" : "#fff"
    document.body.style.color = darkMode ? "#fff" : "#000"
  }, [darkMode])

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed)
  const completeButtonText = allCompleted ? "Ta bort alla" : "Markera alla"

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px", position: "relative" }}>

      {/* Header med Dark Mode-knapp */}
      <div className="header-wrapper" style={{ position: "relative", marginBottom: "20px" }}>
        <h1 style={{ textAlign: "center", margin: 0 }}>Att göra-lista</h1>
        <button
          onClick={() => setDarkMode(prev => !prev)}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            padding: "6px 14px",
            borderRadius: "4px",
            fontWeight: 600,
            background: "#124a14",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {darkMode ? "Ljust läge" : "Mörkt läge"}
        </button>
      </div>

      {/* Remaining counter */}
      <p>Kvar att göra: {remaining}</p>

      {/* Complete All / Remove All knapp */}
      <button
        onClick={toggleCompleteAllOrClear}
        style={{ marginBottom: "10px" }}
      >
        {completeButtonText}
      </button>

      {/* Form och lista */}
      <TodoForm />
      <TodoList />
    </div>
  )
}

export default App