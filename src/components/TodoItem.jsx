import { useTodoStore } from "../store/useTodoStore"

export const TodoItem = ({ todo }) => {

    const toggleTodo = useTodoStore((state) => state.toggleTodo)
    const removeTodo = useTodoStore((state) => state.removeTodo)

    return (
        <div style={{ marginBottom: "8px" }}>

            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
            />

            <span style={{
                textDecoration: todo.completed ? "line-through" : "none",
                marginLeft: "8px"
            }}>
                {todo.text}
            </span>

            <button onClick={() => removeTodo(todo.id)} style={{ marginLeft: "8px" }}>
                Ta bort
            </button>

        </div>
    )
}