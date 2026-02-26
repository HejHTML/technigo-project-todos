import { create } from "zustand"
import moment from "moment"

export const useTodoStore = create((set, get) => ({
    todos: [],
    addTodo: (text) =>
        set(state => ({
            todos: [
                ...state.todos,
                { id: Date.now(), text, completed: false, createdAt: moment().format("YYYY-MM-DD HH:mm") }
            ]
        })),
    toggleTodo: (id) =>
        set(state => ({
            todos: state.todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        })),
    removeTodo: (id) =>
        set(state => ({
            todos: state.todos.filter(todo => todo.id !== id)
        })),
    toggleCompleteAllOrClear: () => {
        const todos = get().todos
        if (todos.length === 0) return

        const allCompleted = todos.every(todo => todo.completed)
        if (allCompleted) {
            set({ todos: [] }) // raderar alla
        } else {
            set({ todos: todos.map(todo => ({ ...todo, completed: true })) }) // markerar alla
        }
    }
}))