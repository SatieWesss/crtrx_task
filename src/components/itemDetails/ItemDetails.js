import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import _ from 'lodash';
import { Link, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Context from '../../context';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Paper from "@mui/material/Paper";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import './item-details.css';

function ItemDetails(props) {
    const { id } = useParams();

    const { todos, setTodos } = useContext(Context);
    const [todo, setTodo] = useState({});
    const [items, setItems] = useState([]);
    const [editMode, setEditMode] = useState('');

    const [newTitle, setNewTitle] = useState('');

    const onTitleChange =(event, itemId)=> {
        let title = event.target.value;
        setNewTitle(title);
    };

    const handleToggle = (value) => () => {
        let checkedIndex = _.findIndex(items, { itemId: value });
        let newItems = [...items];
        newItems[checkedIndex].done = !newItems[checkedIndex].done
        setItems(newItems)
    };

    useEffect(() => {
        let findTodo = _.find(todos, { 'uuid': id });
        if(findTodo){
            setTodo(findTodo)
            setItems(findTodo.todoItems)
        }
        
    }, [id, todos]);

    const onEditMode = (editingId) => {
        setEditMode(editingId)
    };

    const onDelete = (deletingId) => {
        let findTodoToDelete = _.findIndex(todos, { 'uuid': id });
        let newState = [...todos];
        let oldItem = newState[findTodoToDelete].todoItems;
        let findItem = _.findIndex(oldItem, { itemId: deletingId });

        let newItem = [
            ...oldItem.slice(0, findItem),
            ...oldItem.slice(findItem + 1)
        ]
        newState[findTodoToDelete].todoItems = newItem;
        setTodos(newState)
    };

    const onSaveEditing = (savingId) => {
        let savedIndex = _.findIndex(items, { itemId: savingId });
        let newItems = [...items];
        newItems[savedIndex].title = newTitle;
        setItems(newItems)
        setEditMode("");
        setNewTitle("")
    };

    return (
        <div className='item-details'>
            <div className='item-details-header'>
                <Button variant="contained">
                    <KeyboardArrowLeftIcon />
                    <Link to="/"> Go back</Link>
                </Button>
                <Typography>{todo.todoDateName} {`(${items && items.length})`} </Typography>
            </div>
            <Paper>
                <List>
                    {items && items.map(item => (
                        <ListItem
                            key={item.itemId}
                            secondaryAction={
                                editMode !== item.itemId
                                    ?
                                    <>
                                        <Button edge="end" aria-label="comments" onClick={() => onEditMode(item.itemId)}>
                                            Edit
                                        </Button>
                                        <Button edge="end" aria-label="comments" className='delete-btn' onClick={() => onDelete(item.itemId)}>
                                            Delete
                                        </Button>
                                    </>
                                    :
                                    <>
                                        <Button edge="end" aria-label="comments" onClick={() => onSaveEditing(item.itemId)}>
                                            Save
                                        </Button>
                                        <Button edge="end" aria-label="comments" className='cancel-btn' onClick={() => setEditMode("")}>
                                            Cancel
                                        </Button>
                                    </>
                            }
                            disablePadding
                        >
                            {
                                editMode !== item.itemId
                                    ?
                                    <ListItemButton role={undefined} onClick={handleToggle(item.itemId)} dense>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={item.done}
                                                tabIndex={-1}
                                                disableRipple
                                            />
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary={item.title} 
                                            className={item.done? "checked-item" : ''}
                                        />
                                    </ListItemButton>
                                    :
                                    <TextField 
                                        id="outlined-basic" 
                                        label={item.title} 
                                        variant="outlined" 
                                        size="small"
                                        value={newTitle}
                                        onChange={(e)=>onTitleChange(e,item.itemId)}
                                    />

                            }
                        </ListItem>
                    ))}
                </List>
            </Paper>

        </div>
    );
}

export default ItemDetails;