import React from 'react';
import Typography from "@mui/material/Typography";
import ListItemAdd from './addListItem/ListItemAdd';
import MainList from './mainList/MainList';
import './todo-list.css';

export default function TodoList() {

  return (
    <div className='todo-list'>
      <Typography variant="h4">
        To do list
      </Typography>
      <ListItemAdd />
      <MainList />
    </div>
  );
}
