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

  // ✅ PRINT FUNKTIONEN SKA LIGGA HÄR
  const handlePrint = () => {
    const printWindow = window.open("", "", "width=800,height=600");

    const todoListHTML = todos
      .map(
        (todo) => `
          <div style="margin-bottom:10px;">
            <label style="display:flex; align-items:center; gap:8px;">
              <input type="checkbox" ${todo.completed ? "checked" : ""} disabled />
              <span style="${todo.completed ? "text-decoration: line-through;" : ""}">
                ${todo.text}
              </span>
            </label>
          </div>
        `
      )
      .join("");

    printWindow.document.write(`
      <html>
        <head>
          <title>Min att-göra-lista</title>
        </head>
        <body style="font-family: Arial; padding:40px;">
          <h1>Min att-göra-lista</h1>
          ${todoListHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  // ✅ ENDA RETURN
  return (
    <div
      style={{
        margin: "40px auto",
        padding: "20px",
        borderRadius: "12px",
        background: darkMode ? "#2d623ed0" : "#f9e960cb",
        position: "relative",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <div style={{ position: "relative", marginBottom: "20px" }}>
        <h1 style={{ textAlign: "center", margin: 0 }}>Att göra-lista</h1>
        <button
          onClick={() => setDarkMode(prev => !prev)}
          className="dark-mode-toggle"
        >
          {darkMode ? "Ljust läge" : "Mörkt läge"}
        </button>
      </div>

      <p>Kvar att göra: {remaining}</p>

      <TodoForm />

      <button onClick={toggleCompleteAllOrClear}>
        {completeButtonText}
      </button>

      {/* ✅ PRINT-KNAPPEN HÄR */}
      <button onClick={handlePrint}>Skriv ut</button>

      <TodoList />
    </div>
  )
}

export default App