import {FilterValues, Task, Todolist} from "./App.tsx";
import {Button} from "./Button.tsx";
import {type ChangeEvent, type KeyboardEvent, useState} from 'react'

type Props = {
    todolist: Todolist
    tasks: Task[]
    date?: string
    deleteTask: (todolist: string, taskId: string) => void
    changeFilter: (todolist: string, filter: FilterValues) => void
    createTask: (todolist: string, title: string) => void
    changeTaskStatus: (todolist: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
}

export const TodolistItem = ({todolist: {id, title, filter}, tasks, deleteTask, changeFilter, createTask, changeTaskStatus, deleteTodolist}: Props) => {

    const [taskTitle, setTaskTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null)

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            createTask(id, trimmedTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler()
        }
    }

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
        debugger
    }

    const deleteTaskHandler = (taskId: string) => {
        deleteTask(id, taskId)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    return (
        <div>
            <div className={'container'}>
                <h3>{title}</h3>
                <Button title={'x'} onClick={deleteTodolistHandler}/>
            </div>
            <div>
                <input value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyDown={createTaskOnEnterHandler}
                       className={error ? 'error' : ''}
                />
                <Button title={'+'} onClick={createTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = event.currentTarget.checked
                            changeTaskStatus(id, task.id, newStatusValue)
                        }
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                <span>{task.title}</span>
                                <Button title={'x'} onClick={() => deleteTaskHandler(task.id)}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''}
                        title={'All'}
                        onClick={() => changeFilterHandler('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''}
                        title={'Active'}
                        onClick={() => changeFilterHandler('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''}
                        title={'Completed'}
                        onClick={() => changeFilterHandler('completed')}/>
            </div>
        </div>
    )
}