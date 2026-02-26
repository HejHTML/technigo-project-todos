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
                    <span style={{
                        textDecoration: todo.completed ? "line-through" : "none",
                        marginLeft: "8px"
                    }}>
                        {todo.text} <small>{todo.createdAt}</small>
                    </span>
                    <button onClick={() => removeTodo(todo.id)} style={{ marginLeft: "8px" }}>
                        Ta bort
                    </button>
                </div>
            ))}
        </div>
    )
}