import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import {changeTodolistFilterAC, FilterValues, Todolist} from "@/features/todolists/model/todolist-reducer.ts";
import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import {containerSx} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.styles.ts";

type Props = {
    todolist: Todolist
}

export const FilterButtons = ({todolist}: Props) => {
    const {id, filter} = todolist

    const dispatch = useAppDispatch()

    const changeFilter = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }

    return (
        <Box sx={containerSx}>
            <Button variant={filter === 'all' ? 'contained' : 'text'}
                    color={'inherit'}
                    onClick={() => changeFilter('all')}>All</Button>
            <Button variant={filter === 'active' ? 'contained' : 'text'}
                    color={'primary'}
                    onClick={() => changeFilter('active')}>Active</Button>
            <Button variant={filter === 'completed' ? 'contained' : 'text'}
                    color={'secondary'}
                    onClick={() => changeFilter('completed')}>Completed</Button>
        </Box>
    )
}