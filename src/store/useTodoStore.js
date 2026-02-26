import { create } from "zustand"

export const useTodoStore = create((set) => ({

    todos: [],

    addTodo: (text) =>
        set((state) => ({
            todos: [
                ...state.todos,
                {
                    id: Date.now(),
                    text,
                    completed: false
                }
            ]
        })),

}))