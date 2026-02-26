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

  // ✅ Bestämmer knapptext: "Complete All" eller "Remove All"
  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed)
  const completeButtonText = allCompleted ? "Ta bort alla" : "Markera alla"

  return (
    <div style={{ padding: "20px" }}>
      <h1>Att göra-lista</h1>

      <p>Kvar att göra: {remaining}</p>

      <button onClick={toggleCompleteAllOrClear} style={{ marginBottom: "10px" }}>
        {completeButtonText}
      </button>
      <button onClick={() => setDarkMode(prev => !prev)} style={{ marginLeft: "10px" }}>
        {darkMode ? "Ljust läge" : "Mörkt läge"}
      </button>

      <TodoForm />
      <TodoList />
    </div>
  )
}

export default App