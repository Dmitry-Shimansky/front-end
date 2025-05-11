import {FilterValues, Task, Todolist} from "./App.tsx";
import {type ChangeEvent} from 'react'
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import {Box, List, ListItem} from "@mui/material";
import {containerSx, getListItemSx} from './TodolistItem.styles'

type Props = {
    todolist: Todolist
    tasks: Task[]
    date?: string
    deleteTask: (todolist: string, taskId: string) => void
    changeFilter: (todolist: string, filter: FilterValues) => void
    createTask: (todolist: string, title: string) => void
    changeTaskStatus: (todolist: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodolistItem = ({todolist: {id, title, filter},
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 createTask,
                                 changeTaskStatus,
                                 deleteTodolist,
                                 changeTaskTitle,
                                 changeTodolistTitle}: Props) => {

    const createTaskHandler = (title: string) => {
       createTask(id, title)
    }

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    const deleteTaskHandler = (taskId: string) => {
        deleteTask(id, taskId)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(id, title)
    }

    return (
        <div>
            <div className={'container'}>
                <h3>
                    <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
                </h3>
                <IconButton onClick={deleteTodolistHandler}>
                    <DeleteIcon />
                </IconButton>
            </div>
            <CreateItemForm onCreateItem={createTaskHandler}/>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {tasks.map(task => {
                        const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = event.currentTarget.checked
                            changeTaskStatus(id, task.id, newStatusValue)
                        }
                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(id, task.id, title)
                        }
                        return (
                            <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                                <div>
                                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                </div>
                                <IconButton onClick={() => deleteTaskHandler(task.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            )}
            <Box sx={containerSx}>
                <Button variant={filter === 'all' ? 'contained' : 'text'}
                        color={'inherit'}
                        onClick={() => changeFilterHandler('all')}>All</Button>
                <Button variant={filter === 'active' ? 'contained' : 'text'}
                        color={'primary'}
                        onClick={() => changeFilterHandler('active')}>Active</Button>
                <Button variant={filter === 'completed' ? 'contained' : 'text'}
                        color={'secondary'}
                        onClick={() => changeFilterHandler('completed')}>Completed</Button>
            </Box>
        </div>
    )
}