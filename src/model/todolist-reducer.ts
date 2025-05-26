import {FilterValues, Todolist} from "../App.tsx";

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilter = ReturnType<typeof changeTodolistFilterAC>

type Actions = DeleteTodolistAction | CreateTodolistAction| ChangeTodolistTitleAction | ChangeTodolistFilter

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        case 'create_todolist': {
            const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [...state, newTodolist]
        }
        case 'change_todilistTitle': {
            const newTodolists: Todolist[] = state.map(todolist => todolist.id === action.payload.id ? { ...todolist, title: action.payload.title } : todolist)
            return [...newTodolists]
        }
        case 'change_todolistFilter': {
            const newTodolists: Todolist[] = state.map(todolist => todolist.id === action.payload.id ? {...todolist, filter: action.payload.filter} : todolist)
            return [...newTodolists]
        }
        default:
            return state
    }
}

export const deleteTodolistAC = (id: string) => {
    return {type: 'delete_todolist', payload: { id }} as const
}

export const createTodolistAC = (id: string, title: string) => {
    return {type: 'create_todolist', payload: {id, title}} as const
}

export const changeTodolistTitleAC = (payload: {id: string, title: string}) => {
    return {type: 'change_todilistTitle', payload: payload} as const
}

export const changeTodolistFilterAC = (payload: {id: string, filter: FilterValues}) => {
    return {type: 'change_todolistFilter', payload: payload} as const
}