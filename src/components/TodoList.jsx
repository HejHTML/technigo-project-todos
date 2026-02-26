import { useTodoStore } from "../store/useTodoStore"

export const TodoList = () => {
    const todos = useTodoStore(state => state.todos)
    const toggleTodo = useTodoStore(state => state.toggleTodo)
    const removeTodo = useTodoStore(state => state.removeTodo)
    const filter = useTodoStore(state => state.filter)

    const filteredTodos = todos.filter(todo => {
        if (filter === "completed") return todo.completed
        if (filter === "uncompleted") return !todo.completed
        return true
    })

    return (
        <div>
            {filteredTodos.map(todo => (
                <div key={todo.id} style={{ marginBottom: "8px" }}>
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                    />
                    <div style={{ marginLeft: "8px" }}>

                        <span style={{
                            textDecoration: todo.completed ? "line-through" : "none"
                        }}>
                            {todo.text}
                        </span>

                        <small style={{
                            display: "block",
                            opacity: 0.7,
                            fontSize: "12px"
                        }}>
                            {todo.createdAt}
                        </small>

                    </div>
                    <button onClick={() => removeTodo(todo.id)} style={{ marginLeft: "8px" }}>
                        Ta bort
                    </button>
                </div>
            ))}
        </div>
    )
}