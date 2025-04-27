import './App.css'
import {TodolistItem} from './TodolistItem'
import {useState} from "react";
import {v1} from 'uuid'

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksState = {
    [key: string]: Task[]
}

// export type TasksState = Record<string, Task[]>

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Typescript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false}
        ]
    });

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        const newTodolists = todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist)
        setTodolists(newTodolists)
    }


    const deleteTask = (todolistId: string, taskId: string) => {
        const todolistTasks = tasks[todolistId]
        const newTodolistTasks = todolistTasks.filter(task => task.id !== taskId)
        tasks[todolistId] = newTodolistTasks
        setTasks({ ...tasks })
    };

    const createTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        const todolistTasks = tasks[todolistId]
        tasks[todolistId] = [newTask, ...todolistTasks]
        setTasks({ ...tasks })
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        const todolistTasks = tasks[todolistId]
        const newTodolistTasks = todolistTasks.map(task => task.id == taskId ? { ...task, isDone } : task)
        tasks[todolistId] = newTodolistTasks
        setTasks({ ...tasks })
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({ ...tasks })
    }

    return (
        <div className="app">
            {todolists.map(todolist => {
                const todolistTasks = tasks[todolist.id]

                let filteredTasks = todolistTasks

                if (todolist.filter === 'active') {
                    filteredTasks = todolistTasks.filter(task => !task.isDone)
                }
                if (todolist.filter === 'completed') {
                    filteredTasks = todolistTasks.filter(task => task.isDone)
                }

                return (
                    <TodolistItem key={todolist.id}
                                  todolist={todolist}
                                  tasks={filteredTasks}
                                  deleteTask={deleteTask}
                                  changeFilter={changeFilter}
                                  createTask={createTask}
                                  changeTaskStatus={changeTaskStatus}
                                  deleteTodolist={deleteTodolist}/>
                )
            })}
        </div>
    )
}
