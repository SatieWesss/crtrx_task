import React, { useContext, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from "react-router-dom";
import Context from '../../../context';
import './main-list.css';

function MainList(props) {
    const { todos } = useContext(Context);

    return (
        <Paper elevation={0} className="main-list">
            <Typography variant="h6">Dates</Typography>
            <List>
                {
                    todos && todos
                    .sort((a,b)=> new Date(a.todoDate) - new Date(b.todoDate))
                    .map(todo => {
                        return (
                            <Link to={`/todo-details/${todo.uuid}`} key={todo.uuid}>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary={`${todo.todoDateName} (${todo.todoItems.length})`} />
                                        <ListItemIcon>
                                            <ArrowForwardIosIcon />
                                        </ListItemIcon>
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        )
                    })
                }
            </List>
        </Paper>
    );
}

export default MainList;