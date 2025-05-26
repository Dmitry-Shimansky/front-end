import type {TasksState} from '../App'
import {CreateTodolistAction, DeleteTodolistAction} from "./todolist-reducer.ts";
import {v1} from "uuid";

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
export type CreateTaskAction = ReturnType<typeof createTaskAC>
export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>

type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction | CreateTaskAction | ChangeTaskStatusAction | ChangeTaskTitleAction

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case "create_todolist": {
            return {...state, [action.payload.id]: []}
        }
        case "delete_todolist": {
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        }
        case "delete_task": {
            const todolistTasks = state[action.payload.todolistId]
            const newTodolistTasks = todolistTasks.filter(task => task.id !== action.payload.taskId)
            state[action.payload.todolistId] = newTodolistTasks
            return {...state}
        }
        case "create_task": {
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            const todolistTasks = state[action.payload.todolistId]
            state[action.payload.todolistId] = [newTask, ...todolistTasks]
            return {...state}
        }
        case "change_task_status": {
            const todolistTasks = state[action.payload.todolistId]
            const newTodolistTasks = todolistTasks.map(task => task.id == action.payload.taskId ? { ...task, isDone: action.payload.isDone } : task)
            state[action.payload.todolistId] = newTodolistTasks
            return {...state}
        }
        case "change_task_title": {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? { ...task, title: action.payload.title } : task)}
        }
        default:
            return state
    }
}

export const deleteTaskAC = (payload: {todolistId: string, taskId: string}) => {
    return {type: 'delete_task', payload} as const
}

export const createTaskAC = (payload: {todolistId: string, title: string}) => {
    return {type: 'create_task', payload} as const
}

export const changeTaskStatusAC = (payload: {todolistId: string, taskId: string, isDone: boolean}) => {
    return {type: 'change_task_status', payload} as const
}

export const changeTaskTitleAC = (payload: {todolistId: string, taskId: string, title: string}) => {
    return {type: 'change_task_title', payload} as const
}