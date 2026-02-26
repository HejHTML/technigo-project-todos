import { useState } from "react"
import { useTodoStore } from "../store/useTodoStore"

export const TodoForm = () => {

    const [text, setText] = useState("")
    const addTodo = useTodoStore((state) => state.addTodo)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!text.trim()) return
        addTodo(text)
        setText("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Lägg till uppgift..."
            />
            <button type="submit">Lägg till</button>
        </form>
    )
}