import type {TasksState} from '../app/App.tsx'
import {createTodolistAC, deleteTodolistAC} from "./todolist-reducer.ts";
import {createAction, createReducer, nanoid} from '@reduxjs/toolkit'

export const deleteTaskAC = createAction<{todolistId: string, taskId: string}>('tasks/deleteTask')

export const createTaskAC = createAction<{todolistId: string, title: string}>('tasks/createTask')

export const changeTaskStatusAC = createAction<{todolistId: string, taskId: string, isDone: boolean}>('tasks/changeTaskStatus')

export const changeTaskTitleAC = createAction<{todolistId: string, taskId: string, title: string}>('tasks/changeTaskTitle')

const initialState: TasksState = {}

export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(deleteTaskAC, (state, action) => {
            const todolistTasks = state[action.payload.todolistId]
            const index = todolistTasks.findIndex(task => task.id === action.payload.taskId)
            if (index !== -1) {
                todolistTasks.splice(index, 1)
            }
            state[action.payload.todolistId] = todolistTasks
        })
        .addCase(createTaskAC, (state, action) => {
            const newTask = {id: nanoid(), title: action.payload.title, isDone: false}
            state[action.payload.todolistId].unshift(newTask)
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const todolistTasks = state[action.payload.todolistId]
            debugger
            const task = todolistTasks.find(task => task.id === action.payload.taskId)
            if (task) {
                task.isDone = action.payload.isDone
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const todolistTasks = state[action.payload.todolistId]
            debugger
            const task = todolistTasks.find(task => task.id === action.payload.taskId)
            if (task) {
                task.title = action.payload.title
            }
        })
})